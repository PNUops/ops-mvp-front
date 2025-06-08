import { useEffect, useRef, useState } from 'react';
import ConfirmModal from './ConfirmModal';
import { RiPencilFill } from 'react-icons/ri';
import { IoRemoveCircle } from 'react-icons/io5';

interface CommentProps {
  comment: {
    commentId: number;
    memberId: number;
    memberName: string;
    description: string;
  };
  isEditing: boolean;
  handleEdit: () => void;
  handleDelete: () => void;
  setEditedDescription: (desc: string) => void;
  onStartEdit: () => void;
  onCancelEdit: () => void;
  currentUserId: number;
}

const Comment = ({
  comment,
  isEditing,
  handleEdit,
  handleDelete,
  setEditedDescription,
  onStartEdit,
  onCancelEdit,
  currentUserId,
}: CommentProps) => {
  const [localDesc, setLocalDesc] = useState(comment.description);
  const [showConfirm, setShowConfirm] = useState(false);
  const editRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (isEditing && editRef.current && !editRef.current.contains(e.target as Node)) {
        setLocalDesc(comment.description);
        onCancelEdit();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isEditing, comment.description, onCancelEdit]);

  return (
    <>
      <div className="relative flex flex-col gap-3 border-b border-gray-100 p-5 text-sm" ref={editRef}>
        <span className="flex justify-between font-bold">
          {comment.memberName}
          {comment.memberId === currentUserId && (
            <div className="text-midGray bg-whiteGray flex items-center gap-3 rounded-md px-3">
              <div className="group relative">
                <button
                  onClick={onStartEdit}
                  className={`cursor-pointer ${isEditing ? 'text-mainGreen' : 'hover:text-mainGreen'} text-lightGray focus:text-mainGreen focus:outline-none`}
                >
                  <RiPencilFill size={18} />
                </button>
                <div className="bg-mainGreen absolute -top-8 left-1/2 -translate-x-1/2 rounded px-2 py-1 text-xs font-normal whitespace-nowrap text-white opacity-0 transition-opacity group-hover:opacity-50">
                  댓글 수정
                </div>
              </div>
              <div className="bg-lightGray h-3 w-px" />
              <div className="group relative">
                <button
                  onClick={() => setShowConfirm(true)}
                  className="text-lightGray hover:text-mainRed focus:text-mainRed cursor-pointer focus:outline-none"
                >
                  <IoRemoveCircle size={18} />
                </button>
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 rounded bg-red-500 px-2 py-1 text-xs font-normal whitespace-nowrap text-white opacity-0 transition-opacity group-hover:opacity-50">
                  댓글 삭제
                </div>
              </div>
            </div>
          )}
        </span>

        {isEditing ? (
          <div className="animate-fade-in flex flex-col gap-5">
            <div className="bg-whiteGray focus:ring-lightGray flex h-36 flex-col gap-2 rounded p-3 text-sm transition-all duration-300 ease-in-out focus:outline-none">
              <textarea
                className="placeholder:text-lightGray w-full flex-1 resize-none focus:outline-none"
                placeholder="댓글을 입력하세요 (최대 255자)"
                maxLength={255}
                value={localDesc}
                onChange={(e) => setLocalDesc(e.target.value)}
              />
              <div className="text-exsm text-midGray text-right">
                <span className={localDesc.length >= 200 ? 'text-mainRed' : ''}>{localDesc.length}</span> / 255자
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <button
                className="bg-mainGreen text-exsm text-whiteGray rounded-full px-5 py-1 transition hover:cursor-pointer hover:bg-emerald-600 focus:bg-emerald-600 focus:outline-none"
                onClick={() => {
                  if (localDesc.trim() === comment.description.trim()) {
                    onCancelEdit();
                    return;
                  }
                  setEditedDescription(localDesc);
                  handleEdit();
                }}
              >
                저장
              </button>
              <button
                className="text-exsm border-lightGray text-midGray hover:bg-lightGray focus:bg-lightGray rounded-full border px-5 py-1 transition hover:cursor-pointer focus:outline-none"
                onClick={() => {
                  setLocalDesc(comment.description);
                  onCancelEdit();
                }}
              >
                취소
              </button>
            </div>
          </div>
        ) : (
          <div className="break-words text-gray-700 transition-all duration-300 ease-in-out">{comment.description}</div>
        )}
      </div>
      <ConfirmModal
        isOpen={showConfirm}
        onConfirm={() => {
          handleDelete();
          setShowConfirm(false);
        }}
        onCancel={() => setShowConfirm(false)}
        message="삭제한 댓글은 복구할 수 없습니다."
      />
    </>
  );
};

export default Comment;
