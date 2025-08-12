import { databases, appwriteConfig } from "./client"
import { ID, Query } from "appwrite"
import type { Event, StoreItem } from "./types"

export async function getUserRole(accountId: string): Promise<string | null> {
  try {
    console.log("🔍 getUserRole called with accountId:", accountId)

    if (!appwriteConfig.userCollectionId) {
      console.warn("Users collection ID not configured")
      return null
    }

    console.log("📋 Querying users collection:", appwriteConfig.userCollectionId)
    console.log("🗄️ Database ID:", appwriteConfig.databaseId)

    const response = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId, // Use consistent configuration
      [Query.equal("accountId", accountId), Query.limit(1)],
    )

    console.log("📊 Query response:", {
      total: response.total,
      documentsFound: response.documents.length,
      documents: response.documents,
    })

    if (response.documents.length > 0) {
      const userRole = response.documents[0].role || "user"
      console.log("✅ Found user with role:", userRole)
      return userRole
    }

    console.log("❌ No user found with accountId:", accountId)
    return "user" // Default role
  } catch (error) {
    console.error("💥 Error fetching user role:", error)
    return "user" // Default to user role on error
  }
}

// Events Collection Functions
export async function createEvent(eventData: Omit<Event, "$id" | "$createdAt" | "$updatedAt">) {
  try {
    const newEvent = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.eventsCollectionId,
      ID.unique(),
      eventData,
    )
    return newEvent as unknown as Event
  } catch (error) {
    console.error("Error creating event:", error)
    throw error
  }
}

export async function getAllEvents(limit = 100, offset = 0) {
  try {
    const response = await databases.listDocuments(appwriteConfig.databaseId, appwriteConfig.eventsCollectionId, [
      Query.limit(limit),
      Query.offset(offset),
      Query.orderDesc("$createdAt"),
    ])
    return {
      events: response.documents as unknown as Event[],
      total: response.total,
    }
  } catch (error) {
    console.error("Error fetching events:", error)
    throw error
  }
}

export async function getEvent(eventId: string) {
  try {
    const event = await databases.getDocument(appwriteConfig.databaseId, appwriteConfig.eventsCollectionId, eventId)
    return event as unknown as Event
  } catch (error) {
    console.error("Error fetching event:", error)
    throw error
  }
}

export async function updateEvent(eventId: string, updates: Partial<Omit<Event, "$id" | "$createdAt" | "$updatedAt">>) {
  try {
    const updatedEvent = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.eventsCollectionId,
      eventId,
      updates,
    )
    return updatedEvent as unknown as Event
  } catch (error) {
    console.error("Error updating event:", error)
    throw error
  }
}

export async function deleteEvent(eventId: string) {
  try {
    await databases.deleteDocument(appwriteConfig.databaseId, appwriteConfig.eventsCollectionId, eventId)
    return { success: true }
  } catch (error) {
    console.error("Error deleting event:", error)
    throw error
  }
}

// Store Collection Functions
export async function createStoreItem(itemData: Omit<StoreItem, "$id" | "$createdAt" | "$updatedAt">) {
  try {
    const newItem = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.storeCollectionId,
      ID.unique(),
      itemData,
    )
    return newItem as unknown as StoreItem
  } catch (error) {
    console.error("Error creating store item:", error)
    throw error
  }
}

export async function getAllStoreItems(limit = 100, offset = 0) {
  try {
    const response = await databases.listDocuments(appwriteConfig.databaseId, appwriteConfig.storeCollectionId, [
      Query.limit(limit),
      Query.offset(offset),
      Query.orderDesc("$createdAt"),
    ])
    return {
      items: response.documents as unknown as StoreItem[],
      total: response.total,
    }
  } catch (error) {
    console.error("Error fetching store items:", error)
    throw error
  }
}

export async function getStoreItem(itemId: string) {
  try {
    const item = await databases.getDocument(appwriteConfig.databaseId, appwriteConfig.storeCollectionId, itemId)
    return item as unknown as StoreItem
  } catch (error) {
    console.error("Error fetching store item:", error)
    throw error
  }
}

export async function updateStoreItem(
  itemId: string,
  updates: Partial<Omit<StoreItem, "$id" | "$createdAt" | "$updatedAt">>,
) {
  try {
    const updatedItem = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.storeCollectionId,
      itemId,
      updates,
    )
    return updatedItem as unknown as StoreItem
  } catch (error) {
    console.error("Error updating store item:", error)
    throw error
  }
}

export async function deleteStoreItem(itemId: string) {
  try {
    await databases.deleteDocument(appwriteConfig.databaseId, appwriteConfig.storeCollectionId, itemId)
    return { success: true }
  } catch (error) {
    console.error("Error deleting store item:", error)
    throw error
  }
}