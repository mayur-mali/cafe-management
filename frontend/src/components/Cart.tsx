import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { X, Truck, Clock, ShoppingBag } from 'lucide-react';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  size?: string;
}

interface CartProps {
  items: CartItem[];
  onRemove: (id: string) => void;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onCheckout: (deliveryType: string) => void;
}

export default function Cart({ items, onRemove, onUpdateQuantity, onCheckout }: CartProps) {
  const [deliveryType, setDeliveryType] = useState('delivery');

  const itemsTotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = 3.0;
  const total = itemsTotal - discount;

  return (
    <div className="w-80 bg-white rounded-3xl p-6 shadow-lg">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-bold">Cart</h2>
        <div className="text-xs text-gray-500">Order #3263</div>
      </div>

      {/* Delivery Options */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setDeliveryType('delivery')}
          className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-full text-xs font-medium transition-colors ${
            deliveryType === 'delivery' ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-700'
          }`}
        >
          <Truck size={16} />
          Delivery
        </button>
        <button
          onClick={() => setDeliveryType('dine-in')}
          className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-full text-xs font-medium transition-colors ${
            deliveryType === 'dine-in' ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-700'
          }`}
        >
          <Clock size={16} />
          Dine in
        </button>
        <button
          onClick={() => setDeliveryType('takeaway')}
          className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-full text-xs font-medium transition-colors ${
            deliveryType === 'takeaway' ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-700'
          }`}
        >
          <ShoppingBag size={16} />
          Take away
        </button>
      </div>

      {/* Cart Items */}
      <div className="space-y-4 max-h-96 overflow-y-auto mb-6">
        {items.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <ShoppingBag size={32} className="mx-auto mb-2 opacity-30" />
            <p>Your cart is empty</p>
          </div>
        ) : (
          items.map((item) => (
            <div key={item.id} className="flex gap-3 pb-4 border-b">
              <div className="flex-1">
                <h3 className="font-medium text-sm">{item.name}</h3>
                <p className="text-xs text-gray-500">{item.size}</p>
              </div>
              <div className="text-right">
                <p className="font-medium text-sm">${item.price * item.quantity}</p>
                <div className="flex items-center gap-2 mt-1">
                  <button
                    onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                    className="w-5 h-5 flex items-center justify-center text-gray-500 hover:text-gray-700"
                  >
                    −
                  </button>
                  <span className="text-xs font-medium w-4 text-center">{item.quantity}</span>
                  <button
                    onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                    className="w-5 h-5 flex items-center justify-center text-gray-500 hover:text-gray-700"
                  >
                    +
                  </button>
                </div>
              </div>
              <button onClick={() => onRemove(item.id)} className="ml-2">
                <X size={16} className="text-gray-400 hover:text-gray-600" />
              </button>
            </div>
          ))
        )}
      </div>

      {/* Summary */}
      {items.length > 0 && (
        <>
          <div className="space-y-3 py-4 border-t border-b">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Items</span>
              <span className="font-medium">${itemsTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Discounts</span>
              <span className="font-medium">-${discount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-lg font-bold pt-2">
              <span>Total</span>
              <span className="text-[#FF9F6B]">${total.toFixed(2)}</span>
            </div>
          </div>

          {/* Checkout Button */}
          <Button
            onClick={() => onCheckout(deliveryType)}
            className="w-full mt-4 bg-[#FF9F6B] hover:bg-[#FF8B55] text-white font-medium py-3 rounded-full"
          >
            Place on order
          </Button>
        </>
      )}
    </div>
  );
}
