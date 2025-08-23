import { useState, useEffect } from 'react'; // useEffect import 추가
import { ChevronDownIcon } from 'lucide-react';

import { Button } from '@components/ui/button';
import { Calendar } from '@components/ui/calendar';
import { Input } from '@components/ui/input';
import { Label } from '@components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@components/ui/popover';

interface DateTimePickerProps {
  label: string;
  prevDate: Date;
  onChange?: (date: Date) => void;
}

export const DateTimePicker = ({ label, prevDate, onChange }: DateTimePickerProps) => {
  const [open, setOpen] = useState(false);
  const [dateTime, setDateTime] = useState<Date>(new Date(prevDate));

  useEffect(() => {
    setDateTime(new Date(prevDate));
  }, [prevDate]);

  const handleDateChange = (date: Date | undefined) => {
    if (!date) return;

    const newDateTime = new Date(dateTime);
    newDateTime.setFullYear(date.getFullYear(), date.getMonth(), date.getDate());

    setDateTime(newDateTime);
    setOpen(false);
    onChange?.(newDateTime);
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const timeValue = e.target.value;
    const [hours, minutes] = timeValue.split(':').map(Number);

    if (isNaN(hours) || isNaN(minutes)) return;

    const newDateTime = new Date(dateTime);
    newDateTime.setHours(hours, minutes, 0);
    setDateTime(newDateTime);
  };

  const handleTimeBlur = () => {
    onChange?.(dateTime);
  };

  return (
    <div className="flex items-center gap-3">
      <Label htmlFor="time-picker" className="px-1 whitespace-nowrap">
        {label}
      </Label>
      <div className="flex items-center gap-2">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" id="date-picker" className="w-[150px] justify-between font-normal">
              {dateTime ? dateTime.toLocaleDateString() : '날짜 선택'}
              <ChevronDownIcon className="ml-2 h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={dateTime}
              captionLayout="dropdown"
              fromYear={2020}
              toYear={2030}
              onSelect={handleDateChange}
            />
          </PopoverContent>
        </Popover>
        <Input
          type="time"
          id="time-picker"
          value={dateTime.toTimeString().slice(0, 5)}
          onChange={handleTimeChange}
          onBlur={handleTimeBlur}
          className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
        />
      </div>
    </div>
  );
};

export default DateTimePicker;
