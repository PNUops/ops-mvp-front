export interface SignUpRequestDto {
  name: string;
  studentId: string;
  email: string;
  password: string;
}

export interface EmailVerificationRequestDTO {
  email: string;
}

export interface EmailVerificationCodeRequestDTO {
  email: string;
  authCode: string;
}
