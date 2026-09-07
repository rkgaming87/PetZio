'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { User, Mail, Phone, MapPin, Package, Settings, LogOut, Camera } from 'lucide-react';

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    username: 'JohnDoePetLover',
    email: 'johndoe@example.com',
    phone: '+1 234 567 8900',
    address: '123 Pet Street, Bark City, Doggo State 12345',
  });

  const handleSave = (e) => {
    e.preventDefault();
    setIsEditing(false);
    toast.success('Profile updated successfully!');
  };

  const handleLogout = () => {
    toast.info('Logged out successfully.');
    // handle router redirect in real app
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-neutral-900 shadow-xl rounded-3xl overflow-hidden border border-neutral-200 dark:border-neutral-800"
        >
          {/* Header Banner */}
          <div className="h-32 bg-gradient-to-r from-indigo-500 to-purple-600 relative">
            <div className="absolute -bottom-12 left-8">
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-white dark:bg-neutral-800 p-1">
                  <div className="w-full h-full rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-3xl font-bold text-indigo-600 dark:text-indigo-400">
                    {profileData.username.charAt(0)}
                  </div>
                </div>
                <button className="absolute bottom-0 right-0 bg-white dark:bg-neutral-800 p-1.5 rounded-full shadow-lg border border-neutral-200 dark:border-neutral-700 hover:text-indigo-600 transition-colors">
                  <Camera className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="pt-16 pb-8 px-8">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">{profileData.username}</h1>
                <p className="text-neutral-500 dark:text-neutral-400 flex items-center mt-1">
                  <Mail className="w-4 h-4 mr-1.5" />
                  {profileData.email}
                </p>
              </div>
              <button 
                onClick={handleLogout}
                className="flex items-center px-4 py-2 text-sm font-medium text-red-600 bg-red-50 dark:bg-red-950/30 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/50 transition-colors"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </button>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-neutral-200 dark:border-neutral-800 mt-8">
              <button
                onClick={() => setActiveTab('profile')}
                className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'profile'
                    ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                    : 'border-transparent text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300'
                }`}
              >
                Personal Info
              </button>
              <button
                onClick={() => setActiveTab('orders')}
                className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'orders'
                    ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                    : 'border-transparent text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300'
                }`}
              >
                Order History
              </button>
            </div>

            {/* Tab Content */}
            <div className="mt-8">
              {activeTab === 'profile' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium text-neutral-900 dark:text-white">Profile Details</h3>
                    <button
                      onClick={() => setIsEditing(!isEditing)}
                      className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:underline flex items-center"
                    >
                      <Settings className="w-4 h-4 mr-1" />
                      {isEditing ? 'Cancel' : 'Edit Profile'}
                    </button>
                  </div>

                  <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">Username</label>
                      <div className="mt-1 relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <User className="h-5 w-5 text-neutral-400" />
                        </div>
                        <input
                          type="text"
                          disabled={!isEditing}
                          value={profileData.username}
                          onChange={(e) => setProfileData({ ...profileData, username: e.target.value })}
                          className="block w-full pl-10 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-white focus:ring-indigo-500 focus:border-indigo-500 disabled:opacity-70 disabled:bg-neutral-100 dark:disabled:bg-neutral-800 py-2.5"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">Phone Number</label>
                      <div className="mt-1 relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Phone className="h-5 w-5 text-neutral-400" />
                        </div>
                        <input
                          type="tel"
                          disabled={!isEditing}
                          value={profileData.phone}
                          onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                          className="block w-full pl-10 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-white focus:ring-indigo-500 focus:border-indigo-500 disabled:opacity-70 disabled:bg-neutral-100 dark:disabled:bg-neutral-800 py-2.5"
                        />
                      </div>
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">Delivery Address</label>
                      <div className="mt-1 relative">
                        <div className="absolute inset-y-0 left-0 pl-3 pt-2.5 pointer-events-none">
                          <MapPin className="h-5 w-5 text-neutral-400" />
                        </div>
                        <textarea
                          disabled={!isEditing}
                          value={profileData.address}
                          onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
                          rows={3}
                          className="block w-full pl-10 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-white focus:ring-indigo-500 focus:border-indigo-500 disabled:opacity-70 disabled:bg-neutral-100 dark:disabled:bg-neutral-800 py-2.5 resize-none"
                        />
                      </div>
                    </div>

                    {isEditing && (
                      <div className="md:col-span-2 flex justify-end">
                        <button
                          type="submit"
                          className="px-6 py-2.5 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors"
                        >
                          Save Changes
                        </button>
                      </div>
                    )}
                  </form>
                </motion.div>
              )}

              {activeTab === 'orders' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="w-16 h-16 bg-indigo-50 dark:bg-indigo-900/20 rounded-full flex items-center justify-center mb-4">
                      <Package className="w-8 h-8 text-indigo-500" />
                    </div>
                    <h3 className="text-lg font-medium text-neutral-900 dark:text-white">No orders yet</h3>
                    <p className="text-neutral-500 dark:text-neutral-400 mt-1 max-w-sm">
                      When you buy something for your furry friend, it will show up here.
                    </p>
                    <button className="mt-6 px-6 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors">
                      Start Shopping
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
