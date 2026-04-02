import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

export function ProtectedRoute({ children, role }: { children: React.ReactNode; role?: 'student' | 'admin' }) {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (role && user?.role !== role) return <Navigate to={user?.role === 'admin' ? '/admin' : '/student'} replace />;

  return <>{children}</>;
}
