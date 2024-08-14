import { PropsWithChildren, useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { authService } from '../services/auth/auth.service';
import { User } from '../types/User';

type ProtectedRouteProps = PropsWithChildren;

function useAuth() {
  const [user, setUser] = useState<User | undefined>();
  const [loading, setLoading] = useState(true);
  const controller = new AbortController();

  useEffect(() => {
    authService
      .checkAuthUser()
      .then((data) => {
        console.log(data);
        setUser(data);
        setTimeout(() => setLoading(false), 1000);
      })
      .catch((error) => {
        console.log(error);
        setTimeout(() => setLoading(false), 1000);
      });

    return () => {
      controller.abort();
    };
  }, []);

  return { user, loading };
}

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
