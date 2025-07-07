import apiClient from './apiClient';
import { SignInResponseDto } from 'types/DTO';

export const getGoogleOAuthLogin = async () => {
  const response = await apiClient.get('/oauth/google');
  return response.data;
};

export const getGoogleOAuthCallback = async (code: string): Promise<SignInResponseDto> => {
  const response = await apiClient.get('/oauth/google/callback', {
    params: { code },
  });
  return response.data;
};
