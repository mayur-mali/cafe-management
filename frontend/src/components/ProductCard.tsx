import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Minus, Plus } from 'lucide-react';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  sizes?: string[];
  onAddToCart: (product: any, quantity: number, size: string) => void;
}

export default function ProductCard({
  id,
  name,
  price,
  description,
  image,
  sizes = ['Small', 'Large'],
  onAddToCart,
}: ProductCardProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(sizes[0]);

  const handleAddToCart = () => {
    onAddToCart(
      { id, name, price, description, image },
      quantity,
      selectedSize
    );
    setQuantity(1);
  };

  return (
    <Card className="bg-white rounded-2xl p-4 border-0 shadow-sm hover:shadow-md transition-shadow">
      {/* Image */}
      <div className="w-full h-40 bg-gradient-to-br from-[#FFE4D4] to-[#FFDAC3] rounded-xl mb-4 flex items-center justify-center overflow-hidden">
        <img
          src={image}
          alt={name}
          className="h-32 w-32 object-contain"
        />
      </div>

      {/* Content */}
      <div className="space-y-3">
        <div className="flex justify-between items-start gap-2">
          <h3 className="font-semibold text-sm">{name}</h3>
          <span className="text-[#FF9F6B] font-bold text-sm">$ {price.toFixed(2)}</span>
        </div>

        <p className="text-xs text-gray-600 line-clamp-2">{description}</p>

        {/* Size Selection */}
        <div className="flex gap-2">
          <span className="text-xs text-gray-600 py-2">Size</span>
          <div className="flex gap-2">
            {sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                  selectedSize === size
                    ? 'bg-gray-800 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Quantity & Add to Cart */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 border border-gray-200 rounded-full px-3 py-1">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="text-gray-600 hover:text-gray-800"
            >
              <Minus size={14} />
            </button>
            <span className="text-sm font-medium w-4 text-center">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="text-gray-600 hover:text-gray-800"
            >
              <Plus size={14} />
            </button>
          </div>
          <Button
            onClick={handleAddToCart}
            className="flex-1 bg-[#FF9F6B] hover:bg-[#FF8B55] text-white text-xs font-medium py-2 rounded-full"
          >
            Added to cart
          </Button>
        </div>
      </div>
    </Card>
  );
}
