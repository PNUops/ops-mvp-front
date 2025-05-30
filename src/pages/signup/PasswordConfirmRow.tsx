import PasswordInput from '@components/PasswordInput';

interface Props {
  value: string;
  setValue: (value: string) => void;
}

const PasswordConfirmRow = ({ value, setValue }: Props) => {
  return (
    <>
      <label className="flex items-center gap-1">
        <span className="text-mainRed">*</span>
        <span className="text-midGray">비밀번호 확인</span>
      </label>
      <PasswordInput value={value} onChange={(e) => setValue(e.target.value)} placeholder="비밀번호 확인" />
      <div />
    </>
  );
};
export default PasswordConfirmRow;
