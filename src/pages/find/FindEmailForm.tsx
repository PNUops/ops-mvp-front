import Input from '@components/Input';
import RoundedButton from '@components/RoundedButton';
import { useCallback } from 'react';

interface Props {
  studentNumber: string;
  setStudentNumber: (value: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

const FindEmailForm = ({ studentNumber, setStudentNumber, onSubmit, isLoading }: Props) => {
  const isNumber = useCallback((value: string) => /^\d*$/.test(value), []);
  // TODO : isLoading 사용하여 RoundedButton에 로딩 스피너 적용시키기

  return (
    <div className="flex flex-col gap-8">
      <div className="flex max-w-md gap-4">
        <label className="flex min-w-fit items-center gap-1">
          <span className="text-mainRed">*</span>
          <span className="text-midGray">학번</span>
        </label>
        <Input
          value={studentNumber}
          onChange={(e) => {
            const input = e.target.value;
            if (isNumber(input)) setStudentNumber(input);
          }}
        />
      </div>
      <RoundedButton onClick={onSubmit} className="mx-auto">
        아이디 찾기
      </RoundedButton>
    </div>
  );
};

export default FindEmailForm;
