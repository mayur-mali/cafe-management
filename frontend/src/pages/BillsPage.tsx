import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { billsAPI } from '../lib/api';
import { Plus, FileText } from 'lucide-react';

export default function BillsPage() {
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBills();
  }, []);

  const fetchBills = async () => {
    try {
      const res = await billsAPI.getAll();
      setBills(res.data);
    } catch (error) {
      console.error('[v0] Error fetching bills:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-500/20 text-green-600';
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-600';
      case 'cancelled':
        return 'bg-red-500/20 text-red-600';
      default:
        return 'bg-gray-500/20 text-gray-600';
    }
  };

  if (loading) return <div>Loading bills...</div>;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Billing Management</h1>
        <Button className="gap-2 bg-primary hover:bg-primary/90">
          <Plus size={20} />
          New Bill
        </Button>
      </div>

      <div className="space-y-2">
        {bills.map((bill: any) => (
          <Card key={bill._id} className="border-primary/10">
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
                <div>
                  <p className="text-sm text-muted-foreground">Customer</p>
                  <p className="font-medium">{bill.customerName}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Amount</p>
                  <p className="font-medium text-primary">₹{bill.total.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Payment</p>
                  <p className="text-sm capitalize">{bill.paymentMethod}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <div className={`inline-block px-2 py-1 rounded text-xs font-medium ${getStatusColor(bill.status)}`}>
                    {bill.status}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <FileText size={16} />
                  </Button>
                  {bill.status === 'pending' && (
                    <Button size="sm" className="bg-primary hover:bg-primary/90">
                      Mark Paid
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {bills.length === 0 && (
        <Card className="border-primary/10">
          <CardContent className="pt-6 text-center text-muted-foreground">No bills generated yet. Create your first bill.</CardContent>
        </Card>
      )}
    </div>
  );
}
