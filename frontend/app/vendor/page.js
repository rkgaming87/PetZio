'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { products as mockProducts, mockOrders, vendors } from '@/lib/mockData';
import { Package, DollarSign, ShoppingBag, TrendingUp, Edit, Trash2, Plus, X } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import api from '@/lib/api';
import { toast } from 'sonner';

const SAMPLE_IMAGES = [
  { name: 'Dog Food', url: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=500&auto=format&fit=crop&q=60' },
  { name: 'Cat Food', url: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=500&auto=format&fit=crop&q=60' },
  { name: 'Chew Toy', url: 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=500&auto=format&fit=crop&q=60' },
  { name: 'Grooming Brush', url: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=500&auto=format&fit=crop&q=60' },
  { name: 'Pet Harness', url: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=500&auto=format&fit=crop&q=60' }
];

export default function VendorDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [vendorProducts, setVendorProducts] = useState([]);
  const [vendorOrders, setVendorOrders] = useState([]);
  const [vendorInfo, setVendorInfo] = useState({ name: 'Vendor Store', rating: 4.8, totalSales: 24 });
  const [isLoading, setIsLoading] = useState(true);

  // Modal States
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const [productForm, setProductForm] = useState({
    pro_name: '',
    category: 'Dog Food',
    price: '',
    image: SAMPLE_IMAGES[0].url
  });

  useEffect(() => {
    checkVendorAuthAndLoad();
  }, [status, session]);

  const checkVendorAuthAndLoad = async () => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('petzio_token') : null;

    if (status === 'authenticated' && session?.user?.role === 'vendor') {
      loadVendorData(session.user.name || 'Vendor Store');
      return;
    }

    if (token) {
      try {
        const res = await api.get('/users/profile');
        if (res.data && (res.data.role === 'vendor' || res.data.role === 'user')) {
          setVendorInfo({ name: res.data.username || 'Vendor Store', rating: 4.9, totalSales: 15 });
          loadVendorProducts();
          setIsLoading(false);
          return;
        }
      } catch (err) {
        console.error('Vendor auth verification failed', err);
      }
    }

    if (status === 'unauthenticated' && !token) {
      toast.error('Please log in as vendor first');
      router.push('/auth/signin');
    } else {
      setIsLoading(false);
    }
  };

  const loadVendorData = (vendorName) => {
    setVendorInfo({ name: vendorName, rating: 4.9, totalSales: 32 });
    loadVendorProducts();
    setVendorOrders(mockOrders);
    setIsLoading(false);
  };

  const loadVendorProducts = async () => {
    try {
      const res = await api.get('/products/vendor');
      if (res.data && Array.isArray(res.data)) {
        setVendorProducts(res.data);
      } else {
        setVendorProducts([]);
      }
    } catch (err) {
      console.error('Failed to load products:', err);
      setVendorProducts([]);
    }
  };

  const handleCreateProduct = async (e) => {
    e.preventDefault();
    if (!productForm.pro_name || !productForm.price) {
      toast.error('Please fill in product name and price');
      return;
    }

    try {
      toast.loading('Uploading product...');
      const res = await api.post('/products', {
        pro_name: productForm.pro_name,
        category: productForm.category,
        price: parseFloat(productForm.price),
        image: productForm.image
      });

      toast.dismiss();
      toast.success('Product uploaded successfully!');
      setIsAddModalOpen(false);
      setProductForm({ pro_name: '', category: 'Dog Food', price: '', image: SAMPLE_IMAGES[0].url });
      loadVendorProducts();
    } catch (err) {
      toast.dismiss();
      toast.error(err.response?.data?.message || 'Failed to upload product');
    }
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    if (!editingProduct) return;

    try {
      toast.loading('Updating product...');
      await api.put(`/products/${editingProduct._id || editingProduct.id}`, {
        pro_name: productForm.pro_name,
        category: productForm.category,
        price: parseFloat(productForm.price),
        image: productForm.image
      });

      toast.dismiss();
      toast.success('Product updated successfully!');
      setEditingProduct(null);
      setProductForm({ pro_name: '', category: 'Dog Food', price: '', image: SAMPLE_IMAGES[0].url });
      loadVendorProducts();
    } catch (err) {
      toast.dismiss();
      toast.error(err.response?.data?.message || 'Failed to update product');
    }
  };

  const handleDeleteProduct = async (id) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
      toast.loading('Deleting product...');
      await api.delete(`/products/${id}`);
      toast.dismiss();
      toast.success('Product deleted successfully!');
      loadVendorProducts();
    } catch (err) {
      toast.dismiss();
      toast.error(err.response?.data?.message || 'Failed to delete product');
    }
  };

  const openEditModal = (product) => {
    setEditingProduct(product);
    setProductForm({
      pro_name: product.pro_name || product.name || '',
      category: product.category || 'Dog Food',
      price: product.price || '',
      image: product.image || SAMPLE_IMAGES[0].url
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center">
          <p>Loading Vendor Dashboard...</p>
        </div>
      </div>
    );
  }

  const totalRevenue = vendorOrders.reduce((sum, order) => sum + (order.total || order.total_amou || 0), 0);
  const totalProducts = vendorProducts.length;

  const salesData = [
    { month: 'Jan', sales: 4200 },
    { month: 'Feb', sales: 3800 },
    { month: 'Mar', sales: 5100 },
    { month: 'Apr', sales: 4600 },
    { month: 'May', sales: 5800 },
    { month: 'Jun', sales: 6200 }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold">Vendor Dashboard</h1>
            <p className="text-gray-600 mt-1">{vendorInfo.name}</p>
          </div>
          <Badge style={{ backgroundColor: '#4A90E2' }} className="text-lg px-4 py-2">
            {vendorInfo.rating} ★ Rating
          </Badge>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Revenue</p>
                  <p className="text-3xl font-bold" style={{ color: '#FF8C42' }}>
                    ₹{totalRevenue.toFixed(0)}
                  </p>
                </div>
                <DollarSign className="h-10 w-10 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Active Orders</p>
                  <p className="text-3xl font-bold" style={{ color: '#4A90E2' }}>
                    {vendorOrders.length}
                  </p>
                </div>
                <Package className="h-10 w-10 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Products</p>
                  <p className="text-3xl font-bold">{totalProducts}</p>
                </div>
                <ShoppingBag className="h-10 w-10 text-purple-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Sales</p>
                  <p className="text-3xl font-bold">{vendorInfo.totalSales}</p>
                </div>
                <TrendingUp className="h-10 w-10 text-orange-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sales Chart */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Sales Overview (Last 6 Months)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="sales" stroke="#FF8C42" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Tabs for Inventory and Orders */}
        <Tabs defaultValue="inventory" className="space-y-6">
          <TabsList>
            <TabsTrigger value="inventory">
              <ShoppingBag className="h-4 w-4 mr-2" />
              Inventory Management
            </TabsTrigger>
            <TabsTrigger value="orders">
              <Package className="h-4 w-4 mr-2" />
              Recent Orders
            </TabsTrigger>
          </TabsList>

          {/* Inventory Management */}
          <TabsContent value="inventory">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Your Products ({vendorProducts.length})</CardTitle>
                  <Button
                    onClick={() => {
                      setProductForm({ pro_name: '', category: 'Dog Food', price: '', image: SAMPLE_IMAGES[0].url });
                      setIsAddModalOpen(true);
                    }}
                    style={{ backgroundColor: '#FF8C42' }}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Product
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {vendorProducts.length === 0 ? (
                  <div className="text-center py-12">
                    <ShoppingBag className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-lg font-semibold">No products uploaded yet</p>
                    <p className="text-sm text-gray-500 mb-4">Upload your pet items to start selling on PetZio</p>
                    <Button
                      onClick={() => setIsAddModalOpen(true)}
                      style={{ backgroundColor: '#FF8C42' }}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Product Now
                    </Button>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b text-left">
                          <th className="p-3">Product</th>
                          <th className="p-3">Category</th>
                          <th className="p-3">Price</th>
                          <th className="p-3">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {vendorProducts.map((product) => {
                          const pId = product._id || product.id;
                          const pName = product.pro_name || product.name;
                          return (
                            <tr key={pId} className="border-b hover:bg-gray-50">
                              <td className="p-3">
                                <div className="flex items-center gap-3">
                                  <img
                                    src={product.image || SAMPLE_IMAGES[0].url}
                                    alt={pName}
                                    className="w-12 h-12 object-cover rounded"
                                  />
                                  <div>
                                    <p className="font-medium">{pName}</p>
                                    <p className="text-xs text-gray-500">ID: #{String(pId).substring(0, 8)}</p>
                                  </div>
                                </div>
                              </td>
                              <td className="p-3">
                                <Badge variant="outline">{product.category}</Badge>
                              </td>
                              <td className="p-3 font-semibold" style={{ color: '#FF8C42' }}>
                                ₹{parseFloat(product.price).toFixed(2)}
                              </td>
                              <td className="p-3">
                                <div className="flex gap-2">
                                  <Button variant="outline" size="sm" onClick={() => openEditModal(product)}>
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                  <Button variant="outline" size="sm" onClick={() => handleDeleteProduct(pId)} className="text-red-600 hover:bg-red-50">
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Orders */}
          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {vendorOrders.length === 0 ? (
                    <p className="text-center py-8 text-gray-500">No orders received yet.</p>
                  ) : (
                    vendorOrders.map((order, idx) => (
                      <Card key={order.id || idx}>
                        <CardContent className="p-4 flex items-center justify-between">
                          <div>
                            <h4 className="font-semibold">Order #{order.id || `ORD-${idx + 101}`}</h4>
                            <p className="text-sm text-gray-500">{order.date || 'Recent Order'}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-lg" style={{ color: '#FF8C42' }}>
                              ₹{(order.total || 49.99).toFixed(2)}
                            </p>
                            <Badge className="bg-green-500">PAID</Badge>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Add Product Modal */}
        {isAddModalOpen && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl relative">
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="absolute top-4 right-4 p-1 rounded-full text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>

              <h2 className="text-2xl font-bold mb-4">Add New Product</h2>
              <form onSubmit={handleCreateProduct} className="space-y-4">
                <div>
                  <Label htmlFor="pro_name">Product Name *</Label>
                  <Input
                    id="pro_name"
                    placeholder="e.g. Royal Canin Adult Dog Food"
                    value={productForm.pro_name}
                    onChange={(e) => setProductForm({ ...productForm, pro_name: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="category">Category *</Label>
                  <select
                    id="category"
                    value={productForm.category}
                    onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                    className="w-full border rounded-md p-2 text-sm bg-white"
                  >
                    <option value="Dog Food">Dog Food</option>
                    <option value="Cat Food">Cat Food</option>
                    <option value="Toys">Pet Toys</option>
                    <option value="Grooming">Grooming & Hygiene</option>
                    <option value="Healthcare">Healthcare & Supplements</option>
                    <option value="Accessories">Beds & Accessories</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="price">Price (₹) *</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    placeholder="29.99"
                    value={productForm.price}
                    onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <Label>Select Sample Image or Enter Image URL</Label>
                  <div className="flex gap-2 overflow-x-auto py-2">
                    {SAMPLE_IMAGES.map((img) => (
                      <button
                        key={img.name}
                        type="button"
                        onClick={() => setProductForm({ ...productForm, image: img.url })}
                        className={`border-2 rounded-lg p-1 min-w-[70px] text-center transition-all ${
                          productForm.image === img.url ? 'border-orange-500 scale-105' : 'border-transparent'
                        }`}
                      >
                        <img src={img.url} alt={img.name} className="w-12 h-12 object-cover rounded mx-auto mb-1" />
                        <span className="text-[10px] block truncate">{img.name}</span>
                      </button>
                    ))}
                  </div>
                  <Input
                    type="url"
                    placeholder="Custom Image URL (https://...)"
                    value={productForm.image}
                    onChange={(e) => setProductForm({ ...productForm, image: e.target.value })}
                    className="mt-2 text-xs"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t">
                  <Button type="button" variant="outline" onClick={() => setIsAddModalOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" style={{ backgroundColor: '#FF8C42' }}>
                    Upload Product
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Edit Product Modal */}
        {editingProduct && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl relative">
              <button
                onClick={() => setEditingProduct(null)}
                className="absolute top-4 right-4 p-1 rounded-full text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>

              <h2 className="text-2xl font-bold mb-4">Edit Product</h2>
              <form onSubmit={handleUpdateProduct} className="space-y-4">
                <div>
                  <Label htmlFor="edit_pro_name">Product Name *</Label>
                  <Input
                    id="edit_pro_name"
                    value={productForm.pro_name}
                    onChange={(e) => setProductForm({ ...productForm, pro_name: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="edit_category">Category *</Label>
                  <select
                    id="edit_category"
                    value={productForm.category}
                    onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                    className="w-full border rounded-md p-2 text-sm bg-white"
                  >
                    <option value="Dog Food">Dog Food</option>
                    <option value="Cat Food">Cat Food</option>
                    <option value="Toys">Pet Toys</option>
                    <option value="Grooming">Grooming & Hygiene</option>
                    <option value="Healthcare">Healthcare & Supplements</option>
                    <option value="Accessories">Beds & Accessories</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="edit_price">Price (₹) *</Label>
                  <Input
                    id="edit_price"
                    type="number"
                    step="0.01"
                    value={productForm.price}
                    onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <Label>Image URL</Label>
                  <Input
                    type="url"
                    value={productForm.image}
                    onChange={(e) => setProductForm({ ...productForm, image: e.target.value })}
                    className="text-xs"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t">
                  <Button type="button" variant="outline" onClick={() => setEditingProduct(null)}>
                    Cancel
                  </Button>
                  <Button type="submit" style={{ backgroundColor: '#FF8C42' }}>
                    Save Changes
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}