import Input from '@components/Input';
import { useMutation } from '@tanstack/react-query';
import { patchEmailVerificationCode } from 'apis/signUp';
import { useState } from 'react';
import { formatToMMSS } from 'utils/time';

interface Props {
  email: string;
  isEmailVerified: boolean;
  setIsEmailVerified: (value: boolean) => void;
  isMailSent: boolean;
  cooldown: number;
  stopCooldown: () => void;
}

const EmailVerifyRow = ({ email, isEmailVerified, setIsEmailVerified, isMailSent, cooldown, stopCooldown }: Props) => {
  const [authCode, setAuthCode] = useState('');

  const mutation = useMutation({
    mutationFn: patchEmailVerificationCode,
    onSuccess: () => {
      alert(`이메일 인증에 성공했어요`);
      setIsEmailVerified(true);
      stopCooldown();
    },
    onError: (error) => {
      alert(`이메일 인증에 실패했어요. ${error.message}`);
    },
  });

  const handleSendCode = () => {
    if (!isMailSent) {
      alert('인증코드 전송이 필요합니다.');
      return;
    }
    mutation.mutate({ email, authCode });
  };

  return (
    <>
      <label />
      <div className="relative">
        <Input
          disabled={isEmailVerified}
          className="disabled:bg-whiteGray disabled:text-midGray"
          placeholder="인증코드 입력"
          value={authCode}
          onChange={(e) => setAuthCode(e.target.value)}
        />
        {cooldown > 0 && (
          <span className="text-mainRed absolute top-1/2 right-3 -translate-y-1/2 text-sm">
            {formatToMMSS(cooldown)}
          </span>
        )}
      </div>
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
