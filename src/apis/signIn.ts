import { EmailVerificationRequestDTO, SignInRequestDto, SignInResponseDto } from 'types/DTO';
import apiClient from './apiClient';

export const postSignIn = async (request: SignInRequestDto): Promise<SignInResponseDto> => {
  const response = await apiClient.post('/sign-in', request);
  return response.data;
};
export const postEmailVerificationPasswordReset = async (request: EmailVerificationRequestDTO) => {
  const response = await apiClient.post('/sign-in/password-reset/email-auth', request);
  return response.data;
};
