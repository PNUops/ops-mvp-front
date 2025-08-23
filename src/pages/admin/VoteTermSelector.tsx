import { useState, useEffect } from 'react';
import { useGetVoteTerm, useUpdateVoteTerm } from 'hooks/useVoteTerm';
import { useToast } from 'hooks/useToast';
import DateTimePicker from '@components/DateTimePicker';

const CURRENT_CONTEST_ID = 1;

const VoteTermSelector = () => {
  const toast = useToast();

  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());

  const { data: voteTermData, isLoading } = useGetVoteTerm(CURRENT_CONTEST_ID);
  const { mutate: updateVoteTerm, isPending } = useUpdateVoteTerm(CURRENT_CONTEST_ID);

  useEffect(() => {
    if (voteTermData) {
      setStartDate(new Date(voteTermData.voteStartAt));
      setEndDate(new Date(voteTermData.voteEndAt));
    }
  }, [voteTermData]);

  const handleDateSave = () => {
    if (!startDate || !endDate) {
      toast('시작 시간과 종료 시간을 모두 입력해주세요', 'info');
      return;
    }
    if (startDate >= endDate) {
      toast('종료 시간은 시작 시간보다 빠를 수 없어요', 'error');
      return;
    }

    updateVoteTerm({ voteStartAt: startDate.toISOString(), voteEndAt: endDate.toISOString() });
  };

  return (
    <div className="flex w-full flex-col justify-between gap-5 lg:w-auto lg:flex-row lg:items-center">
      <span className="text-sm font-medium whitespace-nowrap">- 투표 기간 설정</span>
      <div className="flex flex-col items-center justify-between gap-3 lg:flex-row lg:gap-10">
        <DateTimePicker
          label={'시작 일시'}
          prevDate={startDate}
          onChange={(newDate) => setStartDate(new Date(newDate))}
        />
        <DateTimePicker label={'종료 일시'} prevDate={endDate} onChange={(newDate) => setEndDate(new Date(newDate))} />
      </div>
      <button
        onClick={handleDateSave}
        disabled={isPending || isLoading}
        className="bg-mainBlue hover:bg-mainBlue/90 rounded-md p-1 px-6 text-sm text-white transition-colors disabled:cursor-not-allowed disabled:bg-gray-400"
      >
        {isPending ? '저장 중...' : '저장'}
      </button>
    </div>
  );
};

export default VoteTermSelector;
