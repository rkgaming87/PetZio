'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

const CartContext = createContext();

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

function getUserIdFromToken() {
  if (typeof window === 'undefined') return null;
  const token = localStorage.getItem('petzio_token');
  if (!token) return null;
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    const parsed = JSON.parse(jsonPayload);
    return parsed.id || null;
  } catch (e) {
    return null;
  }
}

export function CartProvider({ children }) {
  const { data: session, status } = useSession();
  const [cart, setCart] = useState([]);
  const [isInitialized, setIsInitialized] = useState(false);
  const [localTokenUserId, setLocalTokenUserId] = useState(null);

  // Check localStorage token on mount and storage events
  useEffect(() => {
    const checkToken = () => {
      const id = getUserIdFromToken();
      setLocalTokenUserId(id);
    };
    checkToken();
    window.addEventListener('storage', checkToken);
    // Periodically check in case token is added/removed in current tab
    const interval = setInterval(checkToken, 1000);
    return () => {
      window.removeEventListener('storage', checkToken);
      clearInterval(interval);
    };
  }, []);

  const userId = session?.user?.id || localTokenUserId;
  
  useEffect(() => {
    console.log('CartContext Session:', session);
    console.log('CartContext UserID:', userId);
  }, [session, userId]);

  // Load cart from DB or localStorage on mount/auth change
  useEffect(() => {
    if (status === 'loading') return;

    const loadCart = async () => {
      try {
        if (userId) {
          // Fetch from database
          const res = await fetch(`${API_BASE_URL}/cart/${userId}`);
          if (res.ok) {
            const data = await res.json();
            if (data.items && data.items.length > 0) {
              setCart(data.items);
            } else {
              // Try to migrate local storage to DB if DB is empty
              const savedCart = localStorage.getItem('petzio-cart');
              if (savedCart) {
                const parsed = JSON.parse(savedCart);
                if (parsed.length > 0) {
                  setCart(parsed);
                }
              }
            }
          }
        } else {
          // Fetch from localStorage
          const savedCart = localStorage.getItem('petzio-cart');
          if (savedCart) {
            setCart(JSON.parse(savedCart));
          }
        }
      } catch (e) {
        console.error('Failed to load cart', e);
      } finally {
        setIsInitialized(true);
      }
    };
    
    loadCart();
  }, [userId, status]);

  // Save cart to DB or localStorage whenever it changes
  useEffect(() => {
    if (!isInitialized) return;

    const syncCart = async () => {
      console.log('--- syncCart Triggered ---');
      console.log('Current cart:', cart);
      console.log('Current userId:', userId);
      
      if (userId) {
        try {
          console.log('Attempting fetch to:', `${API_BASE_URL}/cart/${userId}`);
          const res = await fetch(`${API_BASE_URL}/cart/${userId}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ items: cart })
          });
          
          console.log('Fetch response status:', res.status);
          // Also clear local storage to prevent duplicate migration later
          localStorage.removeItem('petzio-cart');
        } catch (e) {
          console.error('Failed to sync cart to DB', e);
        }
      } else {
        localStorage.setItem('petzio-cart', JSON.stringify(cart));
      }
    };

    syncCart();
  }, [cart, isInitialized, userId]);

  const addToCart = (product, quantity = 1) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevCart, { ...product, quantity }];
    });
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getCartCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartCount
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}