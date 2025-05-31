import PasswordInput from '@components/PasswordInput';

interface Props {
  value: string;
  setValue: (value: string) => void;
  error?: string;
}

const PasswordConfirmRow = ({ value, setValue, error }: Props) => {
  return (
    <>
      <label className="flex items-center gap-1">
        <span className="text-mainRed">*</span>
        <span className="text-midGray">비밀번호 확인</span>
      </label>
      <div>
        <PasswordInput value={value} onChange={(e) => setValue(e.target.value)} placeholder="비밀번호 확인" />
        <p className="text-mainRed mt-1">{error}</p>
      </div>
      <div />
    </>
  );
};
export default PasswordConfirmRow;
