import Button from '@components/Button';

type DeleteModalProps = {
  closeDeleteModal: () => void;
  handleDelete: () => void;
  type: 'contest' | 'team' | null;
};

const DeleteModal = ({ closeDeleteModal, handleDelete, type }: DeleteModalProps) => {
  return (
    <div
      onClick={closeDeleteModal}
      className="fixed top-0 left-0 z-50 flex h-full w-full items-center justify-center bg-black/30"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="border-mainBlue flex min-w-[320px] flex-col items-center justify-center rounded-xl border-2 bg-white p-10 py-6"
      >
        <div className="mb-8 text-center text-lg font-bold">
          {type === 'contest' && '정말로 이 대회를 삭제하시겠습니까?'}
          {type === 'team' && '정말로 이 팀을 삭제하시겠습니까?'}
        </div>
        <div className="flex w-full justify-center gap-4">
          <Button className="bg-lightGray text-black" onClick={closeDeleteModal}>
            취소
          </Button>
          <Button className="bg-mainRed" onClick={handleDelete}>
            삭제
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
