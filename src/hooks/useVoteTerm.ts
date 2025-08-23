import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';
import { useToast } from 'hooks/useToast';
import { getVoteTerm, updateVoteTerm } from 'apis/contests';
import { formatDateTime } from 'utils/time';
import { VoteTermDto } from 'types/DTO';

export const useGetVoteTerm = (contestId: number | undefined) => {
  return useQuery({
    queryKey: ['voteTerm', contestId],
    queryFn: () => getVoteTerm(contestId as number),
    enabled: !!contestId,
  });
};

export const useIsVoteTerm = (contestId: number | undefined) => {
  const { data: voteTermData, isLoading } = useGetVoteTerm(contestId);

  const isVoteTerm = useMemo(() => {
    if (!voteTermData) return false;

    const now = new Date();
    const startTime = new Date(voteTermData.voteStartAt);
    const endTime = new Date(voteTermData.voteEndAt);

    return now >= startTime && now <= endTime;
  }, [voteTermData]);

  console.log('isVoteTerm', isVoteTerm, voteTermData);

  return { isVoteTerm };
};

export const useUpdateVoteTerm = (contestId: number) => {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationFn: (payload: { voteStartAt: string; voteEndAt: string }) =>
      updateVoteTerm(contestId, {
        voteStartAt: formatDateTime(new Date(payload.voteStartAt)),
        voteEndAt: formatDateTime(new Date(payload.voteEndAt)),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['voteTerm', contestId] });
      toast('투표 기간이 업데이트 되었어요', 'success');
    },
    onError: () => {
      toast('투표 기간 업데이트에 실패했어요', 'error');
    },
  });
};
