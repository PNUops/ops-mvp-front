import React, { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useToast } from 'hooks/useToast';
import useAuth from 'hooks/useAuth';
import { useMutation } from '@tanstack/react-query';
import { getGoogleOAuthCallback } from 'apis/auth';

const GoogleOAuthCallback = () => {
  const [searchParams] = useSearchParams();
  const toast = useToast();
  const navigate = useNavigate();
  const { signIn } = useAuth();

  const mutation = useMutation({
    mutationFn: (code: string) => getGoogleOAuthCallback(code),
    onSuccess: (data) => {
      signIn(data.token);
      toast('구글 로그인 성공!', 'success');
      navigate('/');
    },
    onError: (error: any) => {
      toast(error.response?.data?.message || '구글 로그인에 실패했습니다.', 'error');
      navigate('/login');
    },
  });

  useEffect(() => {
    const code = searchParams.get('code');
    if (!code) {
      toast('인가 코드가 없습니다.', 'error');
      navigate('/login');
      return;
    }
    mutation.mutate(code);
  }, [searchParams, mutation, toast, navigate]);

  return <div className="p-10 text-center text-lg font-semibold">로그인 중입니다...</div>;
};

export default GoogleOAuthCallback;
