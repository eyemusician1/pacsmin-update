import { Client, Account, Databases, ID, Query, OAuthProvider } from "appwrite"
import { appwriteConfig } from "./client"

// Use the centralized client and databases instances
const client = new Client().setEndpoint(appwriteConfig.endpoint).setProject(appwriteConfig.projectId)
export const account = new Account(client)
export const databases = new Databases(client)

export interface DatabaseUser {
  $id: string
  accountId: string
  firstName: string
  lastName: string
  email: string
  phone?: string
  university?: string
  imageUrl?: string | null
  role?: "user" | "admin"
  $createdAt: string
  $updatedAt: string
}

// Validate required environment variables
function validateConfig() {
  if (!appwriteConfig.projectId) {
    console.warn("NEXT_PUBLIC_APPWRITE_PROJECT_ID is not set")
  }
  if (!appwriteConfig.databaseId || !appwriteConfig.userCollectionId) {
    throw new Error(
      "Database configuration is missing. Please set NEXT_PUBLIC_APPWRITE_DATABASE_ID and NEXT_PUBLIC_APPWRITE_USERS_COLLECTION_ID",
    )
  }
}

// Create a new user account and database record
export async function createUser(userData: {
  firstName: string
  lastName: string
  email: string
  password: string
  phone?: string
  university?: string
}) {
  try {
    validateConfig()

    // Create account
    const newAccount = await account.create(
      ID.unique(),
      userData.email,
      userData.password,
      `${userData.firstName} ${userData.lastName}`,
    )

    if (!newAccount) throw new Error("Failed to create account")

    // Create user document in database with default 'user' role
    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        phone: userData.phone || "",
        university: userData.university || "",
        role: "user", // Default role
      }
    )

    return newUser as unknown as DatabaseUser
  } catch (error) {
    console.error("Error creating user:", error)
    throw error
  }
}

// Create user with email and password - wrapper function for sign-up page
export async function createUserWithEmailPassword(
  email: string,
  password: string,
  firstName: string,
  lastName: string,
  phone?: string,
  university?: string,
) {
  try {
    const result = await createUser({
      firstName,
      lastName,
      email,
      password,
      phone,
      university,
    })

    return { success: true, user: result }
  } catch (error: any) {
    console.error("Error creating user with email/password:", error)
    return { success: false, error: error.message }
  }
}

// Sign in user
export async function signInUser(email: string, password: string) {
  try {
    const session = await account.createEmailPasswordSession(email, password)
    return session
  } catch (error) {
    console.error("Error signing in:", error)
    throw error
  }
}

// Login with email and password - wrapper function for sign-in page
export async function loginWithEmailPassword(email: string, password: string) {
  try {
    const session = await signInUser(email, password)
    return { success: true, session }
  } catch (error: any) {
    console.error("Error logging in with email/password:", error)
    return { success: false, error: error.message }
  }
}

// Google OAuth login
export async function loginWithGoogle() {
  try {
    // Redirect to Google OAuth
    account.createOAuth2Session(
      OAuthProvider.Google,
      `${window.location.origin}/`, // Success redirect
      `${window.location.origin}/signin`, // Failure redirect
    )
  } catch (error) {
    console.error("Error with Google login:", error)
    throw error
  }
}

// Get current user with role information
export async function getCurrentUser(): Promise<DatabaseUser | null> {
  try {
    validateConfig()

    let currentAccount
    try {
      currentAccount = await account.get()
    } catch (accountError: any) {
      // If user is not authenticated, return null instead of throwing
      if (accountError.code === 401 || accountError.type === "general_unauthorized_scope") {
        console.log("User not authenticated")
        return null
      }
      // For other errors, log and return null
      console.warn("Error getting account:", accountError.message)
      return null
    }

    if (!currentAccount) return null

    // Get user document from database
    try {
      const userDocuments = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.userCollectionId,
        [Query.equal("accountId", currentAccount.$id)]
      )

      if (userDocuments.documents.length === 0) {
        console.warn("No user document found for account:", currentAccount.$id)
        return null
      }

      const userDoc = userDocuments.documents[0] as unknown as DatabaseUser
      console.log("Current user fetched:", { id: userDoc.$id, role: userDoc.role, email: userDoc.email }) // Debug log
      return userDoc
    } catch (dbError: any) {
      console.warn("Error fetching user document:", dbError.message)
      return null
    }
  } catch (error: any) {
    console.warn("Error getting current user:", error.message)
    return null
  }
}

// Check if current user is admin
export async function isCurrentUserAdmin(): Promise<boolean> {
  try {
    const user = await getCurrentUser()
    const isAdmin = user?.role === "admin"
    console.log("Admin check:", { userId: user?.$id, role: user?.role, isAdmin }) // Debug log
    return isAdmin
  } catch (error) {
    console.error("Error checking admin status:", error)
    return false
  }
}

// Update user role (admin only function)
export async function updateUserRole(userId: string, role: "user" | "admin") {
  try {
    validateConfig()

    // First check if current user is admin
    const isAdmin = await isCurrentUserAdmin()
    if (!isAdmin) {
      throw new Error("Unauthorized: Only admins can update user roles")
    }

    const updatedUser = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      userId,
      { role }
    )

    return updatedUser as unknown as DatabaseUser
  } catch (error) {
    console.error("Error updating user role:", error)
    throw error
  }
}

// Get all users (admin only)
export async function getAllUsers(limit = 100, offset = 0) {
  try {
    validateConfig()

    // Check if current user is admin
    const isAdmin = await isCurrentUserAdmin()
    if (!isAdmin) {
      throw new Error("Unauthorized: Only admins can view all users")
    }

    const response = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [
        Query.limit(limit),
        Query.offset(offset),
        Query.orderDesc("$createdAt"),
      ]
    )

    return {
      users: response.documents as unknown as DatabaseUser[],
      total: response.total,
    }
  } catch (error) {
    console.error("Error getting all users:", error)
    throw error
  }
}

// Update user profile
export async function updateUserProfile(
  userId: string,
  updates: Partial<Omit<DatabaseUser, "$id" | "$createdAt" | "$updatedAt">>,
) {
  try {
    validateConfig()

    const updatedUser = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      userId,
      updates
    )

    return updatedUser as unknown as DatabaseUser
  } catch (error) {
    console.error("Error updating user profile:", error)
    throw error
  }
}

// Logout user
export async function logoutUser() {
  try {
    await account.deleteSession("current")
  } catch (error) {
    console.error("Error logging out:", error)
    throw error
  }
}

// Delete user account and database record
export async function deleteUser(userId: string) {
  try {
    validateConfig()

    // Check if current user is admin
    const isAdmin = await isCurrentUserAdmin()
    if (!isAdmin) {
      throw new Error("Unauthorized: Only admins can delete users")
    }

    // Delete user document from database
    await databases.deleteDocument(appwriteConfig.databaseId, appwriteConfig.userCollectionId, userId)

    return { success: true }
  } catch (error) {
    console.error("Error deleting user:", error)
    throw error
  }
}