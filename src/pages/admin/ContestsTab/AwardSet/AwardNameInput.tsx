import { useEffect, useState } from 'react';
import { Input } from '@components/ui/input';

interface AwardNameInputProps {
  value: string;
  onChange: (value: string) => void;
}

const AwardNameInput = ({ value, onChange }: AwardNameInputProps) => {
  const title = '수상 명칭';
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  useEffect(() => {
    const id = setTimeout(() => {
      if (localValue !== value) onChange(localValue);
    }, 300);
    return () => clearTimeout(id);
  }, [localValue, onChange, value]);

  return (
    <div className="flex flex-1 items-center gap-4">
      <h4 className="w-30 text-sm leading-none">{title}</h4>
      <Input
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        placeholder="수상 명칭을 입력해주세요."
        className="text-sm"
      />
    </div>
  );
};

export default AwardNameInput;
