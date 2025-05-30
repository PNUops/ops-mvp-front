import Input from '@components/Input';
import { useMutation } from '@tanstack/react-query';
import { postEmailVerification } from 'apis/signUp';
import { useEffect, useState } from 'react';
import { isPNUEmail } from 'utils/email';

interface Props {
  value: string;
  setValue: (value: string) => void;
}

const EmailRow = ({ value: email, setValue: setEmail }: Props) => {
  const [isFirstSend, setIsFirstSend] = useState(true);
  const [isSendable, setIsSendable] = useState(true);
  const COOLDOWN_SEC = 30;

  const mutation = useMutation({
    mutationFn: postEmailVerification,
    onSuccess: () => {
      alert(`${email}로 인증 메일을 전송했어요`);
    },
    onError: (error) => {
      alert(`인증 메일 전송에 실패했어요: ${error.message}`);
      setIsSendable(true);
    },
  });

  const handleSendCode = () => {
    if (!isPNUEmail(email)) {
      alert('부산대학교 이메일(@pusan.ac.kr)만 사용할 수 있습니다.');
      return;
    }
    if (!isSendable) {
      alert(`인증 메일은 ${COOLDOWN_SEC}초에 한 번만 보낼 수 있어요.`);
      return;
    }
    setIsFirstSend(false);
    setIsSendable(false);
    setTimeout(() => {
      setIsSendable(true);
    }, COOLDOWN_SEC * 1000);
    mutation.mutate({ email });
  };

  return (
    <>
      <label className="flex items-center gap-1">
        <span className="text-mainRed">*</span>
        <span className="text-midGray">이메일</span>
      </label>
      <Input placeholder="example@pusan.ac.kr" value={email} onChange={(e) => setEmail(e.target.value)} />
      <button
        onClick={handleSendCode}
        disabled={mutation.isPending}
        className="border-lightGray hover:bg-lightGray rounded-lg border p-3 px-4"
      >
        {isFirstSend ? '인증코드 전송' : '재전송'}
      </button>
    </>
  );
};
export default EmailRow;
