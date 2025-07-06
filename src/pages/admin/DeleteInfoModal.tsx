import Button from '@components/Button';

type ModalProps = {
  closeModal: () => void;
};

const DeleteInfoModal = ({ closeModal }: ModalProps) => {
  return (
    <div onClick={closeModal} className="fixed top-0 left-0 z-50 flex h-full w-full items-center justify-center">
      <div onClick={e => e.stopPropagation()} className="border-mainBlue flex flex-col items-center justify-center rounded-xl border-2 bg-white p-10 opacity-100 shadow-2xl">
        <p className="mb-8 text-lg">대회 내 팀이 남아있으면 삭제할 수 없습니다.</p>
        <Button className="bg-mainBlue w-[100px]" onClick={closeModal}>
          닫기
        </Button>
      </div>
    </div>
  );
};

export default DeleteInfoModal;
