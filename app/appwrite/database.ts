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

    const response = await databases.listDocuments(appwriteConfig.databaseId, appwriteConfig.userCollectionId, [
      Query.equal("accountId", accountId),
      Query.limit(1),
    ])

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
    console.log("🎉 Creating event with data:", eventData)
    console.log("📋 Events Collection ID:", appwriteConfig.eventsCollectionId)
    console.log("🗄️ Database ID:", appwriteConfig.databaseId)

    const newEvent = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.eventsCollectionId,
      ID.unique(),
      eventData,
    )

    console.log("✅ Event created successfully:", newEvent)
    return newEvent as unknown as Event
  } catch (error) {
    console.error("💥 Error creating event:", error)
    throw error
  }
}

export async function getAllEvents(limit = 100, offset = 0) {
  try {
    console.log("📋 Fetching events from collection:", appwriteConfig.eventsCollectionId)

    const response = await databases.listDocuments(appwriteConfig.databaseId, appwriteConfig.eventsCollectionId, [
      Query.limit(limit),
      Query.offset(offset),
      Query.orderDesc("$createdAt"),
    ])

    console.log("📊 Events fetched:", response.total, "events")

    return {
      events: response.documents as unknown as Event[],
      total: response.total,
    }
  } catch (error) {
    console.error("💥 Error fetching events:", error)
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
    console.log("🔄 Updating event:", eventId, "with data:", updates)

    const updatedEvent = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.eventsCollectionId,
      eventId,
      updates,
    )

    console.log("✅ Event updated successfully:", updatedEvent)
    return updatedEvent as unknown as Event
  } catch (error) {
    console.error("💥 Error updating event:", error)
    throw error
  }
}

export async function deleteEvent(eventId: string) {
  try {
    console.log("🗑️ Deleting event:", eventId)

    await databases.deleteDocument(appwriteConfig.databaseId, appwriteConfig.eventsCollectionId, eventId)

    console.log("✅ Event deleted successfully")
    return { success: true }
  } catch (error) {
    console.error("💥 Error deleting event:", error)
    throw error
  }
}

// Store Collection Functions - No admin checks needed here, handled by AdminGuard
export async function createStoreItem(itemData: Omit<StoreItem, "$id" | "$createdAt" | "$updatedAt">) {
  try {
    console.log("🛍️ Creating store item with data:", itemData)
    console.log("📋 Store Collection ID:", appwriteConfig.storeCollectionId)
    console.log("🗄️ Database ID:", appwriteConfig.databaseId)

    // Validate required fields
    if (!itemData.name || !itemData.name.trim()) {
      throw new Error("Product name is required")
    }

    if (!itemData.price || itemData.price <= 0) {
      throw new Error("Product price must be greater than 0")
    }

    // Validate collection ID exists
    if (!appwriteConfig.storeCollectionId) {
      throw new Error("Store collection ID is not configured. Please check your environment variables.")
    }

    // Clean the data to match database schema exactly
    const cleanData = {
      name: itemData.name.trim(),
      description: itemData.description?.trim() || "",
      price: Number(itemData.price),
      payment_link: itemData.payment_link?.trim() || "",
    }

    console.log("🧹 Cleaned data for database:", cleanData)

    const newItem = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.storeCollectionId,
      ID.unique(),
      cleanData,
    )

    console.log("✅ Store item created successfully:", newItem)
    return newItem as unknown as StoreItem
  } catch (error) {
    console.error("💥 Error creating store item:", error)

    // Enhanced error logging
    if (error instanceof Error) {
      console.error("Error message:", error.message)
    }

    const appwriteError = error as any
    if (appwriteError?.code) {
      console.error("Appwrite error code:", appwriteError.code)
    }
    if (appwriteError?.type) {
      console.error("Appwrite error type:", appwriteError.type)
    }
    if (appwriteError?.response) {
      console.error("Appwrite error response:", appwriteError.response)
    }

    throw error
  }
}

export async function getAllStoreItems(limit = 100, offset = 0) {
  try {
    console.log("📋 Fetching store items from collection:", appwriteConfig.storeCollectionId)
    console.log("🗄️ Database ID:", appwriteConfig.databaseId)

    if (!appwriteConfig.storeCollectionId) {
      console.error("❌ Store collection ID is not configured")
      throw new Error("Store collection ID is not configured")
    }

    const response = await databases.listDocuments(appwriteConfig.databaseId, appwriteConfig.storeCollectionId, [
      Query.limit(limit),
      Query.offset(offset),
      Query.orderDesc("$createdAt"),
    ])

    console.log("📊 Store items fetched:", response.total, "items")
    console.log("📦 Items data:", response.documents)

    return {
      items: response.documents as unknown as StoreItem[],
      total: response.total,
    }
  } catch (error) {
    console.error("💥 Error fetching store items:", error)
    throw error
  }
}

export async function getStoreItem(itemId: string) {
  try {
    console.log("🔍 Fetching store item:", itemId)

    const item = await databases.getDocument(appwriteConfig.databaseId, appwriteConfig.storeCollectionId, itemId)

    console.log("✅ Store item fetched:", item)
    return item as unknown as StoreItem
  } catch (error) {
    console.error("💥 Error fetching store item:", error)
    throw error
  }
}

export async function updateStoreItem(
  itemId: string,
  updates: Partial<Omit<StoreItem, "$id" | "$createdAt" | "$updatedAt">>,
) {
  try {
    console.log("🔄 Updating store item:", itemId, "with data:", updates)

    // Validate required fields if they're being updated
    if (updates.name !== undefined && (!updates.name || !updates.name.trim())) {
      throw new Error("Product name cannot be empty")
    }

    if (updates.price !== undefined && (!updates.price || updates.price <= 0)) {
      throw new Error("Product price must be greater than 0")
    }

    // Clean the data to match database schema exactly
    const cleanData: any = {}

    if (updates.name !== undefined) {
      cleanData.name = updates.name.trim()
    }

    if (updates.description !== undefined) {
      cleanData.description = updates.description?.trim() || ""
    }

    if (updates.price !== undefined) {
      cleanData.price = Number(updates.price)
    }

    if (updates.payment_link !== undefined) {
      cleanData.payment_link = updates.payment_link?.trim() || ""
    }

    console.log("🧹 Cleaned update data:", cleanData)

    const updatedItem = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.storeCollectionId,
      itemId,
      cleanData,
    )

    console.log("✅ Store item updated successfully:", updatedItem)
    return updatedItem as unknown as StoreItem
  } catch (error) {
    console.error("💥 Error updating store item:", error)
    throw error
  }
}

export async function deleteStoreItem(itemId: string) {
  try {
    console.log("🗑️ Deleting store item:", itemId)

    await databases.deleteDocument(appwriteConfig.databaseId, appwriteConfig.storeCollectionId, itemId)

    console.log("✅ Store item deleted successfully")
    return { success: true }
  } catch (error) {
    console.error("💥 Error deleting store item:", error)
    throw error
  }
}
