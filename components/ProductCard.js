'use client';

import { Star, ShoppingCart } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/lib/CartContext';
import { toast } from 'sonner';
import Link from 'next/link';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  const handleQuickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <Link href={`/product/${product.id}`}>
      <Card className="h-full hover:shadow-lg transition-shadow duration-300 cursor-pointer group">
        <CardContent className="p-4">
          <div className="relative aspect-square mb-3 overflow-hidden rounded-lg bg-gray-100">
            <img
              src={product.image}
              alt={product.name}
              className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
            />
            {product.stock < 10 && product.stock > 0 && (
              <Badge className="absolute top-2 right-2 bg-orange-500">Only {product.stock} left!</Badge>
            )}
            {product.stock === 0 && (
              <Badge className="absolute top-2 right-2 bg-red-500">Out of Stock</Badge>
            )}
          </div>
          
          <div className="space-y-2">
            <h3 className="font-semibold text-sm line-clamp-2 min-h-[40px]">{product.name}</h3>
            <p className="text-xs text-gray-500">{product.brand}</p>
            
            <div className="flex items-center space-x-1">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-3 w-3 ${
                      i < Math.floor(product.rating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs text-gray-600">({product.reviews})</span>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="p-4 pt-0 flex items-center justify-between">
          <div>
            <p className="text-2xl font-bold" style={{ color: '#FF8C42' }}>${product.price}</p>
          </div>
          <Button
            size="sm"
            style={{ backgroundColor: '#FF8C42' }}
            className="text-white hover:opacity-90"
            onClick={handleQuickAdd}
            disabled={product.stock === 0}
          >
            <ShoppingCart className="h-4 w-4 mr-1" />
            Add
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
}