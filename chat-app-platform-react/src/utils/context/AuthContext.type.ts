import { User } from '../../types/User';

export type AuthContextType = {
  user?: User;
  updateAuthUser: (data: User) => void;
};
