import { User } from 'types/User';

export const ACCESS_TOKEN_KEY = 'access_token';

export const getUserFromToken = (token: string): User | null => {
  try {
    if (!token || token.split('.').length !== 3) return null;

    const payload = token.split('.')[1];
    const decoded = atob(payload);
    return JSON.parse(decoded) as User;
  } catch (error) {
    console.error('Failed to decode token', error);
    return null;
  }
};
