import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { stationsAPI } from '../lib/api';
import { Plus, Wifi, AlertCircle } from 'lucide-react';

export default function StationsPage() {
  const [stations, setStations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStations();
  }, []);

  const fetchStations = async () => {
    try {
      const res = await stationsAPI.getAll();
      setStations(res.data);
    } catch (error) {
      console.error('[v0] Error fetching stations:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-green-500/20 text-green-600';
      case 'occupied':
        return 'bg-yellow-500/20 text-yellow-600';
      case 'maintenance':
        return 'bg-red-500/20 text-red-600';
      default:
        return 'bg-gray-500/20 text-gray-600';
    }
  };

  if (loading) return <div>Loading stations...</div>;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Gaming Stations</h1>
        <Button className="gap-2 bg-primary hover:bg-primary/90">
          <Plus size={20} />
          Add Station
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {stations.map((station: any) => (
          <Card key={station._id} className="border-primary/10">
            <CardHeader className="flex flex-row items-start justify-between space-y-0">
              <div>
                <CardTitle className="text-lg">{station.name}</CardTitle>
                <p className="text-sm text-muted-foreground">Station #{station.stationNumber}</p>
              </div>
              <div className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(station.status)}`}>
                {station.status}
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center gap-2">
                <Wifi size={16} className="text-muted-foreground" />
                <span className="text-sm">{station.systemType}</span>
              </div>
              <div className="text-sm text-muted-foreground">
                {station.specs && <p>{station.specs}</p>}
              </div>
              <div className="flex justify-between pt-2 border-t border-border">
                <span className="text-sm text-muted-foreground">Price/Hour:</span>
                <span className="font-medium">₹{station.pricePerHour}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {stations.length === 0 && (
        <Card className="border-primary/10">
          <CardContent className="pt-6 text-center text-muted-foreground">
            No stations added yet. Create your first gaming station.
          </CardContent>
        </Card>
      )}
    </div>
  );
}
