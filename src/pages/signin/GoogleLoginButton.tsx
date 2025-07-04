import { UseMutationResult, useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { useGoogleLogin } from '@react-oauth/google';
import { getGoogleOAuthCallback } from 'apis/oAuthSignIn';

import { useToast } from 'hooks/useToast';
import useAuth from 'hooks/useAuth';

import { GoogleOAuthCallbackResponseDto } from 'types/oAuthSignInDto';

const GoogleLoginButton = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const { signIn } = useAuth();

  const googleLoginMutation = useMutation({
    mutationFn: getGoogleOAuthCallback,
    onSuccess: (data) => {
      signIn(data.token);
      navigate('/signin');
    },
    onError: (error: any) => {
      toast(error.response?.data?.message || '구글 로그인에 실패했습니다.', 'error');
    },
  });

  const login = useGoogleLogin({
    flow: 'auth-code',
    onSuccess: (response) => {
      googleLoginMutation.mutate(response.code);
    },
    onError: () => {
      toast('구글 로그인 중 오류가 발생했습니다.', 'error');
    },
  });

  return (
    <button
      type="button"
      onClick={() => login()}
      className="border-midGray rounded-lg border p-3 text-lg font-bold text-black"
    >
      {/* {googleLoginMutation.isLoading ? '로그인 중...' : '구글로 로그인'} */}
      구글 로그인
    </button>
  );
};

export default GoogleLoginButton;
