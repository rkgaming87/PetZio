'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Package, Truck, CheckCircle2, MapPin } from 'lucide-react';
import { toast } from 'sonner';

export default function TrackOrderPage() {
  const [orderId, setOrderId] = useState('');
  const [isTracking, setIsTracking] = useState(false);
  const [trackingData, setTrackingData] = useState(null);

  const handleTrack = (e) => {
    e.preventDefault();
    if (!orderId.trim()) {
      toast.error('Please enter a valid Order ID');
      return;
    }
    
    setIsTracking(true);
    // Simulate API call
    setTimeout(() => {
      setTrackingData({
        id: orderId,
        status: 'shipped', // processing, shipped, out_for_delivery, delivered
        estimatedDelivery: 'Oct 12, 2026',
        items: [
          { name: 'Premium Dog Food', qty: 2 },
          { name: 'Squeaky Toy', qty: 1 }
        ],
        steps: [
          { id: 1, name: 'Order Placed', completed: true, date: 'Oct 8, 10:00 AM', icon: Package },
          { id: 2, name: 'Processing', completed: true, date: 'Oct 9, 2:30 PM', icon: MapPin },
          { id: 3, name: 'Shipped', completed: true, date: 'Oct 10, 8:15 AM', icon: Truck },
          { id: 4, name: 'Out for Delivery', completed: false, date: 'Pending', icon: MapPin },
          { id: 5, name: 'Delivered', completed: false, date: 'Pending', icon: CheckCircle2 },
        ]
      });
      setIsTracking(false);
      toast.success('Tracking information retrieved!');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <h1 className="text-3xl font-bold text-neutral-900 dark:text-white">Track Your Order</h1>
          <p className="mt-2 text-neutral-500 dark:text-neutral-400">Enter your Order ID below to see the current status of your pet supplies.</p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-neutral-900 shadow-xl rounded-2xl p-6 md:p-8 border border-neutral-200 dark:border-neutral-800 mb-8"
        >
          <form onSubmit={handleTrack} className="flex gap-4">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-neutral-400" />
              </div>
              <input
                type="text"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                placeholder="e.g. ORD-12345-XYZ"
                className="block w-full pl-10 pr-3 py-3 border border-neutral-200 dark:border-neutral-700 rounded-xl leading-5 bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors"
              />
            </div>
            <button
              type="submit"
              disabled={isTracking}
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-sm font-medium rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-70 transition-all shadow-md"
            >
              {isTracking ? 'Searching...' : 'Track'}
            </button>
          </form>
        </motion.div>

        {trackingData && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="bg-white dark:bg-neutral-900 shadow-xl rounded-2xl p-6 md:p-8 border border-neutral-200 dark:border-neutral-800"
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 pb-6 border-b border-neutral-200 dark:border-neutral-800">
              <div>
                <h2 className="text-xl font-bold text-neutral-900 dark:text-white flex items-center gap-2">
                  Order #{trackingData.id}
                </h2>
                <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
                  Estimated Delivery: <span className="font-medium text-neutral-900 dark:text-white">{trackingData.estimatedDelivery}</span>
                </p>
              </div>
              <div className="mt-4 md:mt-0 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 px-4 py-2 rounded-full text-sm font-medium capitalize">
                Status: {trackingData.status.replace(/_/g, ' ')}
              </div>
            </div>

            {/* Timeline */}
            <div className="relative py-8">
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-neutral-200 dark:bg-neutral-800 md:left-1/2 md:-ml-0.5"></div>
              
              <div className="space-y-12">
                {trackingData.steps.map((step, index) => {
                  const Icon = step.icon;
                  return (
                    <div key={step.id} className={`relative flex items-center ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                      <div className="absolute left-8 md:left-1/2 -ml-4 w-8 h-8 rounded-full border-4 border-white dark:border-neutral-900 flex items-center justify-center z-10 
                        ${step.completed ? 'bg-indigo-600' : 'bg-neutral-300 dark:bg-neutral-700'}"
                        style={{ backgroundColor: step.completed ? '#4f46e5' : '#737373' }}
                      >
                        <Icon className="w-3.5 h-3.5 text-white" />
                      </div>
                      
                      <div className={`ml-20 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pl-12' : 'md:pr-12 md:text-right'}`}>
                        <div className={`p-4 rounded-xl border ${step.completed ? 'bg-indigo-50/50 dark:bg-indigo-900/10 border-indigo-100 dark:border-indigo-900/30' : 'bg-neutral-50 dark:bg-neutral-800/30 border-neutral-100 dark:border-neutral-800'}`}>
                          <h3 className={`text-base font-bold ${step.completed ? 'text-neutral-900 dark:text-white' : 'text-neutral-500 dark:text-neutral-400'}`}>
                            {step.name}
                          </h3>
                          <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">{step.date}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
