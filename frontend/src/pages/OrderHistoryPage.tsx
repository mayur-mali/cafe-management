import { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import { Card } from '../components/ui/card';
import { billsAPI } from '../lib/api';
import { Clock, DollarSign } from 'lucide-react';

export default function OrderHistoryPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await billsAPI.getAll();
      setOrders(response.data);
    } catch (error) {
      console.error('[v0] Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex bg-[#FFF5F0] min-h-screen">
      <Sidebar />

      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Order History</h1>

        {loading ? (
          <div className="text-center py-8">Loading...</div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <Card key={order._id} className="bg-white rounded-2xl p-6 border-0 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-2">{order.customerName}</h3>
                    <div className="space-y-1 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Clock size={16} />
                        {new Date(order.createdAt).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-2">
                        <DollarSign size={16} />
                        {order.items?.map((item: any) => item.itemName).join(', ') || 'Gaming session'}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-[#FF9F6B]">
                      ${order.total?.toFixed(2) || '0.00'}
                    </div>
                    <div className={`text-sm font-medium mt-2 px-3 py-1 rounded-full ${
                      order.status === 'paid'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {order.status === 'paid' ? 'Paid' : 'Pending'}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
