import { EmailVerificationRequestDTO } from 'types/DTO';
import apiClient from './apiClient';

export const postEmailVerification = async (request: EmailVerificationRequestDTO) => {
  const response = await apiClient.post('/sign-up/email-auth', request);
  return response.data;
};
