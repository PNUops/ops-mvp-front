import { useState } from 'react';
import { patchContest } from 'apis/contests';
import { useToast } from 'hooks/useToast';

const useEditContest = (editId: number, onClose: () => void) => {
  const [contestName, setContestName] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const toast = useToast();

  const handleEdit = async () => {
    if (!contestName.trim()) {
      toast('수정할 대회명이 비어있습니다.', 'error');
      return;
    }

    setIsLoading(true);
    try {
      await patchContest(editId, contestName);
      toast('대회가 수정되었습니다.', 'success');
      onClose();
    } catch (error) {
      toast('대회 수정에 실패했습니다.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    contestName,
    setContestName,
    isLoading,
    handleEdit,
  };
};

export default useEditContest;
