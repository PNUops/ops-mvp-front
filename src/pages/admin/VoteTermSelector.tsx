import { useState } from 'react';
import { useToast } from 'hooks/useToast';
import DateTimePicker from '@components/DateTimePicker';

const now = new Date();
const koreaTime = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Seoul' }));
const START_DATE: Date = new Date(koreaTime.getFullYear(), koreaTime.getMonth(), koreaTime.getDate(), 9, 0, 0);
const END_DATE: Date = new Date(koreaTime.getFullYear(), koreaTime.getMonth(), koreaTime.getDate(), 18, 0, 0);

const VoteTermSelector = () => {
  const toast = useToast();
  const [startDate, setStartDate] = useState<Date>(START_DATE);
  const [endDate, setEndDate] = useState<Date>(END_DATE);

  const handleDateSave = () => {
    if (!startDate || !endDate) {
      toast('시작 시간과 종료 시간을 모두 입력해주세요', 'info');
      return;
    }
    if (startDate >= endDate) {
      toast('종료 시간은 시작 시간보다 빠를 수 없어요', 'error');
      return;
    }

    console.log('보낼 데이터: ', {
      start: startDate.toISOString(),
      end: endDate.toISOString(),
    });
    console.log('로컬 시간으로 확인: ', {
      start: `${startDate.toLocaleDateString()} ${startDate.toLocaleTimeString()}`,
      end: `${endDate.toLocaleDateString()} ${endDate.toLocaleTimeString()}`,
    });
  };

  return (
    <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
      <span className="text-lg font-medium whitespace-nowrap">- 투표 기간 설정</span>
      <div className="flex flex-col items-center justify-between gap-3 lg:flex-row lg:gap-10">
        <DateTimePicker label={'시작 일시'} prevDate={startDate.toISOString()} onChange={setStartDate} />
        <DateTimePicker label={'종료 일시'} prevDate={endDate.toISOString()} onChange={setEndDate} />
      </div>
      <button
        onClick={handleDateSave}
        className="bg-mainBlue hover:bg-mainBlue/90 rounded-md p-1 px-6 text-sm text-white"
      >
        저장
      </button>
    </div>
  );
};

export default VoteTermSelector;
