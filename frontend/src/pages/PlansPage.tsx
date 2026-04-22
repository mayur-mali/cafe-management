import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { plansAPI } from '../lib/api';
import { Plus } from 'lucide-react';

export default function PlansPage() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const res = await plansAPI.getAll();
      setPlans(res.data);
    } catch (error) {
      console.error('[v0] Error fetching plans:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading plans...</div>;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Gaming Plans</h1>
        <Button className="gap-2 bg-primary hover:bg-primary/90">
          <Plus size={20} />
          New Plan
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {plans.map((plan: any) => (
          <Card key={plan._id} className="border-primary/10">
            <CardHeader>
              <CardTitle>{plan.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Duration:</span>
                <span className="font-medium">{plan.duration} mins</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Price:</span>
                <span className="font-medium text-primary">₹{plan.price}</span>
              </div>
              {plan.description && <p className="text-sm text-muted-foreground">{plan.description}</p>}
            </CardContent>
          </Card>
        ))}
      </div>

      {plans.length === 0 && (
        <Card className="border-primary/10">
          <CardContent className="pt-6 text-center text-muted-foreground">No plans created yet. Start by creating a new plan.</CardContent>
        </Card>
      )}
    </div>
  );
}
