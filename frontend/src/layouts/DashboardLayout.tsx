import { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/button';
import { Menu, X, LogOut, Home, Gamepad2, Zap, Users, ShoppingCart, FileText, Bell, Settings, HelpCircle } from 'lucide-react';

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, admin } = useAuth();

  const menuItems = [
    { path: '/dashboard', label: 'Dashboard', icon: Home },
    { path: '/plans', label: 'Plans', icon: Zap },
    { path: '/stations', label: 'Stations', icon: Gamepad2 },
    { path: '/sessions', label: 'Sessions', icon: Users },
    { path: '/inventory', label: 'Inventory', icon: ShoppingCart },
    { path: '/bills', label: 'Bills', icon: FileText },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? 'w-64' : 'w-20'
        } bg-muted border-r border-border transition-all duration-300 flex flex-col`}
      >
        {/* Logo */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between gap-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold font-heading">
              T
            </div>
            {sidebarOpen && (
              <div className="flex-1">
                <h1 className="text-sm font-bold text-foreground font-heading">TURBO GAMING</h1>
                <p className="text-xs text-muted-foreground">Management Console</p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all relative ${
                  active
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {active && <div className="absolute left-0 w-1 h-8 bg-primary rounded-r"></div>}
                <Icon size={20} className={active ? 'text-primary' : ''} />
                {sidebarOpen && <span className="text-sm font-medium">{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* User Info and Logout */}
        <div className="p-4 border-t border-border space-y-3">
          {sidebarOpen && (
            <div className="text-xs text-muted-foreground">
              <p className="font-medium text-foreground truncate">{admin?.fullName}</p>
              <p className="text-xs truncate">{admin?.username}</p>
            </div>
          )}
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2 text-muted-foreground hover:text-primary transition-colors text-sm"
          >
            <LogOut size={16} />
            {sidebarOpen && 'Log out'}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-muted border-b border-border px-8 py-4 flex items-center justify-between">
          <div>
            <p className="text-primary font-heading font-bold text-sm mb-1">TURBO GAMING ZONE</p>
            <h2 className="text-3xl font-bold text-foreground font-heading">
              {menuItems.find((item) => isActive(item.path))?.label || 'Dashboard'}
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-border rounded-lg transition-colors">
              <Bell size={20} className="text-muted-foreground" />
            </button>
            <button className="p-2 hover:bg-border rounded-lg transition-colors">
              <Settings size={20} className="text-muted-foreground" />
            </button>
            <button className="p-2 hover:bg-border rounded-lg transition-colors">
              <HelpCircle size={20} className="text-muted-foreground" />
            </button>
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold font-heading">
              {admin?.fullName?.charAt(0) || 'A'}
            </div>
          </div>
        </div>

        {/* Content */}
        <main className="flex-1 overflow-auto bg-background">
          <div className="p-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
