import { Client, Account, Databases } from "appwrite"

export const appwriteConfig = {
  endpoint: process.env.NEXT_PUBLIC_APPWRITE_API_ENDPOINT || "",
  projectId: process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || "",
  databaseId: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || "",
  userCollectionId: process.env.NEXT_PUBLIC_APPWRITE_USERS_COLLECTION_ID || "",
  eventsCollectionId: process.env.NEXT_PUBLIC_APPWRITE_EVENTS_COLLECTION_ID || "",
  storeCollectionId: process.env.NEXT_PUBLIC_APPWRITE_STORE_COLLECTION_ID || "",
}

const client = new Client().setEndpoint(appwriteConfig.endpoint).setProject(appwriteConfig.projectId)

export const account = new Account(client)
export const databases = new Databases(client)
