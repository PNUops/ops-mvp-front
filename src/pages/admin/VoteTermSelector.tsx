import { useState, useEffect } from 'react';
import { useGetVoteTerm, useUpdateVoteTerm } from 'hooks/useVoteTerm';
import { useToast } from 'hooks/useToast';
import { formatDateTime } from 'utils/time';
import { CURRENT_CONTEST_ID } from 'constants/contest';
import DateTimePicker from '@components/DateTimePicker';

import { MoveUp } from 'lucide-react';

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
    if (
      formatDateTime(startDate) === voteTermData?.voteStartAt &&
      formatDateTime(endDate) === voteTermData?.voteEndAt
    ) {
      toast('변경된 내용이 없어요', 'info');
      return;
    }

    updateVoteTerm({ voteStartAt: startDate.toISOString(), voteEndAt: endDate.toISOString() });
  };

  return (
    <div className="flex w-full flex-col gap-5">
      <div className="flex items-center justify-between gap-2">
        <p className="text-sm font-medium whitespace-nowrap">- 투표 기간 설정</p>
        <span className="text-midGray text-xs">
          방향 키 <MoveUp className="inline-block h-2 w-2" />를 통해 오전/오후를 설정할 수 있어요.
        </span>
      </div>

      <div className="flex flex-col gap-4 lg:flex-row lg:justify-between lg:gap-6">
        <div className="flex flex-col gap-4 xl:flex-row xl:gap-6">
          <DateTimePicker label={'시작 일시'} prevDate={startDate} onChange={(newDate) => setStartDate(newDate)} />
          <DateTimePicker label={'종료 일시'} prevDate={endDate} onChange={(newDate) => setEndDate(newDate)} />
        </div>
        <button
          onClick={handleDateSave}
          disabled={isPending || isLoading}
          className="bg-mainBlue hover:bg-mainBlue/90 flex h-9 items-center justify-center rounded-md px-6 py-2 text-sm text-white transition-colors disabled:cursor-not-allowed disabled:bg-gray-400"
        >
          {isPending ? '저장 중...' : '저장'}
        </button>
      </div>
    </div>
  );
};

export default VoteTermSelector;
