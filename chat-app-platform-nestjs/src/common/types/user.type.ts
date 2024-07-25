export interface IUserContext {
  id: string;
  email: string;
  username: string;
  firstName?: string;
  lastName?: string;
  sessionId: string;
  exp?: number;
  refreshToken?: string;
  accessToken?: string;
}
