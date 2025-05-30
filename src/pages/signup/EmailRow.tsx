import Input from '@components/Input';

interface Props {
  value: string;
  setValue: (value: string) => void;
}

const EmailRow = ({ value, setValue }: Props) => {
  return (
    <>
      <label className="flex items-center gap-1">
        <span className="text-mainRed">*</span>
        <span className="text-midGray">이메일</span>
      </label>
      <Input placeholder="@pusan.ac.kr" />
      <button className="border-lightGray rounded-lg border p-3 px-4">인증코드 전송</button>
    </>
  );
};
export default EmailRow;
