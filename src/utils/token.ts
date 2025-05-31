import { User } from 'types/User';

export const ACCESS_TOKEN_KEY = 'access_token';

const base64UrlDecode = (input: string): string => {
  const base64 = input.replace(/-/g, '+').replace(/_/g, '/');
  const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), '=');

  const binary = atob(padded);
  const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
  const decoded = new TextDecoder().decode(bytes); // UTF-8로 디코드
  return decoded;
};

export const getUserFromToken = (token: string): User | null => {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) throw new Error('Invalid JWT format');

    const payload = base64UrlDecode(parts[1]);
    return JSON.parse(payload) as User;
  } catch (error) {
    console.error('Failed to decode token', error);
    return null;
  }
};
