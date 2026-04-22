import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardLayout from './layouts/DashboardLayout';
import Dashboard from './pages/Dashboard';
import PlansPage from './pages/PlansPage';
import StationsPage from './pages/StationsPage';
import SessionsPage from './pages/SessionsPage';
import InventoryPage from './pages/InventoryPage';
import BillsPage from './pages/BillsPage';
import CafeMenuPage from './pages/CafeMenuPage';
import OrderHistoryPage from './pages/OrderHistoryPage';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

function AppContent() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Cafe Menu - Separate Layout */}
      <Route
        path="/menu"
        element={
          <ProtectedRoute>
            <CafeMenuPage />
          </ProtectedRoute>
        }
      />

      {/* Order History */}
      <Route
        path="/orders"
        element={
          <ProtectedRoute>
            <OrderHistoryPage />
          </ProtectedRoute>
        }
      />

      {/* Admin Dashboard */}
      <Route
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/plans" element={<PlansPage />} />
        <Route path="/stations" element={<StationsPage />} />
        <Route path="/sessions" element={<SessionsPage />} />
        <Route path="/inventory" element={<InventoryPage />} />
        <Route path="/bills" element={<BillsPage />} />
      </Route>

      <Route path="/" element={<Navigate to="/menu" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}
