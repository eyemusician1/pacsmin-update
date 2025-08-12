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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Package,
  DollarSign,
  TrendingUp,
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Eye,
  RefreshCw,
  AlertTriangle,
} from "lucide-react"
import { getAllStoreItems, createStoreItem, updateStoreItem, deleteStoreItem } from "../../appwrite/database"
import type { StoreItem } from "../../appwrite/types"

interface StoreStats {
  totalProducts: number
  inStock: number
  outOfStock: number
  totalValue: number
}

export default function StorePage() {
  const [products, setProducts] = useState<StoreItem[]>([])
  const [filteredProducts, setFilteredProducts] = useState<StoreItem[]>([])
  const [stats, setStats] = useState<StoreStats>({
    totalProducts: 0,
    inStock: 0,
    outOfStock: 0,
    totalValue: 0,
  })
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategory, setFilterCategory] = useState("all")
  const [filterStock, setFilterStock] = useState("all")
  const [selectedProduct, setSelectedProduct] = useState<StoreItem | null>(null)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [newProduct, setNewProduct] = useState<Partial<StoreItem>>({
    name: "",
    description: "",
    price: 0,
    category: "",
    inStock: true,
    quantity: 0,
  })

  const fetchProducts = async () => {
    setIsLoading(true)
    try {
      const { items: fetchedItems, total } = await getAllStoreItems(100, 0)
      setProducts(fetchedItems)
      setFilteredProducts(fetchedItems)

      // Calculate statistics
      const inStock = fetchedItems.filter((item) => item.inStock && item.quantity > 0).length
      const outOfStock = fetchedItems.filter((item) => !item.inStock || item.quantity === 0).length
      const totalValue = fetchedItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

      setStats({
        totalProducts: total,
        inStock,
        outOfStock,
        totalValue,
      })
    } catch (error) {
      console.error("Error fetching store items:", error)
      // Keep empty state on error
      setProducts([])
      setFilteredProducts([])
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const handleCreateProduct = async () => {
    try {
      if (!newProduct.name || !newProduct.price || !newProduct.category) {
        alert("Please fill in all required fields")
        return
      }

      await createStoreItem({
        name: newProduct.name,
        description: newProduct.description || "",
        price: newProduct.price,
        category: newProduct.category,
        inStock: newProduct.inStock || true,
        quantity: newProduct.quantity || 0,
        imageUrl: newProduct.imageUrl,
      })

      setIsCreateDialogOpen(false)
      setNewProduct({
        name: "",
        description: "",
        price: 0,
        category: "",
        inStock: true,
        quantity: 0,
      })

      // Refresh products list
      await fetchProducts()
    } catch (error) {
      console.error("Error creating product:", error)
      alert("Failed to create product. Please try again.")
    }
  }

  const handleUpdateProduct = async () => {
    try {
      if (!selectedProduct || !selectedProduct.name) {
        alert("Please fill in all required fields")
        return
      }

      await updateStoreItem(selectedProduct.$id, {
        name: selectedProduct.name,
        description: selectedProduct.description,
        price: selectedProduct.price,
        category: selectedProduct.category,
        inStock: selectedProduct.inStock,
        quantity: selectedProduct.quantity,
        imageUrl: selectedProduct.imageUrl,
      })

      setIsEditDialogOpen(false)
      setSelectedProduct(null)

      // Refresh products list
      await fetchProducts()
    } catch (error) {
      console.error("Error updating product:", error)
      alert("Failed to update product. Please try again.")
    }
  }

  const handleDeleteProduct = async (productId: string) => {
    if (!confirm("Are you sure you want to delete this product?")) {
      return
    }

    try {
      await deleteStoreItem(productId)

      // Refresh products list
      await fetchProducts()
    } catch (error) {
      console.error("Error deleting product:", error)
      alert("Failed to delete product. Please try again.")
    }
  }

  useEffect(() => {
    let filtered = products

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Apply category filter
    if (filterCategory !== "all") {
      filtered = filtered.filter((product) => product.category.toLowerCase() === filterCategory.toLowerCase())
    }

    // Apply stock filter
    if (filterStock === "in-stock") {
      filtered = filtered.filter((product) => product.inStock && product.quantity > 0)
    } else if (filterStock === "out-of-stock") {
      filtered = filtered.filter((product) => !product.inStock || product.quantity === 0)
    }

    setFilteredProducts(filtered)
  }, [products, searchTerm, filterCategory, filterStock])

  const getUniqueCategories = () => {
    const categories = products.map((product) => product.category)
    return [...new Set(categories)]
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
          <p className="text-navy-600 mt-1">Manage PACSMIN store products and inventory</p>
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
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New Product</DialogTitle>
                <DialogDescription>Add a new product to the PACSMIN store</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Product Name *</Label>
                    <Input
                      id="name"
                      value={newProduct.name || ""}
                      onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                      placeholder="Enter product name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="price">Price *</Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      value={newProduct.price || ""}
                      onChange={(e) => setNewProduct({ ...newProduct, price: Number.parseFloat(e.target.value) || 0 })}
                      placeholder="0.00"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="category">Category *</Label>
                    <Input
                      id="category"
                      value={newProduct.category || ""}
                      onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                      placeholder="Enter category"
                    />
                  </div>
                  <div>
                    <Label htmlFor="quantity">Quantity</Label>
                    <Input
                      id="quantity"
                      type="number"
                      value={newProduct.quantity || ""}
                      onChange={(e) => setNewProduct({ ...newProduct, quantity: Number.parseInt(e.target.value) || 0 })}
                      placeholder="0"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={newProduct.description || ""}
                    onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                    placeholder="Enter product description"
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="imageUrl">Image URL</Label>
                  <Input
                    id="imageUrl"
                    value={newProduct.imageUrl || ""}
                    onChange={(e) => setNewProduct({ ...newProduct, imageUrl: e.target.value })}
                    placeholder="https://..."
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="inStock"
                    checked={newProduct.inStock || false}
                    onChange={(e) => setNewProduct({ ...newProduct, inStock: e.target.checked })}
                  />
                  <Label htmlFor="inStock">In Stock</Label>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleCreateProduct}>Add Product</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

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
                <p className="text-sm font-medium text-green-700">In Stock</p>
                <p className="text-3xl font-bold text-green-900">{stats.inStock}</p>
              </div>
              <div className="h-12 w-12 bg-green-600 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-red-700">Out of Stock</p>
                <p className="text-3xl font-bold text-red-900">{stats.outOfStock}</p>
              </div>
              <div className="h-12 w-12 bg-red-600 rounded-lg flex items-center justify-center">
                <AlertTriangle className="h-6 w-6 text-white" />
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
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search products by name, category, or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-full sm:w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {getUniqueCategories().map((category) => (
                  <SelectItem key={category} value={category.toLowerCase()}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={filterStock} onValueChange={setFilterStock}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by stock" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Products</SelectItem>
                <SelectItem value="in-stock">In Stock</SelectItem>
                <SelectItem value="out-of-stock">Out of Stock</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Products Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-navy-800">Products ({filteredProducts.length})</CardTitle>
          <CardDescription>Manage all store products and inventory</CardDescription>
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
                    <TableHead>Category</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Stock</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProducts.map((product) => (
                    <TableRow key={product.$id} className="hover:bg-gray-50">
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <div className="h-12 w-12 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                            {product.imageUrl ? (
                              <img
                                src={product.imageUrl || "/placeholder.svg"}
                                alt={product.name}
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <Package className="h-6 w-6 text-gray-400" />
                            )}
                          </div>
                          <div>
                            <p className="font-semibold text-navy-800">{product.name}</p>
                            <p className="text-sm text-gray-600 line-clamp-1">{product.description}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                          {product.category}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <p className="font-semibold text-navy-800">₱{product.price.toFixed(2)}</p>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <p className="text-sm font-medium">{product.quantity} units</p>
                          {product.quantity <= 5 && product.quantity > 0 && (
                            <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 text-xs">
                              Low Stock
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={product.inStock && product.quantity > 0 ? "default" : "secondary"}
                          className={
                            product.inStock && product.quantity > 0
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }
                        >
                          {product.inStock && product.quantity > 0 ? "In Stock" : "Out of Stock"}
                        </Badge>
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
                                  <div className="flex items-start space-x-4">
                                    <div className="h-24 w-24 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                                      {selectedProduct.imageUrl ? (
                                        <img
                                          src={selectedProduct.imageUrl || "/placeholder.svg"}
                                          alt={selectedProduct.name}
                                          className="h-full w-full object-cover"
                                        />
                                      ) : (
                                        <Package className="h-8 w-8 text-gray-400" />
                                      )}
                                    </div>
                                    <div className="flex-1">
                                      <h3 className="text-lg font-semibold">{selectedProduct.name}</h3>
                                      <p className="text-gray-600">{selectedProduct.description}</p>
                                      <div className="mt-2 flex items-center space-x-4">
                                        <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                                          {selectedProduct.category}
                                        </Badge>
                                        <Badge
                                          variant={
                                            selectedProduct.inStock && selectedProduct.quantity > 0
                                              ? "default"
                                              : "secondary"
                                          }
                                          className={
                                            selectedProduct.inStock && selectedProduct.quantity > 0
                                              ? "bg-green-100 text-green-800"
                                              : "bg-red-100 text-red-800"
                                          }
                                        >
                                          {selectedProduct.inStock && selectedProduct.quantity > 0
                                            ? "In Stock"
                                            : "Out of Stock"}
                                        </Badge>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <Label className="text-sm font-medium text-gray-700">Price</Label>
                                      <p className="text-sm text-gray-900">₱{selectedProduct.price.toFixed(2)}</p>
                                    </div>
                                    <div>
                                      <Label className="text-sm font-medium text-gray-700">Quantity</Label>
                                      <p className="text-sm text-gray-900">{selectedProduct.quantity} units</p>
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
                                }}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                              <DialogHeader>
                                <DialogTitle>Edit Product</DialogTitle>
                                <DialogDescription>Update product information</DialogDescription>
                              </DialogHeader>
                              {selectedProduct && (
                                <div className="space-y-4">
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <Label htmlFor="edit-name">Product Name *</Label>
                                      <Input
                                        id="edit-name"
                                        value={selectedProduct.name}
                                        onChange={(e) =>
                                          setSelectedProduct({ ...selectedProduct, name: e.target.value })
                                        }
                                      />
                                    </div>
                                    <div>
                                      <Label htmlFor="edit-price">Price *</Label>
                                      <Input
                                        id="edit-price"
                                        type="number"
                                        step="0.01"
                                        value={selectedProduct.price}
                                        onChange={(e) =>
                                          setSelectedProduct({
                                            ...selectedProduct,
                                            price: Number.parseFloat(e.target.value) || 0,
                                          })
                                        }
                                      />
                                    </div>
                                  </div>
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <Label htmlFor="edit-category">Category *</Label>
                                      <Input
                                        id="edit-category"
                                        value={selectedProduct.category}
                                        onChange={(e) =>
                                          setSelectedProduct({ ...selectedProduct, category: e.target.value })
                                        }
                                      />
                                    </div>
                                    <div>
                                      <Label htmlFor="edit-quantity">Quantity</Label>
                                      <Input
                                        id="edit-quantity"
                                        type="number"
                                        value={selectedProduct.quantity}
                                        onChange={(e) =>
                                          setSelectedProduct({
                                            ...selectedProduct,
                                            quantity: Number.parseInt(e.target.value) || 0,
                                          })
                                        }
                                      />
                                    </div>
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
                                    />
                                  </div>
                                  <div>
                                    <Label htmlFor="edit-imageUrl">Image URL</Label>
                                    <Input
                                      id="edit-imageUrl"
                                      value={selectedProduct.imageUrl || ""}
                                      onChange={(e) =>
                                        setSelectedProduct({ ...selectedProduct, imageUrl: e.target.value })
                                      }
                                    />
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <input
                                      type="checkbox"
                                      id="edit-inStock"
                                      checked={selectedProduct.inStock}
                                      onChange={(e) =>
                                        setSelectedProduct({ ...selectedProduct, inStock: e.target.checked })
                                      }
                                    />
                                    <Label htmlFor="edit-inStock">In Stock</Label>
                                  </div>
                                  <div className="flex justify-end space-x-2">
                                    <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                                      Cancel
                                    </Button>
                                    <Button onClick={handleUpdateProduct}>Update Product</Button>
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
