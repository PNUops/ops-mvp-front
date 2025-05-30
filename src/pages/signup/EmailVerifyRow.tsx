import Input from '@components/Input';
import { useMutation } from '@tanstack/react-query';
import { patchEmailVerificationCode } from 'apis/signUp';
import { useState } from 'react';

interface Props {
  email: string;
  isEmailVerified: boolean;
  setIsEmailVerified: (value: boolean) => void;
}

const EmailVerifyRow = ({ email, isEmailVerified, setIsEmailVerified }: Props) => {
  const [authCode, setAuthCode] = useState('');

  const mutation = useMutation({
    mutationFn: patchEmailVerificationCode,
    onSuccess: () => {
      alert(`이메일 인증에 성공했어요`);
      setIsEmailVerified(true);
    },
    onError: (error) => {
      alert(`이메일 인증에 실패했어요. ${error.message}`);
    },
  });

  const handleSendCode = () => {
    mutation.mutate({ email, authCode });
  };

  return (
    <>
      <label />
      <Input
        disabled={isEmailVerified}
        className="disabled:bg-whiteGray disabled:text-midGray"
        placeholder="인증코드 입력"
        value={authCode}
        onChange={(e) => setAuthCode(e.target.value)}
      />
      <button
        onClick={handleSendCode}
        disabled={isEmailVerified}
        className="border-lightGray hover:bg-lightGray rounded-lg border p-3 px-4"
      >
        확인
      </button>
    </>
  );
};
export default EmailVerifyRow;
