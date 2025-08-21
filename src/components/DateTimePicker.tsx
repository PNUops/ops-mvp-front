import { useState } from 'react';
import { ChevronDownIcon } from 'lucide-react';

import { Button } from '@components/ui/button';
import { Calendar } from '@components/ui/calendar';
import { Input } from '@components/ui/input';
import { Label } from '@components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@components/ui/popover';

import { formatDateTime } from 'utils/time';

interface DateTimePickerProps {
  label: string;
  prevDate: string;
  onChange?: (date: Date) => void;
}

export const DateTimePicker = ({ label, prevDate, onChange }: DateTimePickerProps) => {
  const [open, setOpen] = useState(false);

  const initialDate = new Date(prevDate);
  const [selectedDate, setSelectedDate] = useState<Date>(initialDate);
  const [timeValue, setTimeValue] = useState<string>(initialDate.toTimeString().slice(0, 8));

  const handleDateChange = (date: Date | undefined) => {
    if (!date) return;

    setSelectedDate(date);
    setOpen(false);

    const newDateTime = formatDateTime(date, timeValue);
    onChange?.(newDateTime);
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTimeValue(e.target.value);
  };

  const handleTimeBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const newTime = e.target.value;
    const newDateTime = formatDateTime(selectedDate, newTime);
    onChange?.(newDateTime);
  };

  return (
    <div className="flex gap-3">
      <Label htmlFor="time-picker" className="px-1">
        {label}
      </Label>
      <div className="flex items-center gap-2">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" id="date-picker" className="w-35 justify-between font-normal">
              {selectedDate ? selectedDate.toLocaleDateString() : '날짜'}
              <ChevronDownIcon />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto overflow-hidden p-0" align="start">
            <Calendar mode="single" selected={selectedDate} captionLayout="dropdown" onSelect={handleDateChange} />
          </PopoverContent>
        </Popover>
        <Input
          type="time"
          id="time-picker"
          step="1"
          value={timeValue}
          onChange={handleTimeChange}
          onBlur={handleTimeBlur}
          className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
        />
      </div>
    </div>
  );
};

export default DateTimePicker;
