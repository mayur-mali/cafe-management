import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { inventoryAPI } from '../lib/api';
import { Plus, AlertTriangle } from 'lucide-react';

export default function InventoryPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    try {
      const res = await inventoryAPI.getAll();
      setItems(res.data);
    } catch (error) {
      console.error('[v0] Error fetching inventory:', error);
    } finally {
      setLoading(false);
    }
  };

  const isLowStock = (item: any) => item.quantity <= item.reorderLevel;

  if (loading) return <div>Loading inventory...</div>;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Inventory Management</h1>
        <Button className="gap-2 bg-primary hover:bg-primary/90">
          <Plus size={20} />
          Add Item
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {items.map((item: any) => (
          <Card
            key={item._id}
            className={`border-primary/10 ${isLowStock(item) ? 'border-destructive/50' : ''}`}
          >
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Item</p>
                  <p className="font-medium">{item.itemName}</p>
                  <p className="text-xs text-muted-foreground">{item.category}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Quantity</p>
                  <p className={`font-medium ${isLowStock(item) ? 'text-destructive' : ''}`}>
                    {item.quantity} {isLowStock(item) && <AlertTriangle className="inline ml-1" size={16} />}
                  </p>
                  <p className="text-xs text-muted-foreground">Reorder: {item.reorderLevel}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Unit Price</p>
                  <p className="font-medium">₹{item.unitPrice}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Value</p>
                  <p className="font-medium">₹{(item.quantity * item.unitPrice).toFixed(2)}</p>
                </div>
                <div className="flex items-end gap-2">
                  <Button size="sm" variant="outline">
                    Edit
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {items.length === 0 && (
        <Card className="border-primary/10">
          <CardContent className="pt-6 text-center text-muted-foreground">No inventory items. Start adding items.</CardContent>
        </Card>
      )}
    </div>
  );
}
