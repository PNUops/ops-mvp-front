import Input from '@components/Input';
import RoundedButton from '@components/RoundedButton';
import { useCallback, useState } from 'react';

const IdTab = () => {
  const [value, setValue] = useState('');
  const isNumber = useCallback((value: string) => /^\d*$/.test(value), []);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex max-w-md gap-4">
        <label className="flex min-w-fit items-center gap-1">
          <span className="text-mainRed">*</span>
          <span className="text-midGray">학번</span>
        </label>
        <Input
          value={value}
          onChange={(e) => {
            const input = e.target.value;
            if (isNumber(input)) setValue(input);
          }}
        />
      </div>
      <RoundedButton className="mx-auto">아이디 찾기</RoundedButton>
    </div>
  );
};
export default IdTab;
