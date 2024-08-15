import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../utils/context';
import { authService } from '../services/auth/auth.service';

export default function useAuth() {
  const [loading, setLoading] = useState(true);
  const { user, updateAuthUser } = useContext(AuthContext);
  const controller = new AbortController();

  useEffect(() => {
    authService
      .checkAuthUser()
      .then((data) => {
        updateAuthUser(data!);
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
