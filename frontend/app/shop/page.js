'use client';

import { useState, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { X } from 'lucide-react';
import { categories, brands, vendors } from '@/lib/mockData';
import api from '@/lib/api';

export default function ShopMain() {
  return (
    <Suspense fallback={"...Loading"}>
      <ShopPage />
    </Suspense>
  )
}

export function ShopPage() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('search') || '';
  const categoryParam = searchParams.get('category') || '';

  const [products, setProducts] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState(categoryParam ? [categoryParam] : []);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedVendors, setSelectedVendors] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [searchTerm, setSearchTerm] = useState(searchQuery);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await api.get('/products');
      // Map backend products to frontend expected structure
      const mappedProducts = response.data.map(p => ({
        id: p._id,
        name: p.pro_name,
        price: p.price,
        image: p.image,
        category: p.category,
        brand: p.ven_id?.shop_name || 'Unknown Vendor',
        vendorId: p.ven_id?._id || 'unknown',
        description: 'Quality pet product'
      }));
      setProducts(mappedProducts);
    } catch (error) {
      console.error('Failed to load products', error);
    }
  };

  useEffect(() => {
    if (categoryParam) {
      setSelectedCategories([categoryParam]);
    }
  }, [categoryParam]);

  useEffect(() => {
    if (searchQuery) {
      setSearchTerm(searchQuery);
    }
  }, [searchQuery]);

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      // Category filter
      if (selectedCategories.length > 0 && !selectedCategories.includes(product.category)) {
        return false;
      }

      // Brand filter (actually mapped to vendor shop_name for now)
      if (selectedBrands.length > 0 && !selectedBrands.includes(product.brand)) {
        return false;
      }

      // Vendor filter
      if (selectedVendors.length > 0 && !selectedVendors.includes(product.vendorId)) {
        return false;
      }

      // Price filter
      if (product.price < priceRange[0] || product.price > priceRange[1]) {
        return false;
      }

      // Search filter
      if (searchTerm) {
        const query = searchTerm.toLowerCase();
        return (
          product.name.toLowerCase().includes(query) ||
          product.brand.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query)
        );
      }

      return true;
    });
  }, [products, selectedCategories, selectedBrands, selectedVendors, priceRange, searchTerm]);

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSelectedBrands([]);
    setSelectedVendors([]);
    setPriceRange([0, 500]);
    setSearchTerm('');
  };

  const removeFilter = (type, value) => {
    if (type === 'category') {
      setSelectedCategories(prev => prev.filter(c => c !== value));
    } else if (type === 'brand') {
      setSelectedBrands(prev => prev.filter(b => b !== value));
    } else if (type === 'vendor') {
      setSelectedVendors(prev => prev.filter(v => v !== value));
    }
  };

  const activeFilterCount = selectedCategories.length + selectedBrands.length + selectedVendors.length;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="sticky top-20">
              <div className="bg-white rounded-lg border p-4">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold">Filters</h2>
                  {activeFilterCount > 0 && (
                    <Button variant="ghost" size="sm" onClick={clearAllFilters}>
                      Clear All
                    </Button>
                  )}
                </div>

                <Accordion type="multiple" defaultValue={['category', 'price']}>
                  {/* Category Filter */}
                  <AccordionItem value="category">
                    <AccordionTrigger>Category</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-3">
                        {categories.map((category) => (
                          <div key={category.id} className="flex items-center space-x-2">
                            <Checkbox
                              id={`cat-${category.id}`}
                              checked={selectedCategories.includes(category.id)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  setSelectedCategories([...selectedCategories, category.id]);
                                } else {
                                  setSelectedCategories(selectedCategories.filter(c => c !== category.id));
                                }
                              }}
                            />
                            <Label htmlFor={`cat-${category.id}`} className="cursor-pointer flex items-center">
                              <span className="mr-2">{category.icon}</span>
                              {category.name}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  {/* Price Filter */}
                  <AccordionItem value="price">
                    <AccordionTrigger>Price Range</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4">
                        <Slider
                          value={priceRange}
                          onValueChange={setPriceRange}
                          max={500}
                          step={10}
                          className="w-full"
                        />
                        <div className="flex items-center justify-between text-sm">
                          <span className="font-semibold">₹{priceRange[0]}</span>
                          <span className="font-semibold">₹{priceRange[1]}</span>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>



                </Accordion>
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <main className="flex-1">
            {/* Active Filters Bar */}
            {activeFilterCount > 0 && (
              <div className="bg-white rounded-lg border p-4 mb-6">
                <div className="flex flex-wrap gap-2 items-center">
                  <span className="text-sm font-semibold">Active Filters:</span>
                  {selectedCategories.map(cat => {
                    const category = categories.find(c => c.id === cat);
                    return (
                      <Badge key={cat} variant="secondary" className="flex items-center gap-1">
                        {category?.name}
                        <X
                          className="h-3 w-3 cursor-pointer"
                          onClick={() => removeFilter('category', cat)}
                        />
                      </Badge>
                    );
                  })}


                </div>
              </div>
            )}

            {/* Results Header */}
            <div className="mb-6">
              <h1 className="text-3xl font-bold mb-2">
                {searchTerm ? `Search Results for "${searchTerm}"` : 'All Products'}
              </h1>
              <p className="text-gray-600">{filteredProducts.length} products found</p>
            </div>

            {/* Product Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-semibold mb-2">No products found</h3>
                <p className="text-gray-600 mb-4">Try adjusting your filters or search terms</p>
                <Button onClick={clearAllFilters} style={{ backgroundColor: '#FF8C42' }}>
                  Clear All Filters
                </Button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}