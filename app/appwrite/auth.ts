import { Client, Account, Databases, ID, Query, OAuthProvider } from "appwrite"

const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_API_ENDPOINT!)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!)

export const account = new Account(client)
export const databases = new Databases(client)

// Database and collection IDs
const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!
const USERS_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_USERS_COLLECTION_ID!

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
    // Create account
    const newAccount = await account.create(
      ID.unique(),
      userData.email,
      userData.password,
      `${userData.firstName} ${userData.lastName}`,
    )

    if (!newAccount) throw new Error("Failed to create account")

    // Create user document in database with default 'user' role
    const newUser = await databases.createDocument(DATABASE_ID, USERS_COLLECTION_ID, ID.unique(), {
      accountId: newAccount.$id,
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      phone: userData.phone || "",
      university: userData.university || "",
      imageUrl: null,
      role: "user", // Default role
    })

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
  university?: string
) {
  try {
    const result = await createUser({
      firstName,
      lastName,
      email,
      password,
      phone,
      university
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
      `${window.location.origin}/signin` // Failure redirect
    )
  } catch (error) {
    console.error("Error with Google login:", error)
    throw error
  }
}

// Get current user with role information
export async function getCurrentUser(): Promise<DatabaseUser | null> {
  try {
    const currentAccount = await account.get()
    if (!currentAccount) return null

    // Get user document from database
    const userDocuments = await databases.listDocuments(DATABASE_ID, USERS_COLLECTION_ID, [
      Query.equal("accountId", currentAccount.$id),
    ])

    if (userDocuments.documents.length === 0) {
      console.error("No user document found for account:", currentAccount.$id)
      return null
    }

    const userDoc = userDocuments.documents[0] as unknown as DatabaseUser
    return userDoc
  } catch (error) {
    console.error("Error getting current user:", error)
    return null
  }
}

// Check if current user is admin
export async function isCurrentUserAdmin(): Promise<boolean> {
  try {
    const user = await getCurrentUser()
    return user?.role === "admin"
  } catch (error) {
    console.error("Error checking admin status:", error)
    return false
  }
}

// Update user role (admin only function)
export async function updateUserRole(userId: string, role: "user" | "admin") {
  try {
    // First check if current user is admin
    const isAdmin = await isCurrentUserAdmin()
    if (!isAdmin) {
      throw new Error("Unauthorized: Only admins can update user roles")
    }

    const updatedUser = await databases.updateDocument(DATABASE_ID, USERS_COLLECTION_ID, userId, { role })

    return updatedUser as unknown as DatabaseUser
  } catch (error) {
    console.error("Error updating user role:", error)
    throw error
  }
}

// Get all users (admin only)
export async function getAllUsers(limit = 100, offset = 0) {
  try {
    // Check if current user is admin
    const isAdmin = await isCurrentUserAdmin()
    if (!isAdmin) {
      throw new Error("Unauthorized: Only admins can view all users")
    }

    const response = await databases.listDocuments(DATABASE_ID, USERS_COLLECTION_ID, [
      Query.limit(limit),
      Query.offset(offset),
      Query.orderDesc("$createdAt"),
    ])

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
export async function updateUserProfile(userId: string, updates: Partial<Omit<DatabaseUser, '$id' | '$createdAt' | '$updatedAt'>>) {
  try {
    const updatedUser = await databases.updateDocument(DATABASE_ID, USERS_COLLECTION_ID, userId, updates)

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
    // Check if current user is admin
    const isAdmin = await isCurrentUserAdmin()
    if (!isAdmin) {
      throw new Error("Unauthorized: Only admins can delete users")
    }

    // Delete user document from database
    await databases.deleteDocument(DATABASE_ID, USERS_COLLECTION_ID, userId)

    return { success: true }
  } catch (error) {
    console.error("Error deleting user:", error)
    throw error
  }
}