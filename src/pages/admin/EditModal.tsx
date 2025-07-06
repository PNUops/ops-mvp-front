import Button from '@components/Button';
import Input from '@components/Input';
import useEditContest from 'hooks/useEditContest';

type EditModalProps = {
  closeModal: () => void;
  editId: number;
};

const EditModal = ({ closeModal, editId }: EditModalProps) => {
  const { contestName, setContestName, isLoading, handleEdit } = useEditContest(editId, closeModal);

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
            disabled={isLoading}
          />
          <Button className="bg-mainBlue h-12 w-[20%] min-w-[130px]" onClick={handleEdit} disabled={isLoading}>
            {isLoading ? '수정 중...' : '대회 수정하기'}
          </Button>
        </div>
        <Button className="bg-mainBlue w-[100px]" onClick={closeModal} disabled={isLoading}>
          닫기
        </Button>
      </div>
    </div>
  );
};

export default EditModal;
