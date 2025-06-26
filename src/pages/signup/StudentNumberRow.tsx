import Input from '@components/Input';

interface Props {
  value: string;
  setValue: (value: string) => void;
  error?: string;
}

const StudentNumberRow = ({ value, setValue, error }: Props) => {
  return (
    <>
      <label className="flex items-center gap-1">
        <span className="text-mainRed">*</span>
        <span className="text-midGray">학번</span>
      </label>
      <div>
        <Input
          inputMode="numeric"
          value={value}
          onChange={(e) => {
            const input = e.target.value;
            if (/^\d*$/.test(input)) setValue(input);
          }}
        />
        <p className="text-mainRed mt-1">{error}</p>
      </div>
      <div />
    </>
  );
};
export default StudentNumberRow;
