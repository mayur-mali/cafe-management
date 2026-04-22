import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Home, Menu, ShoppingBag, History, Users, Settings, Heart, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Sidebar() {
  const { logout, admin } = useAuth();
  const navigate = useNavigate();

  const menuItems = [
    { icon: Home, label: 'Home page', path: '/' },
    { icon: Menu, label: 'Menu', path: '/menu' },
    { icon: ShoppingBag, label: 'My orders', path: '/orders', badge: '13' },
    { icon: History, label: 'History', path: '/history' },
    { icon: Users, label: 'Partners', path: '/partners' },
    { icon: Settings, label: 'Settings', path: '/settings' },
    { icon: Heart, label: 'Donate to shelter', path: '/donate' },
  ];

  return (
    <div className="w-48 bg-[#FFF5F0] min-h-screen flex flex-col p-6 border-r border-[#FFE4D4]">
      {/* Logo */}
      <div className="flex items-center gap-2 mb-8">
        <div className="w-8 h-8 bg-[#FF9F6B] rounded-full flex items-center justify-center text-white font-bold text-lg">
          P
        </div>
        <div className="text-xl font-bold">
          <span className="text-[#FF9F6B]">Purr</span>
          <span className="text-gray-800">Coffee</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.label}
            onClick={() => navigate(item.path)}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-white/50 transition-colors relative"
          >
            <item.icon size={20} className="text-[#FF9F6B]" />
            <span className="text-sm font-medium">{item.label}</span>
            {item.badge && (
              <span className="ml-auto bg-[#FF9F6B] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {item.badge}
              </span>
            )}
          </button>
        ))}
      </nav>

      {/* Footer */}
      <div className="space-y-3 pt-4 border-t border-[#FFE4D4]">
        <div className="text-xs text-gray-600">
          <div className="font-medium text-gray-800">{admin?.fullName}</div>
          <div>{admin?.email}</div>
        </div>
        <button
          onClick={() => {
            logout();
            navigate('/login');
          }}
          className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-gray-700 hover:bg-white/50 transition-colors"
        >
          <LogOut size={20} className="text-[#FF9F6B]" />
          <span className="text-sm font-medium">Log out</span>
        </button>
      </div>
    </div>
  );
}
