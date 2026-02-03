// Mock Data for PetZio Platform

export const categories = [
  { id: 'dog', name: 'Dog', icon: '🐕', color: '#FF8C42' },
  { id: 'cat', name: 'Cat', icon: '🐱', color: '#4A90E2' },
  { id: 'bird', name: 'Bird', icon: '🦜', color: '#10B981' },
  { id: 'fish', name: 'Fish', icon: '🐠', color: '#06B6D4' },
  { id: 'small-pets', name: 'Small Pets', icon: '🐹', color: '#F59E0B' }
];

export const products = [
  // Dog Products
  { id: '1', name: 'Premium Dog Food - Chicken & Rice', category: 'dog', price: 45.99, rating: 4.8, reviews: 234, image: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=500', brand: 'PetNutrition', stock: 50, sku: 'DOG-FOOD-001', vendorId: 'v1', description: 'High-quality dog food with real chicken and wholesome rice. Perfect for adult dogs of all breeds.' },
  { id: '2', name: 'Interactive Dog Toy Ball', category: 'dog', price: 12.99, rating: 4.5, reviews: 189, image: 'https://images.unsplash.com/photo-1535914254981-b5012eebbd15?w=500', brand: 'PlayTime', stock: 120, sku: 'DOG-TOY-002', vendorId: 'v2', description: 'Durable rubber ball that keeps your dog entertained for hours.' },
  { id: '3', name: 'Comfortable Dog Bed - Large', category: 'dog', price: 79.99, rating: 4.9, reviews: 456, image: 'https://images.unsplash.com/photo-1591769225440-811ad7d6eab3?w=500', brand: 'ComfyPets', stock: 3, sku: 'DOG-BED-003', vendorId: 'v1', description: 'Orthopedic memory foam bed for large breed dogs. Machine washable cover.' },
  { id: '4', name: 'Leather Dog Collar with ID Tag', category: 'dog', price: 24.99, rating: 4.6, reviews: 312, image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500', brand: 'PetStyle', stock: 85, sku: 'DOG-ACC-004', vendorId: 'v3', description: 'Genuine leather collar with adjustable sizing and free ID tag.' },
  
  // Cat Products
  { id: '5', name: 'Organic Cat Food - Salmon', category: 'cat', price: 38.99, rating: 4.7, reviews: 298, image: 'https://images.unsplash.com/photo-1589652717521-10c0d092dea9?w=500', brand: 'FelineChoice', stock: 65, sku: 'CAT-FOOD-001', vendorId: 'v1', description: 'Wild-caught salmon with organic ingredients. No artificial preservatives.' },
  { id: '6', name: 'Multi-Level Cat Tree Tower', category: 'cat', price: 129.99, rating: 4.8, reviews: 523, image: 'https://images.unsplash.com/photo-1545249390-6bdfa286032f?w=500', brand: 'ClimbHigh', stock: 15, sku: 'CAT-FURN-002', vendorId: 'v2', description: '5-tier cat tower with scratching posts, hanging toys, and cozy condos.' },
  { id: '7', name: 'Self-Cleaning Cat Litter Box', category: 'cat', price: 189.99, rating: 4.4, reviews: 167, image: 'https://images.unsplash.com/photo-1595433707802-6b2626ef1c91?w=500', brand: 'CleanPaws', stock: 22, sku: 'CAT-LITTER-003', vendorId: 'v3', description: 'Automatic litter box with odor control and waste disposal system.' },
  { id: '8', name: 'Catnip Toy Set (5 pieces)', category: 'cat', price: 15.99, rating: 4.9, reviews: 678, image: 'https://images.unsplash.com/photo-1548247416-ec66f4900b2e?w=500', brand: 'PlayTime', stock: 200, sku: 'CAT-TOY-004', vendorId: 'v2', description: 'Set of 5 premium catnip-filled toys in various shapes.' },
  
  // Bird Products
  { id: '9', name: 'Premium Bird Seed Mix', category: 'bird', price: 22.99, rating: 4.6, reviews: 145, image: 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=500', brand: 'BirdLife', stock: 90, sku: 'BIRD-FOOD-001', vendorId: 'v1', description: 'Nutritious seed blend for parrots, cockatiels, and parakeets.' },
  { id: '10', name: 'Large Bird Cage with Stand', category: 'bird', price: 159.99, rating: 4.7, reviews: 89, image: 'https://images.unsplash.com/photo-1535591273668-578e31182c4f?w=500', brand: 'BirdHome', stock: 12, sku: 'BIRD-CAGE-002', vendorId: 'v3', description: 'Spacious cage with multiple perches and feeding stations.' },
  
  // Fish Products
  { id: '11', name: '20-Gallon Aquarium Starter Kit', category: 'fish', price: 99.99, rating: 4.5, reviews: 234, image: 'https://images.unsplash.com/photo-1520990269031-33c79ed2bf0e?w=500', brand: 'AquaLife', stock: 28, sku: 'FISH-TANK-001', vendorId: 'v2', description: 'Complete kit with filter, heater, LED lights, and accessories.' },
  { id: '12', name: 'Tropical Fish Food Flakes', category: 'fish', price: 12.99, rating: 4.8, reviews: 456, image: 'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?w=500', brand: 'AquaNutrition', stock: 150, sku: 'FISH-FOOD-002', vendorId: 'v1', description: 'High-protein flakes for all tropical fish species.' },
  
  // Small Pets
  { id: '13', name: 'Hamster Cage Deluxe', category: 'small-pets', price: 54.99, rating: 4.6, reviews: 178, image: 'https://images.unsplash.com/photo-1425082661705-1834bfd09dca?w=500', brand: 'SmallWorld', stock: 35, sku: 'SMALL-CAGE-001', vendorId: 'v3', description: 'Multi-level cage with tunnels, wheel, and feeding area.' },
  { id: '14', name: 'Guinea Pig Food Mix', category: 'small-pets', price: 18.99, rating: 4.7, reviews: 267, image: 'https://images.unsplash.com/photo-1548767797-d8c844163c4c?w=500', brand: 'PetNutrition', stock: 95, sku: 'SMALL-FOOD-002', vendorId: 'v1', description: 'Vitamin C enriched food blend for guinea pigs and rabbits.' }
];

export const vendors = [
  { id: 'v1', name: 'Pet Paradise Store', rating: 4.8, totalSales: 1250, image: 'https://images.unsplash.com/photo-1548767797-d8c844163c4c?w=200', location: 'New York, NY', verified: true },
  { id: 'v2', name: 'Happy Paws Shop', rating: 4.6, totalSales: 980, image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=200', location: 'Los Angeles, CA', verified: true },
  { id: 'v3', name: 'Animal Kingdom', rating: 4.9, totalSales: 1450, image: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=200', location: 'Chicago, IL', verified: true }
];

export const mockUsers = [
  { id: 'u1', email: 'customer@test.com', password: 'customer123', role: 'customer', name: 'John Doe', avatar: 'https://i.pravatar.cc/150?img=1' },
  { id: 'u2', email: 'vendor@test.com', password: 'vendor123', role: 'vendor', name: 'Jane Smith', avatar: 'https://i.pravatar.cc/150?img=2', vendorId: 'v1' },
  { id: 'u3', email: 'admin@test.com', password: 'admin123', role: 'admin', name: 'Admin User', avatar: 'https://i.pravatar.cc/150?img=3' }
];

export const mockOrders = [
  { id: 'ORD-001', customerId: 'u1', vendorId: 'v1', items: [{ productId: '1', quantity: 2, price: 45.99 }], total: 91.98, status: 'delivered', date: '2025-05-15', shippingAddress: '123 Main St, New York, NY 10001' },
  { id: 'ORD-002', customerId: 'u1', vendorId: 'v2', items: [{ productId: '6', quantity: 1, price: 129.99 }], total: 129.99, status: 'shipped', date: '2025-05-20', shippingAddress: '123 Main St, New York, NY 10001' },
  { id: 'ORD-003', customerId: 'u1', vendorId: 'v1', items: [{ productId: '5', quantity: 3, price: 38.99 }], total: 116.97, status: 'processing', date: '2025-05-25', shippingAddress: '123 Main St, New York, NY 10001' }
];

export const brands = ['PetNutrition', 'PlayTime', 'ComfyPets', 'PetStyle', 'FelineChoice', 'ClimbHigh', 'CleanPaws', 'BirdLife', 'BirdHome', 'AquaLife', 'AquaNutrition', 'SmallWorld'];

export const priceRanges = [
  { id: '1', label: 'Under $25', min: 0, max: 25 },
  { id: '2', label: '$25 - $50', min: 25, max: 50 },
  { id: '3', label: '$50 - $100', min: 50, max: 100 },
  { id: '4', label: '$100 - $200', min: 100, max: 200 },
  { id: '5', label: 'Over $200', min: 200, max: 999999 }
];