import { Client, Account, Databases, ID, OAuthProvider, Query } from "appwrite"
import { appwriteConfig } from "./client"
import { redirect } from "next/navigation"

// Initialize the client first
const client = new Client()

// Only initialize if we have the required config
if (appwriteConfig.endpoint && appwriteConfig.projectId) {
  client.setEndpoint(appwriteConfig.endpoint).setProject(appwriteConfig.projectId)
} else {
  console.error("Appwrite configuration is missing. Please check your environment variables.")
}

// Then initialize Account and Databases with the configured client
export const account = new Account(client)
export const database = new Databases(client)

export const getExistingUser = async (id: string) => {
  try {
    if (!appwriteConfig.databaseId || !appwriteConfig.userCollectionId) {
      throw new Error("Database configuration is missing")
    }

    const { documents, total } = await database.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("accountId", id)],
    )
    return total > 0 ? documents[0] : null
  } catch (error) {
    console.error("Error fetching user:", error)
    return null
  }
}

export const storeUserData = async () => {
  try {
    const user = await account.get()
    if (!user) throw new Error("User not found")

    // Check if user already exists
    const existingUser = await getExistingUser(user.$id)
    if (existingUser) {
      console.log("User already exists")
      return existingUser
    }

    const { providerAccessToken } = (await account.getSession("current")) || {}
    const profilePicture = providerAccessToken ? await getGooglePicture(providerAccessToken) : null

    // Split name for Google OAuth users
    const [firstName, ...lastNameParts] = user.name.split(" ")
    const lastName = lastNameParts.join(" ") || ""

    const createdUser = await database.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      {
        accountId: user.$id,
        email: user.email,
        firstName: firstName,
        lastName: lastName,
        phone: "", // Google doesn't provide phone, leave empty
        university: "", // Google doesn't provide university, leave empty
        imageUrl: profilePicture,
      },
    )

    if (!createdUser.$id) redirect("/sign-in")
    return createdUser
  } catch (error) {
    console.error("Error storing user data:", error)
    throw error
  }
}

const getGooglePicture = async (accessToken: string) => {
  try {
    const response = await fetch("https://people.googleapis.com/v1/people/me?personFields=photos", {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
    if (!response.ok) throw new Error("Failed to fetch Google profile picture")
    const { photos } = await response.json()
    return photos?.[0]?.url || null
  } catch (error) {
    console.error("Error fetching Google picture:", error)
    return null
  }
}

export const loginWithGoogle = async () => {
  try {
    if (!appwriteConfig.endpoint || !appwriteConfig.projectId) {
      throw new Error("Appwrite configuration is missing")
    }

    account.createOAuth2Session(
      OAuthProvider.Google,
      `${window.location.origin}/auth/callback`, // Success URL
      `${window.location.origin}/auth/error`, // Failure URL
    )
  } catch (error) {
    console.error("Error during OAuth2 session creation:", error)
    throw error
  }
}

// Updated email/password login function with better error handling
export const loginWithEmailPassword = async (email: string, password: string) => {
  try {
    // Check if Appwrite is properly configured
    if (!appwriteConfig.endpoint || !appwriteConfig.projectId) {
      throw new Error("Appwrite configuration is missing. Please check your environment variables.")
    }

    if (!appwriteConfig.databaseId || !appwriteConfig.userCollectionId) {
      throw new Error("Database configuration is missing. Please check your environment variables.")
    }

    // Validate input
    if (!email || !password) {
      throw new Error("Email and password are required")
    }

    // Log configuration for debugging (remove in production)
    console.log("Appwrite endpoint:", appwriteConfig.endpoint)
    console.log("Appwrite project ID:", appwriteConfig.projectId)

    // Attempt to create a session with Appwrite
    const session = await account.createEmailPasswordSession(email, password)
    console.log("Session created successfully:", session)

    // Get the current user account
    const user = await account.get()
    if (!user) throw new Error("Failed to get user after login")

    // Check if user exists in our database
    const existingUser = await getExistingUser(user.$id)
    if (!existingUser) {
      throw new Error("User not found in database. Please contact support.")
    }

    return { success: true, user: existingUser }
  } catch (error: any) {
    console.error("Error during email/password login:", error)

    // Provide more specific error messages
    let errorMessage = "Invalid credentials"

    if (error.message?.includes("configuration")) {
      errorMessage = "Service configuration error. Please contact support."
    } else if (error.message?.includes("network") || error.message?.includes("fetch") || error.code === 0) {
      errorMessage = "Network error. Please check your connection and try again."
    } else if (error.code === 401) {
      errorMessage = "Invalid email or password"
    } else if (error.message?.includes("User not found in database")) {
      errorMessage = "Account not found. Please sign up first."
    } else if (error.code === 429) {
      errorMessage = "Too many login attempts. Please try again later."
    }

    return { success: false, error: errorMessage }
  }
}

export const logoutUser = async () => {
  try {
    await account.deleteSession("current")
  } catch (error) {
    console.error("Error during logout:", error)
  }
}

export const getUser = async () => {
  try {
    if (!appwriteConfig.databaseId || !appwriteConfig.userCollectionId) {
      throw new Error("Database configuration is missing")
    }

    const user = await account.get()
    if (!user) return null

    const { documents } = await database.listDocuments(appwriteConfig.databaseId, appwriteConfig.userCollectionId, [
      Query.equal("accountId", user.$id),
      Query.select(["firstName", "lastName", "email", "imageUrl", "university", "phone", "accountId"]),
    ])

    return documents.length > 0 ? documents[0] : null
  } catch (error) {
    console.error("Error fetching user:", error)
    return null
  }
}

export const getAllUsers = async (limit = 50, offset = 0) => {
  try {
    if (!appwriteConfig.databaseId || !appwriteConfig.userCollectionId) {
      throw new Error("Database configuration is missing")
    }

    const { documents: users, total } = await database.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.limit(limit), Query.offset(offset), Query.orderDesc("$createdAt")],
    )

    if (total === 0) return { users: [], total }
    return { users, total }
  } catch (error) {
    console.error("Error fetching users:", error)
    return { users: [], total: 0 }
  }
}

export const createUserWithEmailPassword = async (
  email: string,
  password: string,
  firstName: string,
  lastName: string,
  phone: string,
  university: string,
) => {
  try {
    if (!appwriteConfig.databaseId || !appwriteConfig.userCollectionId) {
      throw new Error("Database configuration is missing")
    }

    // Create Appwrite account
    const userAccount = await account.create(ID.unique(), email, password, `${firstName} ${lastName}`)

    // Store user data in the database
    const createdUser = await database.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      {
        accountId: userAccount.$id,
        email: userAccount.email,
        firstName: firstName,
        lastName: lastName,
        phone: phone,
        university: university,
      },
    )

    // DON'T automatically log in the user after registration
    // Let them manually sign in on the sign-in page

    return { success: true, user: createdUser }
  } catch (error: any) {
    console.error("Error creating user with email/password:", error)
    return { success: false, error: error.message || "Failed to create account" }
  }
}

// Function to check if user is authenticated
export const getCurrentUser = async () => {
  try {
    const user = await account.get()
    if (!user) return null

    // Get user details from database
    const dbUser = await getExistingUser(user.$id)
    return dbUser
  } catch (error) {
    return null
  }
}
