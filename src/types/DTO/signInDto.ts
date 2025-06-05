import { MemberType } from 'types/MemberType';

export interface SignInRequestDto {
  email: string;
  password: string;
}

export interface SignInResponseDto {
  memberId: number;
  name: string;
  token: string;
  roles: MemberType[];
}
