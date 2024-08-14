import { LoginProps } from '../../components/forms/login.type';
import callApi from '../../utils/api';
import { LoginResponse } from './auth.type';

export const authService = {
  async login(data: LoginProps, setIsLogin: Function) {
    try {
      setIsLogin(true);
      const {
        accessToken,
        refreshToken,
        id,
        email,
        username,
        firstName,
        lastName,
      }: LoginResponse = await callApi('auth/login', 'POST', data);

      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('id', id);
      localStorage.setItem('email', email);
      localStorage.setItem('username', username);
      localStorage.setItem('firstName', firstName);
      localStorage.setItem('lastName', lastName);

      setIsLogin(false);
      return true;
    } catch (error) {
      setIsLogin(false);
      console.log(error);
    }

    return false;
  },
};
