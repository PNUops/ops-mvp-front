import Input from '@components/Input';

interface Props {
  value: string;
  setValue: (value: string) => void;
}

const EmailVerifyRow = ({ value, setValue }: Props) => {
  return (
    <>
      <label />
      <Input placeholder="인증코드 입력" value={value} onChange={(e) => setValue(e.target.value)} />
      <button className="border-lightGray hover:bg-lightGray rounded-lg border p-3 px-4">확인</button>
    </>
  );
};
export default EmailVerifyRow;
