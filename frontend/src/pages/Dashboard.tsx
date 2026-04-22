import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { sessionsAPI, stationsAPI, billsAPI } from '../lib/api';
import { Users, Zap, TrendingUp, Wallet } from 'lucide-react';

export default function Dashboard() {
  const [stats, setStats] = useState({
    activeSessions: 0,
    availableStations: 0,
    totalRevenue: 0,
    pendingBills: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [sessionsRes, stationsRes, billsRes, statsRes] = await Promise.all([
          sessionsAPI.getActive(),
          stationsAPI.getAll(),
          billsAPI.getByStatus('pending'),
          billsAPI.getStats(),
        ]);

        const availableCount = sessionsRes.data.filter((s: any) => s.status === 'active').length;
        const stationCount = stationsRes.data.filter((s: any) => s.status === 'available').length;

        setStats({
          activeSessions: availableCount,
          availableStations: stationCount,
          totalRevenue: statsRes.data.totalRevenue || 0,
          pendingBills: billsRes.data.length,
        });
      } catch (error) {
        console.error('[v0] Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    {
      title: 'Active Sessions',
      value: stats.activeSessions,
      icon: Users,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
    },
    {
      title: 'Available Stations',
      value: stats.availableStations,
      icon: Zap,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-500/10',
    },
    {
      title: 'Daily Revenue',
      value: `₹${stats.totalRevenue.toFixed(2)}`,
      icon: TrendingUp,
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',
    },
    {
      title: 'Pending Bills',
      value: stats.pendingBills,
      icon: Wallet,
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10',
    },
  ];

  if (loading) {
    return <div className="flex items-center justify-center h-96">Loading dashboard...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <Card key={index} className="border-primary/10">
              <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <CardTitle className="text-sm font-medium text-muted-foreground">{card.title}</CardTitle>
                <div className={`p-2 ${card.bgColor} rounded-lg`}>
                  <Icon className={`${card.color} w-5 h-5`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{card.value}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-primary/10">
          <CardHeader>
            <CardTitle className="text-lg">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-sm text-muted-foreground">Start managing your gaming cafe from the menu on the left.</p>
          </CardContent>
        </Card>

        <Card className="border-primary/10">
          <CardHeader>
            <CardTitle className="text-lg">System Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Backend Server</span>
                <span className="text-xs bg-green-500/20 text-green-600 px-2 py-1 rounded">Online</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Database</span>
                <span className="text-xs bg-green-500/20 text-green-600 px-2 py-1 rounded">Connected</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
