import { GoogleOAuthCallbackResponseDto } from 'types/oAuthSignInDto';
import apiClient from './apiClient';

/**
 * 구글 OAuth 콜백 API 호출
 * @param code 구글 OAuth에서 받은 인가 코드
 */

export const getGoogleOAuthCallback = async (code: string): Promise<GoogleOAuthCallbackResponseDto> => {
  const response = await apiClient.get('/oauth/google/callback', {
    params: { code },
  });
  return response.data;
};
