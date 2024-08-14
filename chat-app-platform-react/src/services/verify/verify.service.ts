import callApi from '../../utils/api';
import { VerifyEmailResponse } from './verify.type';

export const verifyService = {
  async verifyEmail(emailToken: string): Promise<boolean> {
    try {
      const {
        accessToken,
        refreshToken,
        id,
        email,
        username,
        firstName,
        lastName,
      }: VerifyEmailResponse = await callApi('auth/verify-email', 'POST', {
        emailToken: emailToken,
      });

      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('id', id);
      localStorage.setItem('email', email);
      localStorage.setItem('username', username);
      localStorage.setItem('firstName', firstName);
      localStorage.setItem('lastName', lastName);

      return true;
    } catch (error) {
      console.log(error);
    }

    return false;
  },
};
