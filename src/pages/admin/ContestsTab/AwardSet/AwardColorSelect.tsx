import { useState, useEffect } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@components/ui/select';
import { badgeColors } from 'styles/badge';
import { FaAward } from 'react-icons/fa6';

interface AwardColorSelectProps {
  value: string;
  onChange: (color: string) => void;
}

const AwardColorSelect = ({ value, onChange }: AwardColorSelectProps) => {
  const title = '수상 색상';
  const [selectedValue, setSelectedValue] = useState<string>(value || '');

  useEffect(() => {
    setSelectedValue(value || '');
  }, [value]);

  const handleValueChange = (value: string) => {
    setSelectedValue(value);
    onChange(value);
  };

  return (
    <div className="flex flex-1 items-center gap-4">
      <h4 className="w-30 text-sm leading-none">{title}</h4>
      <Select value={selectedValue} onValueChange={handleValueChange}>
        <SelectTrigger className="w-full overflow-hidden text-sm">
          <SelectValue placeholder="뱃지 색상을 선택해주세요." className="truncate" />
        </SelectTrigger>
        <SelectContent className="text-sm">
          {Object.entries(badgeColors).map(([key, { name, exp }]) => (
            <SelectItem key={key} value={key} className="capitalize">
              <div className="flex items-center gap-3 truncate">
                <FaAward className="rounded-sm" style={{ color: key }} aria-hidden />
                <div className="flex items-center gap-3 text-left">
                  <span className="truncate capitalize">{name}</span>
                  <small className="text-muted-foreground text-xs">{exp}</small>
                </div>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default AwardColorSelect;
