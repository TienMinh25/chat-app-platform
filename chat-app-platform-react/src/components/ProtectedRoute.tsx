import { PropsWithChildren } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

type ProtectedRouteProps = PropsWithChildren;

export default function ProtectedRoute({
  children,
}: ProtectedRouteProps): React.ReactNode {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to='/login' replace />;
  }

  return children ? children : <Outlet />;
}
