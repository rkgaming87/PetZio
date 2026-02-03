'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { categories, products, vendors } from '@/lib/mockData';
import { ArrowRight, Star, Shield, Truck, Heart } from 'lucide-react';

export default function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    // Get top rated products
    const topProducts = [...products]
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 8);
    setFeaturedProducts(topProducts);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-orange-50 to-blue-50 py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <div className="lg:w-1/2 mb-10 lg:mb-0">
              <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Everything your pet needs,{' '}
                <span style={{ color: '#FF8C42' }}>thoughtfully organized</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Premium pet supplies from trusted vendors. Quality products for dogs, cats, birds, fish, and small pets.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/shop">
                  <Button size="lg" style={{ backgroundColor: '#FF8C42' }} className="text-white hover:opacity-90">
                    Shop Now <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/shop">
                  <Button size="lg" variant="outline" style={{ borderColor: '#4A90E2', color: '#4A90E2' }}>
                    Browse Categories
                  </Button>
                </Link>
              </div>
            </div>
            <div className="lg:w-1/2 flex justify-center">
              <img
                src="https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=600"
                alt="Happy pets"
                className="rounded-2xl shadow-2xl max-w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-12 bg-white border-y">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center justify-center space-x-4">
              <Shield className="h-10 w-10" style={{ color: '#FF8C42' }} />
              <div>
                <h3 className="font-semibold text-lg">Verified Vendors</h3>
                <p className="text-gray-600 text-sm">All sellers are authenticated</p>
              </div>
            </div>
            <div className="flex items-center justify-center space-x-4">
              <Truck className="h-10 w-10" style={{ color: '#4A90E2' }} />
              <div>
                <h3 className="font-semibold text-lg">Fast Delivery</h3>
                <p className="text-gray-600 text-sm">Free shipping on orders over $50</p>
              </div>
            </div>
            <div className="flex items-center justify-center space-x-4">
              <Heart className="h-10 w-10" style={{ color: '#10B981' }} />
              <div>
                <h3 className="font-semibold text-lg">Pet Care Guaranteed</h3>
                <p className="text-gray-600 text-sm">Quality products for healthy pets</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pet Categories */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Shop by Pet</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {categories.map((category) => (
              <Link href={`/shop?category=${category.id}`} key={category.id}>
                <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer group">
                  <CardContent className="p-6 text-center">
                    <div
                      className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300"
                      style={{ color: category.color }}
                    >
                      {category.icon}
                    </div>
                    <h3 className="font-semibold text-lg">{category.name}</h3>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-4xl font-bold">Featured Products</h2>
            <Link href="/shop">
              <Button variant="outline">
                View All <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Vendor Spotlight */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Top Rated Vendors</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {vendors.map((vendor) => (
              <Card key={vendor.id} className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6 text-center">
                  <img
                    src={vendor.image}
                    alt={vendor.name}
                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h3 className="font-semibold text-xl mb-2">{vendor.name}</h3>
                  <p className="text-gray-600 text-sm mb-3">{vendor.location}</p>
                  <div className="flex items-center justify-center mb-3">
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400 mr-1" />
                    <span className="font-semibold">{vendor.rating}</span>
                    <span className="text-gray-600 ml-2">({vendor.totalSales} sales)</span>
                  </div>
                  {vendor.verified && (
                    <div className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-800 text-sm">
                      <Shield className="h-4 w-4 mr-1" />
                      Verified
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-orange-100 to-blue-100">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to spoil your pet?</h2>
          <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
            Join thousands of happy pet owners. Get exclusive deals and premium products delivered to your door.
          </p>
          <Link href="/shop">
            <Button size="lg" style={{ backgroundColor: '#FF8C42' }} className="text-white hover:opacity-90">
              Start Shopping <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="text-3xl">🐾</div>
                <span className="text-2xl font-bold" style={{ color: '#FF8C42' }}>PetZio</span>
              </div>
              <p className="text-gray-400">Everything your pet needs, thoughtfully organized.</p>
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-4">Shop</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/shop?category=dog" className="hover:text-white">Dogs</Link></li>
                <li><Link href="/shop?category=cat" className="hover:text-white">Cats</Link></li>
                <li><Link href="/shop?category=bird" className="hover:text-white">Birds</Link></li>
                <li><Link href="/shop?category=fish" className="hover:text-white">Fish</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Help Center</a></li>
                <li><a href="#" className="hover:text-white">Shipping Info</a></li>
                <li><a href="#" className="hover:text-white">Returns</a></li>
                <li><a href="#" className="hover:text-white">Contact Us</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-4">Account</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/auth/signin" className="hover:text-white">Sign In</Link></li>
                <li><Link href="/dashboard" className="hover:text-white">My Account</Link></li>
                <li><Link href="/cart" className="hover:text-white">Cart</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 PetZio. All rights reserved. Built with ❤️ for pets.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}