import Input from '@components/Input';

interface Props {
  value: string;
  setValue: (value: string) => void;
}

const StudentNumberRow = ({ value, setValue }: Props) => {
  return (
    <>
      <label className="flex items-center gap-1">
        <span className="text-mainRed">*</span>
        <span className="text-midGray">학번</span>
      </label>
      <Input value={value} onChange={(e) => setValue(e.target.value)} />
      <div />
    </>
  );
};
export default StudentNumberRow;
