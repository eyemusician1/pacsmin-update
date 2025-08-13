"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Package,
  DollarSign,
  TrendingUp,
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  RefreshCw,
  ExternalLink,
  Link,
  AlertCircle,
} from "lucide-react"
import { getAllStoreItems, createStoreItem, updateStoreItem, deleteStoreItem } from "../../appwrite/database"
import type { StoreItem } from "../../appwrite/types"
import { useUser } from "../../context/userContext"

interface StoreStats {
  totalProducts: number
  totalValue: number
  withPaymentLinks: number
  averagePrice: number
}

export default function StorePage() {
  const { user } = useUser()
  const [products, setProducts] = useState<StoreItem[]>([])
  const [filteredProducts, setFilteredProducts] = useState<StoreItem[]>([])
  const [stats, setStats] = useState<StoreStats>({
    totalProducts: 0,
    totalValue: 0,
    withPaymentLinks: 0,
    averagePrice: 0,
  })
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedProduct, setSelectedProduct] = useState<StoreItem | null>(null)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isCreating, setIsCreating] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [newProduct, setNewProduct] = useState<Partial<StoreItem>>({
    name: "",
    description: "",
    price: 0,
    payment_link: "",
  })

  const fetchProducts = async () => {
    setIsLoading(true)
    setError(null)
    try {
      console.log("🔄 Fetching products...")
      console.log("👤 Current user:", user ? { id: user.$id, role: user.role, email: user.email } : "No user")

      const { items: fetchedItems, total } = await getAllStoreItems(100, 0)

      console.log("📦 Fetched products:", fetchedItems)
      setProducts(fetchedItems)
      setFilteredProducts(fetchedItems)

      // Calculate statistics
      const totalValue = fetchedItems.reduce((sum, item) => sum + (item.price || 0), 0)
      const withPaymentLinks = fetchedItems.filter(
        (item) => item.payment_link && item.payment_link.trim() !== "",
      ).length
      const averagePrice = fetchedItems.length > 0 ? totalValue / fetchedItems.length : 0

      setStats({
        totalProducts: total,
        totalValue,
        withPaymentLinks,
        averagePrice,
      })

      console.log("📊 Stats calculated:", {
        totalProducts: total,
        totalValue,
        withPaymentLinks,
        averagePrice,
      })
    } catch (error) {
      console.error("💥 Error fetching store items:", error)
      const errorMessage = error instanceof Error ? error.message : "Failed to fetch products"
      setError(errorMessage)
      // Keep empty state on error
      setProducts([])
      setFilteredProducts([])
      setStats({
        totalProducts: 0,
        totalValue: 0,
        withPaymentLinks: 0,
        averagePrice: 0,
      })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const handleCreateProduct = async () => {
    if (isCreating) return // Prevent double submission

    try {
      setIsCreating(true)
      setError(null)

      console.log("🛍️ Starting product creation...")
      console.log("👤 Current user:", user ? { id: user.$id, role: user.role, email: user.email } : "No user")

      // Validate required fields
      if (!newProduct.name?.trim()) {
        setError("Product name is required")
        return
      }

      if (!newProduct.price || newProduct.price <= 0) {
        setError("Price must be greater than 0")
        return
      }

      console.log("🛍️ Creating product with data:", newProduct)

      const productData = {
        name: newProduct.name.trim(),
        description: newProduct.description?.trim() || "",
        price: Number(newProduct.price),
        payment_link: newProduct.payment_link?.trim() || "",
      }

      console.log("📦 Final product data:", productData)

      const createdProduct = await createStoreItem(productData)
      console.log("✅ Product created successfully:", createdProduct)

      // Reset form and close dialog
      setNewProduct({
        name: "",
        description: "",
        price: 0,
        payment_link: "",
      })
      setIsCreateDialogOpen(false)

      // Refresh products list
      await fetchProducts()

      console.log("🎉 Product creation completed!")
    } catch (error) {
      console.error("💥 Error creating product:", error)

      // Show more detailed error message
      let errorMessage = "Failed to create product. "
      if (error instanceof Error) {
        errorMessage += error.message
      } else {
        errorMessage += "Please check your internet connection and try again."
      }

      // Check for specific Appwrite errors
      const appwriteError = error as any
      if (appwriteError?.code === 401) {
        errorMessage = "The current user is not authorized to perform the requested action."
      } else if (appwriteError?.code === 404) {
        errorMessage = "Store collection not found. Please check your database configuration."
      } else if (appwriteError?.type === "document_invalid_structure") {
        errorMessage = "Invalid product data structure. Please check all required fields."
      }

      setError(errorMessage)
    } finally {
      setIsCreating(false)
    }
  }

  const handleUpdateProduct = async () => {
    if (isUpdating) return // Prevent double submission

    try {
      setIsUpdating(true)
      setError(null)

      if (!selectedProduct || !selectedProduct.name?.trim() || !selectedProduct.price || selectedProduct.price <= 0) {
        setError("Please fill in all required fields (Name and Price must be greater than 0)")
        return
      }

      console.log("🔄 Updating product:", selectedProduct.$id)

      const updateData = {
        name: selectedProduct.name.trim(),
        description: selectedProduct.description?.trim() || "",
        price: Number(selectedProduct.price),
        payment_link: selectedProduct.payment_link?.trim() || "",
      }

      console.log("📦 Update data:", updateData)

      const updatedProduct = await updateStoreItem(selectedProduct.$id, updateData)
      console.log("✅ Product updated successfully:", updatedProduct)

      setIsEditDialogOpen(false)
      setSelectedProduct(null)

      // Refresh products list
      await fetchProducts()

      console.log("🎉 Product update completed!")
    } catch (error) {
      console.error("💥 Error updating product:", error)
      const errorMessage = error instanceof Error ? error.message : "Failed to update product. Please try again."
      setError(errorMessage)
    } finally {
      setIsUpdating(false)
    }
  }

  const handleDeleteProduct = async (productId: string) => {
    if (!confirm("Are you sure you want to delete this product?")) {
      return
    }

    try {
      setError(null)
      console.log("🗑️ Deleting product:", productId)

      await deleteStoreItem(productId)
      console.log("✅ Product deleted successfully")

      // Refresh products list
      await fetchProducts()

      console.log("🎉 Product deletion completed!")
    } catch (error) {
      console.error("💥 Error deleting product:", error)
      const errorMessage = error instanceof Error ? error.message : "Failed to delete product. Please try again."
      setError(errorMessage)
    }
  }

  useEffect(() => {
    let filtered = products

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (product) =>
          product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description?.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    setFilteredProducts(filtered)
  }, [products, searchTerm])

  const isValidUrl = (string: string) => {
    try {
      new URL(string)
      return true
    } catch (_) {
      return false
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-8 bg-gray-200 rounded w-1/2"></div>
              </CardContent>
            </Card>
          ))}
        </div>
        <Card className="animate-pulse">
          <CardContent className="p-6">
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-16 bg-gray-200 rounded"></div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-navy-800">Store Management</h1>
          <p className="text-navy-600 mt-1">Manage PACSMIN store products and payment links</p>
          {user && (
            <p className="text-sm text-gray-500 mt-1">
              Logged in as: {user.firstName} {user.lastName} ({user.role})
            </p>
          )}
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={fetchProducts} disabled={isLoading}>
            <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                <Plus className="h-4 w-4 mr-2" />
                Add Product
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>Add New Product</DialogTitle>
                <DialogDescription>Add a new product to the PACSMIN store</DialogDescription>
              </DialogHeader>

              {error && (
                <div className="flex items-center space-x-2 p-3 bg-red-50 border border-red-200 rounded-md">
                  <AlertCircle className="h-4 w-4 text-red-600" />
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Product Name *</Label>
                  <Input
                    id="name"
                    value={newProduct.name || ""}
                    onChange={(e) => {
                      setNewProduct({ ...newProduct, name: e.target.value })
                      setError(null) // Clear error when user types
                    }}
                    placeholder="Enter product name"
                    disabled={isCreating}
                  />
                </div>
                <div>
                  <Label htmlFor="price">Price (₱) *</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    min="0.01"
                    value={newProduct.price || ""}
                    onChange={(e) => {
                      setNewProduct({ ...newProduct, price: Number.parseFloat(e.target.value) || 0 })
                      setError(null) // Clear error when user types
                    }}
                    placeholder="0.00"
                    disabled={isCreating}
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={newProduct.description || ""}
                    onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                    placeholder="Enter product description"
                    rows={3}
                    disabled={isCreating}
                  />
                </div>
                <div>
                  <Label htmlFor="payment_link">Payment Link</Label>
                  <Input
                    id="payment_link"
                    type="url"
                    value={newProduct.payment_link || ""}
                    onChange={(e) => setNewProduct({ ...newProduct, payment_link: e.target.value })}
                    placeholder="https://example.com/payment"
                    disabled={isCreating}
                  />
                </div>
                <div className="flex justify-end space-x-2 pt-4">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsCreateDialogOpen(false)
                      setError(null)
                    }}
                    disabled={isCreating}
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleCreateProduct} disabled={isCreating}>
                    {isCreating ? (
                      <>
                        <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                        Creating...
                      </>
                    ) : (
                      "Add Product"
                    )}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Error Display */}
      {error && !isCreateDialogOpen && !isEditDialogOpen && (
        <div className="flex items-center space-x-2 p-4 bg-red-50 border border-red-200 rounded-md">
          <AlertCircle className="h-5 w-5 text-red-600" />
          <p className="text-sm text-red-700">{error}</p>
          <Button variant="ghost" size="sm" onClick={() => setError(null)}>
            ×
          </Button>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-700">Total Products</p>
                <p className="text-3xl font-bold text-blue-900">{stats.totalProducts}</p>
              </div>
              <div className="h-12 w-12 bg-blue-600 rounded-lg flex items-center justify-center">
                <Package className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-700">With Payment Links</p>
                <p className="text-3xl font-bold text-green-900">{stats.withPaymentLinks}</p>
              </div>
              <div className="h-12 w-12 bg-green-600 rounded-lg flex items-center justify-center">
                <Link className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-700">Total Value</p>
                <p className="text-3xl font-bold text-purple-900">₱{stats.totalValue.toLocaleString()}</p>
              </div>
              <div className="h-12 w-12 bg-purple-600 rounded-lg flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-700">Average Price</p>
                <p className="text-3xl font-bold text-orange-900">₱{stats.averagePrice.toFixed(2)}</p>
              </div>
              <div className="h-12 w-12 bg-orange-600 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search products by name or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Products Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-navy-800">Products ({filteredProducts.length})</CardTitle>
          <CardDescription>Manage all store products and payment links</CardDescription>
        </CardHeader>
        <CardContent>
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No products found</h3>
              <p className="text-gray-600">
                {searchTerm ? "Try adjusting your search terms" : "Add your first product to get started"}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Payment Link</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProducts.map((product) => (
                    <TableRow key={product.$id} className="hover:bg-gray-50">
                      <TableCell>
                        <div>
                          <p className="font-semibold text-navy-800">{product.name}</p>
                          <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <p className="font-semibold text-navy-800">₱{product.price?.toFixed(2) || "0.00"}</p>
                      </TableCell>
                      <TableCell>
                        {product.payment_link && isValidUrl(product.payment_link) ? (
                          <div className="flex items-center space-x-2">
                            <Badge variant="default" className="bg-green-100 text-green-800">
                              Available
                            </Badge>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => window.open(product.payment_link, "_blank")}
                            >
                              <ExternalLink className="h-4 w-4" />
                            </Button>
                          </div>
                        ) : (
                          <Badge variant="secondary" className="bg-gray-100 text-gray-800">
                            No Link
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <p className="text-sm text-gray-600">{new Date(product.$createdAt).toLocaleDateString()}</p>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="ghost" size="sm" onClick={() => setSelectedProduct(product)}>
                                <Eye className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                              <DialogHeader>
                                <DialogTitle>Product Details</DialogTitle>
                                <DialogDescription>Complete information for {product.name}</DialogDescription>
                              </DialogHeader>
                              {selectedProduct && (
                                <div className="space-y-4">
                                  <div>
                                    <h3 className="text-lg font-semibold">{selectedProduct.name}</h3>
                                    <p className="text-gray-600">{selectedProduct.description}</p>
                                  </div>
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <Label className="text-sm font-medium text-gray-700">Price</Label>
                                      <p className="text-sm text-gray-900">
                                        ₱{selectedProduct.price?.toFixed(2) || "0.00"}
                                      </p>
                                    </div>
                                    <div>
                                      <Label className="text-sm font-medium text-gray-700">Payment Link</Label>
                                      {selectedProduct.payment_link && isValidUrl(selectedProduct.payment_link) ? (
                                        <div className="flex items-center space-x-2">
                                          <p className="text-sm text-blue-600 truncate">
                                            {selectedProduct.payment_link}
                                          </p>
                                          <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => window.open(selectedProduct.payment_link, "_blank")}
                                          >
                                            <ExternalLink className="h-4 w-4" />
                                          </Button>
                                        </div>
                                      ) : (
                                        <p className="text-sm text-gray-500">No payment link</p>
                                      )}
                                    </div>
                                    <div>
                                      <Label className="text-sm font-medium text-gray-700">Created</Label>
                                      <p className="text-sm text-gray-900">
                                        {new Date(selectedProduct.$createdAt).toLocaleDateString()}
                                      </p>
                                    </div>
                                    <div>
                                      <Label className="text-sm font-medium text-gray-700">Last Updated</Label>
                                      <p className="text-sm text-gray-900">
                                        {new Date(selectedProduct.$updatedAt).toLocaleDateString()}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </DialogContent>
                          </Dialog>
                          <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                            <DialogTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  setSelectedProduct(product)
                                  setIsEditDialogOpen(true)
                                  setError(null)
                                }}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-lg">
                              <DialogHeader>
                                <DialogTitle>Edit Product</DialogTitle>
                                <DialogDescription>Update product information</DialogDescription>
                              </DialogHeader>

                              {error && (
                                <div className="flex items-center space-x-2 p-3 bg-red-50 border border-red-200 rounded-md">
                                  <AlertCircle className="h-4 w-4 text-red-600" />
                                  <p className="text-sm text-red-700">{error}</p>
                                </div>
                              )}

                              {selectedProduct && (
                                <div className="space-y-4">
                                  <div>
                                    <Label htmlFor="edit-name">Product Name *</Label>
                                    <Input
                                      id="edit-name"
                                      value={selectedProduct.name}
                                      onChange={(e) => {
                                        setSelectedProduct({ ...selectedProduct, name: e.target.value })
                                        setError(null)
                                      }}
                                      disabled={isUpdating}
                                    />
                                  </div>
                                  <div>
                                    <Label htmlFor="edit-price">Price (₱) *</Label>
                                    <Input
                                      id="edit-price"
                                      type="number"
                                      step="0.01"
                                      min="0.01"
                                      value={selectedProduct.price}
                                      onChange={(e) => {
                                        setSelectedProduct({
                                          ...selectedProduct,
                                          price: Number.parseFloat(e.target.value) || 0,
                                        })
                                        setError(null)
                                      }}
                                      disabled={isUpdating}
                                    />
                                  </div>
                                  <div>
                                    <Label htmlFor="edit-description">Description</Label>
                                    <Textarea
                                      id="edit-description"
                                      value={selectedProduct.description}
                                      onChange={(e) =>
                                        setSelectedProduct({ ...selectedProduct, description: e.target.value })
                                      }
                                      rows={3}
                                      disabled={isUpdating}
                                    />
                                  </div>
                                  <div>
                                    <Label htmlFor="edit-payment_link">Payment Link</Label>
                                    <Input
                                      id="edit-payment_link"
                                      type="url"
                                      value={selectedProduct.payment_link || ""}
                                      onChange={(e) =>
                                        setSelectedProduct({ ...selectedProduct, payment_link: e.target.value })
                                      }
                                      placeholder="https://example.com/payment"
                                      disabled={isUpdating}
                                    />
                                  </div>
                                  <div className="flex justify-end space-x-2 pt-4">
                                    <Button
                                      variant="outline"
                                      onClick={() => {
                                        setIsEditDialogOpen(false)
                                        setError(null)
                                      }}
                                      disabled={isUpdating}
                                    >
                                      Cancel
                                    </Button>
                                    <Button onClick={handleUpdateProduct} disabled={isUpdating}>
                                      {isUpdating ? (
                                        <>
                                          <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                                          Updating...
                                        </>
                                      ) : (
                                        "Update Product"
                                      )}
                                    </Button>
                                  </div>
                                </div>
                              )}
                            </DialogContent>
                          </Dialog>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteProduct(product.$id)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
