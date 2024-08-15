import { createContext } from 'react';
import { AuthContextType } from './AuthContext.type';

export const AuthContext = createContext<AuthContextType>({
  updateAuthUser: () => {},
});
