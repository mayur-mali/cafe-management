import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(username, password);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Login failed');
      console.error('[v0] Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background grid grid-cols-2 gap-0">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex flex-col justify-between p-12 bg-gradient-to-br from-muted to-background relative overflow-hidden">
        <div className="relative z-10">
          <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold mb-4 font-heading">
            T
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-2 font-heading">TURBO GAMING</h1>
          <p className="text-muted-foreground">System Operations Console</p>
        </div>
        <div className="relative z-10">
          <p className="text-muted-foreground mb-2">Access the centralized command center to monitor</p>
          <p className="text-muted-foreground">network latency, manage active sessions, and</p>
          <p className="text-muted-foreground">configure station telemetry.</p>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex items-center justify-center p-8 lg:p-12">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-2 font-heading">Admin Access</h2>
            <p className="text-muted-foreground text-sm">Enter your credentials to access the management dashboard.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="p-4 bg-destructive/10 border border-destructive rounded-lg text-destructive text-sm">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label htmlFor="username" className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                OPERATOR ID / EMAIL
              </label>
              <Input
                id="username"
                type="text"
                placeholder="admin@turbogaming.zone"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="bg-input border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                ACCESS KEY
              </label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-input border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-muted-foreground hover:text-foreground cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded" />
                Maintain Session
              </label>
              <Link to="#" className="text-primary hover:text-primary/80 font-medium">
                Lost Protocol?
              </Link>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-3 rounded-lg uppercase tracking-wide"
            >
              {loading ? 'Initializing...' : '→ INITIALIZE UPLINK'}
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-border flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            Secure Encrypted Connection
          </div>
        </div>
      </div>
    </div>
  );
}
