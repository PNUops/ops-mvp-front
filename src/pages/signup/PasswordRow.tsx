import PasswordInput from '@components/PasswordInput';

interface Props {
  value: string;
  setValue: (value: string) => void;
}

const PasswordRow = ({ value, setValue }: Props) => {
  return (
    <>
      <label className="flex items-center gap-1">
        <span className="text-mainRed">*</span>
        <span className="text-midGray">비밀번호</span>
      </label>
      <PasswordInput value={value} onChange={(e) => setValue(e.target.value)} />
      <div />
    </>
  );
};
export default PasswordRow;
