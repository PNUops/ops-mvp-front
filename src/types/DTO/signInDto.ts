import { MemberType } from 'types/MemberType';

export interface SignInRequestDto {
  email: string;
  password: string;
}

export interface FindEmailRequestDto {
  studentId: string;
}

export interface FindEmailResponsetDto {
  email: string;
}

export interface SignInResponseDto {
  memberId: number;
  name: string;
  token: string;
  roles: MemberType[];
}

export interface PasswordResetRequestDto {
  email: string;
  newPassword: string;
}
