'use client';

import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Package, Home } from 'lucide-react';

export default function OrderConfirmationPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-20">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-green-100 mb-6">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
            <h1 className="text-4xl font-bold mb-4">Order Placed Successfully!</h1>
            <p className="text-xl text-gray-600">
              Thank you for your purchase. Your order has been confirmed and will be shipped soon.
            </p>
          </div>

          <Card className="mb-8">
            <CardContent className="p-8">
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Order Number</p>
                  <p className="text-2xl font-bold" style={{ color: '#FF8C42' }}>
                    #ORD-{Math.random().toString(36).substr(2, 9).toUpperCase()}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Order Date</p>
                    <p className="font-semibold">{new Date().toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Estimated Delivery</p>
                    <p className="font-semibold">
                      {new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
            <Package className="h-8 w-8 text-blue-600 mx-auto mb-3" />
            <h3 className="font-semibold text-lg mb-2">What's Next?</h3>
            <ul className="text-sm text-gray-700 space-y-2 text-left max-w-md mx-auto">
              <li>• You'll receive an email confirmation shortly</li>
              <li>• Track your order status in your dashboard</li>
              <li>• Your items will be carefully packaged and shipped</li>
              <li>• Expect delivery within 5-7 business days</li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/dashboard">
              <Button size="lg" style={{ backgroundColor: '#FF8C42' }} className="w-full sm:w-auto">
                <Package className="mr-2 h-5 w-5" />
                Track Order
              </Button>
            </Link>
            <Link href="/">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                <Home className="mr-2 h-5 w-5" />
                Back to Home
              </Button>
            </Link>
          </div>

          <div className="mt-12 pt-8 border-t">
            <p className="text-gray-600 mb-4">Need help with your order?</p>
            <p className="text-sm text-gray-500">
              Contact us at{' '}
              <a href="mailto:support@petzio.com" className="text-blue-600 hover:underline">
                support@petzio.com
              </a>
              {' '}or call (555) 123-4567
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}