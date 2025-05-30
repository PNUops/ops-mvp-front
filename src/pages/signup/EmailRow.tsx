import Input from '@components/Input';
import { useMutation } from '@tanstack/react-query';
import { postEmailVerification } from 'apis/signUp';
import { isPNUEmail } from 'utils/email';

interface Props {
  value: string;
  setValue: (value: string) => void;
}

const EmailRow = ({ value: email, setValue: setEmail }: Props) => {
  const mutation = useMutation({
    mutationFn: postEmailVerification,
    onSuccess: () => {
      alert(`${email}로 인증 메일을 전송했어요`);
    },
    onError: (error) => {
      alert(`인증 메일 전송에 실패했어요: ${error.message}`);
    },
  });

  const handleSendCode = () => {
    if (!isPNUEmail(email)) {
      alert('부산대학교 이메일(@pusan.ac.kr)만 사용할 수 있습니다.');
    } else {
      mutation.mutate({ email });
    }
  };

  return (
    <>
      <label className="flex items-center gap-1">
        <span className="text-mainRed">*</span>
        <span className="text-midGray">이메일</span>
      </label>
      <Input placeholder="@pusan.ac.kr" value={email} onChange={(e) => setEmail(e.target.value)} />
      <button
        onClick={handleSendCode}
        disabled={mutation.isPending}
        className="border-lightGray hover:bg-lightGray rounded-lg border p-3 px-4"
      >
        인증코드 전송
      </button>
    </>
  );
};
export default EmailRow;
