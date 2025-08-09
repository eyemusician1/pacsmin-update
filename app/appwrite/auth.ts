import { Client, Account, Databases, ID, OAuthProvider, Query } from "appwrite"
import { appwriteConfig } from "./client"
import { redirect } from "next/navigation"

// Initialize the client first
const client = new Client()
client.setEndpoint(appwriteConfig.endpoint).setProject(appwriteConfig.projectId)

// Then initialize Account and Databases with the configured client
export const account = new Account(client)
export const database = new Databases(client)

export const getExistingUser = async (id: string) => {
  try {
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
    const [firstName, ...lastNameParts] = user.name.split(' ')
    const lastName = lastNameParts.join(' ') || ''
    
    const createdUser = await database.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      {
        accountId: user.$id,
        email: user.email,
        firstName: firstName,
        lastName: lastName,
        phone: '', // Google doesn't provide phone, leave empty
        university: '', // Google doesn't provide university, leave empty
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
    account.createOAuth2Session(
      OAuthProvider.Google,
      `${window.location.origin}/auth/callback`, // Success URL
      `${window.location.origin}/auth/error`, // Failure URL
    )
  } catch (error) {
    console.error("Error during OAuth2 session creation:", error)
  }
}

// Updated email/password login function
export const loginWithEmailPassword = async (email: string, password: string) => {
  try {
    // Attempt to create a session with Appwrite
    await account.createEmailPasswordSession(email, password)
    
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
    return { success: false, error: error.message || "Invalid credentials" }
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
    const user = await account.get()
    if (!user) return null
    
    const { documents } = await database.listDocuments(
      appwriteConfig.databaseId, 
      appwriteConfig.userCollectionId, 
      [
        Query.equal("accountId", user.$id),
        Query.select(["firstName", "lastName", "email", "imageUrl", "university", "phone", "accountId"]),
      ]
    )
    
    return documents.length > 0 ? documents[0] : null
  } catch (error) {
    console.error("Error fetching user:", error)
    return null
  }
}

export const getAllUsers = async (limit: number, offset: number) => {
  try {
    const { documents: users, total } = await database.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.limit(limit), Query.offset(offset)],
    )
    if (total === 0) return { users: [], total }
    return { users, total }
  } catch (e) {
    console.log("Error fetching users")
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