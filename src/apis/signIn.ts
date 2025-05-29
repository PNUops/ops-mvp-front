import { SignInRequestDto, SignInResponseDto } from 'types/DTO';
import apiClient from './apiClient';

export const postSignIn = async (credentials: SignInRequestDto): Promise<SignInResponseDto> => {
  const response = await apiClient.post('/sign-in', credentials);
  return response.data;
};
