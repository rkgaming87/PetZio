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
import { products, mockOrders, vendors, mockUsers } from '@/lib/mockData';
import { Users, Store, ShoppingBag, DollarSign, TrendingUp, Shield, AlertCircle, CheckCircle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    } else if (status === 'authenticated') {
      if (session.user?.role !== 'admin') {
        router.push('/');
      }
    }
  }, [status, session, router]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (!session || session.user?.role !== 'admin') {
    return null;
  }

  // Calculate platform stats
  const totalRevenue = mockOrders.reduce((sum, order) => sum + order.total, 0);
  const totalUsers = mockUsers.length;
  const totalVendors = vendors.length;
  const totalProducts = products.length;
  const averageOrderValue = totalRevenue / mockOrders.length;

  // Category distribution for pie chart
  const categoryData = [
    { name: 'Dog', value: products.filter(p => p.category === 'dog').length, color: '#FF8C42' },
    { name: 'Cat', value: products.filter(p => p.category === 'cat').length, color: '#4A90E2' },
    { name: 'Bird', value: products.filter(p => p.category === 'bird').length, color: '#10B981' },
    { name: 'Fish', value: products.filter(p => p.category === 'fish').length, color: '#06B6D4' },
    { name: 'Small Pets', value: products.filter(p => p.category === 'small-pets').length, color: '#F59E0B' }
  ];

  // Revenue by month
  const revenueData = [
    { month: 'Jan', revenue: 12500 },
    { month: 'Feb', revenue: 15800 },
    { month: 'Mar', revenue: 18200 },
    { month: 'Apr', revenue: 16900 },
    { month: 'May', revenue: 21400 },
    { month: 'Jun', revenue: 24800 }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered': return 'bg-green-500';
      case 'shipped': return 'bg-blue-500';
      case 'processing': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const filteredUsers = mockUsers.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredVendors = vendors.filter(vendor =>
    vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vendor.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold">Admin Command Center</h1>
            <p className="text-gray-600 mt-1">Platform Management & Analytics</p>
          </div>
          <Badge style={{ backgroundColor: '#10B981' }} className="text-lg px-4 py-2">
            <Shield className="h-5 w-5 mr-2" />
            Admin Access
          </Badge>
        </div>

        {/* Platform Analytics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Revenue</p>
                  <p className="text-2xl font-bold" style={{ color: '#10B981' }}>
                    ${totalRevenue.toFixed(0)}
                  </p>
                </div>
                <DollarSign className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Users</p>
                  <p className="text-2xl font-bold" style={{ color: '#4A90E2' }}>
                    {totalUsers}
                  </p>
                </div>
                <Users className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Active Vendors</p>
                  <p className="text-2xl font-bold" style={{ color: '#FF8C42' }}>
                    {totalVendors}
                  </p>
                </div>
                <Store className="h-8 w-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Products</p>
                  <p className="text-2xl font-bold">{totalProducts}</p>
                </div>
                <ShoppingBag className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Avg Order Value</p>
                  <p className="text-2xl font-bold">${averageOrderValue.toFixed(0)}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-indigo-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="revenue" fill="#FF8C42" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Product Distribution by Category</CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={(entry) => `${entry.name}: ${entry.value}`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Management Tabs */}
        <Tabs defaultValue="users" className="space-y-6">
          <TabsList>
            <TabsTrigger value="users">
              <Users className="h-4 w-4 mr-2" />
              User Management
            </TabsTrigger>
            <TabsTrigger value="vendors">
              <Store className="h-4 w-4 mr-2" />
              Vendor Moderation
            </TabsTrigger>
            <TabsTrigger value="orders">
              <ShoppingBag className="h-4 w-4 mr-2" />
              Orders Overview
            </TabsTrigger>
            <TabsTrigger value="security">
              <Shield className="h-4 w-4 mr-2" />
              Security Logs
            </TabsTrigger>
          </TabsList>

          {/* User Management */}
          <TabsContent value="users">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>All Users</CardTitle>
                  <Input
                    placeholder="Search users..."
                    className="max-w-xs"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-3">User</th>
                        <th className="text-left p-3">Email</th>
                        <th className="text-left p-3">Role</th>
                        <th className="text-left p-3">Status</th>
                        <th className="text-left p-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredUsers.map((user) => (
                        <tr key={user.id} className="border-b hover:bg-gray-50">
                          <td className="p-3">
                            <div className="flex items-center gap-3">
                              <img
                                src={user.avatar}
                                alt={user.name}
                                className="w-10 h-10 rounded-full object-cover"
                              />
                              <span className="font-medium">{user.name}</span>
                            </div>
                          </td>
                          <td className="p-3 text-sm">{user.email}</td>
                          <td className="p-3">
                            <Badge
                              style={{
                                backgroundColor:
                                  user.role === 'admin'
                                    ? '#10B981'
                                    : user.role === 'vendor'
                                    ? '#FF8C42'
                                    : '#4A90E2'
                              }}
                            >
                              {user.role.toUpperCase()}
                            </Badge>
                          </td>
                          <td className="p-3">
                            <Badge className="bg-green-500">Active</Badge>
                          </td>
                          <td className="p-3">
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">
                                View
                              </Button>
                              <Button variant="outline" size="sm" className="text-red-600">
                                Suspend
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Vendor Moderation */}
          <TabsContent value="vendors">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Vendor Management</CardTitle>
                  <Input
                    placeholder="Search vendors..."
                    className="max-w-xs"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredVendors.map((vendor) => (
                    <Card key={vendor.id}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <img
                              src={vendor.image}
                              alt={vendor.name}
                              className="w-16 h-16 rounded-full object-cover"
                            />
                            <div>
                              <h4 className="font-semibold text-lg">{vendor.name}</h4>
                              <p className="text-sm text-gray-600">{vendor.location}</p>
                              <div className="flex items-center mt-1">
                                <span className="text-sm font-medium mr-2">★ {vendor.rating}</span>
                                <span className="text-sm text-gray-600">({vendor.totalSales} sales)</span>
                                {vendor.verified && (
                                  <Badge className="ml-2 bg-green-100 text-green-800 text-xs">
                                    <CheckCircle className="h-3 w-3 mr-1" />
                                    Verified
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              View Details
                            </Button>
                            <Button variant="outline" size="sm" className="text-yellow-600">
                              Review
                            </Button>
                            <Button variant="outline" size="sm" className="text-red-600">
                              Suspend
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Orders Overview */}
          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle>Recent Platform Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-3">Order ID</th>
                        <th className="text-left p-3">Date</th>
                        <th className="text-left p-3">Customer</th>
                        <th className="text-left p-3">Vendor</th>
                        <th className="text-left p-3">Amount</th>
                        <th className="text-left p-3">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockOrders.map((order) => {
                        const vendor = vendors.find(v => v.id === order.vendorId);
                        return (
                          <tr key={order.id} className="border-b hover:bg-gray-50">
                            <td className="p-3 font-medium">{order.id}</td>
                            <td className="p-3 text-sm">{order.date}</td>
                            <td className="p-3 text-sm">Customer #{order.customerId}</td>
                            <td className="p-3 text-sm">{vendor?.name}</td>
                            <td className="p-3 font-semibold" style={{ color: '#FF8C42' }}>
                              ${order.total.toFixed(2)}
                            </td>
                            <td className="p-3">
                              <Badge className={getStatusColor(order.status)}>
                                {order.status.toUpperCase()}
                              </Badge>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Logs */}
          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle>Security Audit Trail</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { type: 'info', message: 'User login: admin@test.com', time: '2 minutes ago' },
                    { type: 'success', message: 'New vendor verified: Happy Paws Shop', time: '1 hour ago' },
                    { type: 'warning', message: 'Multiple failed login attempts detected', time: '3 hours ago' },
                    { type: 'info', message: 'Product inventory updated by vendor v2', time: '5 hours ago' },
                    { type: 'success', message: 'Payment processed successfully: Order #ORD-001', time: '6 hours ago' }
                  ].map((log, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 border rounded-lg">
                      {log.type === 'success' && <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />}
                      {log.type === 'warning' && <AlertCircle className="h-5 w-5 text-yellow-500 mt-0.5" />}
                      {log.type === 'info' && <Shield className="h-5 w-5 text-blue-500 mt-0.5" />}
                      <div className="flex-1">
                        <p className="text-sm font-medium">{log.message}</p>
                        <p className="text-xs text-gray-500 mt-1">{log.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}