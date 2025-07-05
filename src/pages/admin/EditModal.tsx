import { useState } from 'react';
import Button from '@components/Button';
import Input from '@components/Input';
import { patchContest } from 'apis/contests';
import { useToast } from 'hooks/useToast';

type ModalProps = {
  closeModal: () => void;
  editId: number;
};

const EditModal = ({ closeModal, editId }: ModalProps) => {
  const [contestName, setContestName] = useState<string>('');
  const toast = useToast();

  const handleEdit = async () => {
    if (contestName == '') {
      toast('수정할 대회명이 비어있습니다.', 'error');
      return;
    }
    try {
      await patchContest(editId, contestName);
      closeModal();
    } catch {
      toast('수정하기 못했습니다.', 'error');
    }
  };
  return (
    <div onClick={closeModal} className="fixed top-0 left-0 z-50 flex h-full w-full items-center justify-center">
      <div
        onClick={(e) => e.stopPropagation()}
        className="border-mainBlue flex flex-col items-center justify-center rounded-xl border-2 bg-white p-10 py-6 opacity-100 shadow-2xl"
      >
        <div className="mt-8 mb-8 flex w-full justify-between">
          <Input
            type="text"
            value={contestName}
            onChange={(e) => setContestName(e.target.value)}
            placeholder="대회명을 입력하세요."
            className="bg-whiteGray mx-4 h-12 w-[70%] rounded-lg"
          />
          <Button className="bg-mainBlue h-12 w-[20%] min-w-[130px]" onClick={handleEdit}>
            대회 수정하기
          </Button>
        </div>
        <Button className="bg-mainBlue w-[100px]" onClick={closeModal}>
          닫기
        </Button>
      </div>
    </div>
  );
};

export default EditModal;
