import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { sessionsAPI } from '../lib/api';
import { Plus, Clock, User } from 'lucide-react';

export default function SessionsPage() {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = async () => {
    try {
      const res = await sessionsAPI.getAll();
      setSessions(res.data);
    } catch (error) {
      console.error('[v0] Error fetching sessions:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-500/20 text-green-600';
      case 'paused':
        return 'bg-yellow-500/20 text-yellow-600';
      case 'completed':
        return 'bg-blue-500/20 text-blue-600';
      default:
        return 'bg-gray-500/20 text-gray-600';
    }
  };

  if (loading) return <div>Loading sessions...</div>;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Gaming Sessions</h1>
        <Button className="gap-2 bg-primary hover:bg-primary/90">
          <Plus size={20} />
          New Session
        </Button>
      </div>

      <div className="space-y-2">
        {sessions.map((session: any) => (
          <Card key={session._id} className="border-primary/10">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2">
                    <User size={16} className="text-muted-foreground" />
                    <span className="font-medium">{session.customerName}</span>
                    <div className={`px-2 py-1 rounded text-xs font-medium ml-auto ${getStatusColor(session.status)}`}>
                      {session.status}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock size={14} />
                    <span>
                      {new Date(session.startTime).toLocaleTimeString()} -{' '}
                      {session.endTime ? new Date(session.endTime).toLocaleTimeString() : 'Ongoing'}
                    </span>
                  </div>
                  <p className="text-sm">
                    Station: <span className="font-medium">{session.stationId?.name}</span> | Plan:{' '}
                    <span className="font-medium">{session.planId?.name}</span>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {sessions.length === 0 && (
        <Card className="border-primary/10">
          <CardContent className="pt-6 text-center text-muted-foreground">No sessions yet. Start a new gaming session.</CardContent>
        </Card>
      )}
    </div>
  );
}
