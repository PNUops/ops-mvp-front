import Input from '@components/Input';

interface Props {
  value: string;
  setValue: (value: string) => void;
  error?: string;
}

const NameRow = ({ value, setValue, error }: Props) => {
  return (
    <>
      <label className="flex items-center gap-1">
        <span className="text-mainRed">*</span>
        <span className="text-midGray">이름</span>
      </label>
      <div>
        <Input value={value} onChange={(e) => setValue(e.target.value)} />
        <p className="text-mainRed mt-1">{error}</p>
      </div>
      <div />
    </>
  );
};
export default NameRow;
