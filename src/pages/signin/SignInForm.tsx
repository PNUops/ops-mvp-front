import Input from '@components/Input';
import PasswordInput from '@components/PasswordInput';
import { useMutation } from '@tanstack/react-query';
import { postSignIn } from 'apis/signIn';
import useAuth from 'hooks/useAuth';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { isPNUEmail } from 'utils/email';

const SignInForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { signIn } = useAuth();
  const navigate = useNavigate();

  const signInMutation = useMutation({
    mutationFn: postSignIn,
    onSuccess: (data) => {
      signIn(data.token);
      navigate('/');
    },
    onError: (error) => {
      alert(`로그인 실패: ${error.message}`); // TODO: toast로 바꾸기
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isPNUEmail(email)) {
      alert('부산대 이메일이 아닙니다.');
      return;
    }

    if (!password.trim()) {
      alert('비밀번호가 비어 있습니다.');
      return;
    }

    signInMutation.mutate({ email, password });
  };

  return (
    <form className="flex w-full flex-col gap-4" onSubmit={handleSubmit}>
      <Input placeholder="이메일" value={email} onChange={(e) => setEmail(e.target.value)} />
      <PasswordInput value={password} onChange={(e) => setPassword(e.target.value)} />
      <div className="h-2" />
      <button type="submit" className="bg-mainBlue rounded-lg p-3 text-lg font-bold text-white">
        로그인
      </button>
      <button
        onClick={() => navigate('/signup')}
        type="button"
        className="border-midGray rounded-lg border p-3 text-lg font-bold"
      >
        회원가입
      </button>
    </form>
  );
};

export default SignInForm;
