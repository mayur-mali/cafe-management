import { useState, useEffect } from 'react';
import { Search, Filter } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Cart from '../components/Cart';
import ProductCard from '../components/ProductCard';
import { sessionsAPI, inventoryAPI, billsAPI } from '../lib/api';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  size?: string;
}

export default function CafeMenuPage() {
  const { admin } = useAuth();
  const navigate = useNavigate();
  const [products, setProducts] = useState<any[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('Coffee');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const categories = ['Coffee', 'Non Coffee', 'Food', 'Snack', 'Dessert'];

  // Sample products - in production, fetch from API
  const sampleProducts = [
    {
      id: '1',
      name: 'Cappuccino',
      price: 4.98,
      category: 'Coffee',
      description: 'Espresso mixed with steamed milk and foam sugar makes this one popular.',
      image: '☕',
      sizes: ['Small', 'Large'],
    },
    {
      id: '2',
      name: 'Coffee Latte',
      price: 5.98,
      category: 'Coffee',
      description: 'One of the popular types of coffee is creamy, smooth, and aromatic.',
      image: '🍶',
      sizes: ['Small', 'Large'],
    },
    {
      id: '3',
      name: 'Americano',
      price: 5.98,
      category: 'Coffee',
      description: 'Americano coffee is espresso drinks combined with hot water.',
      image: '☕',
      sizes: ['Small', 'Large'],
    },
    {
      id: '4',
      name: 'V60',
      price: 5.98,
      category: 'Coffee',
      description: 'The V60 technique is one of the most used techniques by barista.',
      image: '☕',
      sizes: ['Small', 'Large'],
    },
    {
      id: '5',
      name: 'Iced Tea',
      price: 3.98,
      category: 'Non Coffee',
      description: 'Refreshing iced tea with natural flavors and aroma.',
      image: '🍵',
      sizes: ['Small', 'Large'],
    },
    {
      id: '6',
      name: 'Burger',
      price: 8.50,
      category: 'Food',
      description: 'Delicious burger with fresh ingredients and special sauce.',
      image: '🍔',
      sizes: ['Regular', 'Large'],
    },
    {
      id: '7',
      name: 'Fries',
      price: 4.00,
      category: 'Food',
      description: 'Crispy golden fries with perfect seasoning.',
      image: '🍟',
      sizes: ['Small', 'Large'],
    },
    {
      id: '8',
      name: 'Pastry',
      price: 3.50,
      category: 'Snack',
      description: 'Fresh and delicious pastries baked daily.',
      image: '🥐',
      sizes: ['Single', 'Pack'],
    },
  ];

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      // In production, fetch from API
      // const response = await inventoryAPI.getAll();
      // setProducts(response.data);
      setProducts(sampleProducts);
      setError('');
    } catch (err) {
      console.error('[v0] Error fetching products:', err);
      setError('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter((product) => {
    const matchesCategory = product.category === selectedCategory;
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleAddToCart = (product: any, quantity: number, size: string) => {
    const cartItemId = `${product.id}-${size}`;
    const existingItem = cart.find((item) => item.id === cartItemId);

    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.id === cartItemId ? { ...item, quantity: item.quantity + quantity } : item
        )
      );
    } else {
      setCart([
        ...cart,
        {
          id: cartItemId,
          name: product.name,
          price: product.price,
          quantity,
          size,
        },
      ]);
    }
  };

  const handleRemoveFromCart = (itemId: string) => {
    setCart(cart.filter((item) => item.id !== itemId));
  };

  const handleUpdateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveFromCart(itemId);
      return;
    }
    setCart(cart.map((item) => (item.id === itemId ? { ...item, quantity } : item)));
  };

  const handleCheckout = async (deliveryType: string) => {
    try {
      // Create a session first
      const sessionResponse = await sessionsAPI.create({
        customerName: admin?.fullName || 'Customer',
        stationId: 'cafe-station', // Mock station ID
        planId: 'plan-1', // Mock plan ID
      });

      const sessionId = sessionResponse.data._id;

      // Prepare bill items from cart
      const billItems = cart.map((item) => ({
        itemName: item.name,
        quantity: item.quantity,
        unitPrice: item.price,
      }));

      // End the session
      await sessionsAPI.end(sessionId);

      // Generate bill automatically
      const billResponse = await sessionsAPI.generateBill(sessionId, {
        items: billItems,
        discount: 3.0,
        taxRate: 0.1,
        paymentMethod: 'card',
        notes: `${deliveryType} order`,
      });

      const billId = billResponse.data.bill._id;

      // Mark bill as paid
      await billsAPI.pay(billId, 'card');

      // Clear cart and show success
      setCart([]);
      alert(`Order placed successfully!\nBill: ${billId}\nDelivery: ${deliveryType}`);
    } catch (err) {
      console.error('[v0] Checkout error:', err);
      alert('Failed to place order. Please try again.');
    }
  };

  return (
    <div className="flex bg-[#FFF5F0] min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex gap-8 p-8">
        {/* Menu Section */}
        <div className="flex-1">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Browse our menu</h1>

            {/* Search and Filter */}
            <div className="flex gap-4 mb-6">
              <div className="flex-1 relative">
                <Search size={20} className="absolute left-4 top-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-white rounded-full border-0 focus:outline-none focus:ring-2 focus:ring-[#FF9F6B]"
                />
              </div>
              <button className="flex items-center gap-2 px-6 py-2 bg-[#FF9F6B] text-white rounded-full font-medium hover:bg-[#FF8B55]">
                <Filter size={20} />
                Filter
              </button>
            </div>

            {/* Category Tabs */}
            <div className="flex gap-4">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-2 rounded-full font-medium transition-colors ${
                    selectedCategory === category
                      ? 'bg-[#FF9F6B] text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Products Grid */}
          <div>
            <h2 className="text-lg font-semibold mb-4">{selectedCategory} menu</h2>
            {loading ? (
              <div className="text-center py-8 text-gray-500">Loading products...</div>
            ) : error ? (
              <div className="text-center py-8 text-red-500">{error}</div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-8 text-gray-500">No products found</div>
            ) : (
              <div className="grid grid-cols-2 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    id={product.id}
                    name={product.name}
                    price={product.price}
                    description={product.description}
                    image={product.image}
                    sizes={product.sizes}
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Cart Section */}
        <Cart
          items={cart}
          onRemove={handleRemoveFromCart}
          onUpdateQuantity={handleUpdateQuantity}
          onCheckout={handleCheckout}
        />
      </div>
    </div>
  );
}
