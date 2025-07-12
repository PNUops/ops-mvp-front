import Button from '@components/Button';
import Input from '@components/Input';
import useEditContest from 'hooks/useEditContest';
import { RxCross2 } from 'react-icons/rx';
import { FaRegEdit } from 'react-icons/fa';

type EditModalProps = {
  isOpen: boolean;
  closeModal: () => void;
  editId: number;
};

const EditModal = ({ isOpen, closeModal, editId }: EditModalProps) => {
  const { contestName, setContestName, isLoading, handleEdit } = useEditContest(editId, closeModal);
  if (!isOpen) return null;

  return (
    <div
      onClick={closeModal}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-[640px] rounded-2xl bg-white p-6 shadow-xl transition-all duration-300 ease-in-out"
      >
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-gray-400 hover:cursor-pointer hover:text-gray-600"
          aria-label="닫기"
        >
          <RxCross2 size={20} />
        </button>
        <div className="text-mainBlue mx-auto my-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
          <FaRegEdit size={25} />
        </div>
        <h3 className="text-center text-lg font-semibold text-gray-800">수정할 대회명을 입력하세요.</h3>
        <div className="mt-8 mb-8 flex w-full justify-between">
          <Input
            type="text"
            value={contestName}
            onChange={(e) => setContestName(e.target.value)}
            placeholder="대회명을 입력하세요."
            className="bg-whiteGray mx-4 h-12 w-[70%] rounded-lg"
            disabled={isLoading}
          />
        </div>
        <div className="mx-auto my-4 flex items-center justify-center gap-4">
          <Button
            className="border-lightGray text-midGray rounded-full border px-5 py-1.5 hover:bg-gray-100"
            onClick={closeModal}
            disabled={isLoading}
          >
            닫기
          </Button>
          <Button
            className="bg-mainBlue rounded-full px-5 py-1.5 hover:bg-blue-500"
            onClick={handleEdit}
            disabled={isLoading}
          >
            {isLoading ? '수정 중...' : '대회 수정하기'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
