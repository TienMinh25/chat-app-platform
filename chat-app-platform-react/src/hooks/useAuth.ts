import { useEffect, useState } from 'react';
import { authService } from '../services/auth/auth.service';
import { User } from '../types/User';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>();

  useEffect(() => {
    authService
      .checkAuthUser()
      .then((data) => setUser(data))
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return { user };
};
