import { Toaster } from 'sonner';
import { CartProvider } from '@/lib/CartContext';
import Providers from './providers';
import './globals.css';

export const metadata = {
  title: 'PetZio - Everything Your Pet Needs',
  description: 'Your one-stop shop for all pet supplies, food, toys, and accessories',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <CartProvider>
            {children}
            <Toaster position="top-right" richColors />
          </CartProvider>
        </Providers>
      </body>
    </html>
  );
}