import { toast } from 'sonner';
import { Bell, CheckCircle, AlertTriangle, Info } from 'lucide-react';
import React from 'react';

/**
 * Global Notification System wrapper for PetZio
 * Uses sonner under the hood but provides domain-specific notification types
 * as required by the Notification Module in the synopsis.
 */
export const notify = {
  success: (message, description) => {
    toast.success(message, {
      description,
      icon: <CheckCircle className="w-5 h-5 text-green-500" />
    });
  },
  error: (message, description) => {
    toast.error(message, {
      description,
      icon: <AlertTriangle className="w-5 h-5 text-red-500" />
    });
  },
  info: (message, description) => {
    toast.info(message, {
      description,
      icon: <Info className="w-5 h-5 text-blue-500" />
    });
  },
  orderUpdate: (orderId, status) => {
    toast(
      <div className="flex flex-col gap-1">
        <span className="font-semibold text-sm">Order #{orderId} Update</span>
        <span className="text-xs text-neutral-500 dark:text-neutral-400">
          Your order is now: {status.replace(/_/g, ' ')}
        </span>
      </div>,
      { icon: <Bell className="w-5 h-5 text-indigo-500" /> }
    );
  },
  deliveryAlert: (message) => {
    toast(
      <div className="flex flex-col gap-1">
        <span className="font-semibold text-sm">Delivery Alert</span>
        <span className="text-xs text-neutral-500 dark:text-neutral-400">{message}</span>
      </div>,
      { icon: <Bell className="w-5 h-5 text-purple-500" /> }
    );
  }
};

export default notify;
