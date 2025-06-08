import { useEffect, useRef, useState } from 'react';
import { GoPencil } from 'react-icons/go';
import { IoIosRemoveCircleOutline } from 'react-icons/io';

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
    <div className="border-lightGray relative flex flex-col gap-3 border-b p-5 text-sm" ref={editRef}>
      <span className="flex justify-between font-bold">
        {comment.memberName}
        {comment.memberId === currentUserId && (
          <div className="text-midGray flex gap-4">
            <div className="group relative">
              <button
                onClick={onStartEdit}
                className={`cursor-pointer ${isEditing ? 'text-mainGreen' : 'hover:text-mainGreen'}`}
              >
                <GoPencil size={18} />
              </button>
              <div className="bg-mainGreen absolute -top-8 left-1/2 -translate-x-1/2 rounded px-2 py-1 text-xs font-normal whitespace-nowrap text-white opacity-0 transition-opacity group-hover:opacity-50">
                댓글 수정
              </div>
            </div>

            <div className="group relative">
              <button onClick={handleDelete} className="cursor-pointer hover:text-red-500">
                <IoIosRemoveCircleOutline size={20} />
              </button>
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 rounded bg-red-500 px-2 py-1 text-xs font-normal whitespace-nowrap text-white opacity-0 transition-opacity group-hover:opacity-50">
                댓글 삭제
              </div>
            </div>
          </div>
        )}
      </span>

      {isEditing ? (
        <div className="flex flex-col gap-5 transition-all duration-300 ease-in-out">
          <textarea
            className="bg-whiteGray placeholder:text-lightGray focus:ring-lightGray h-32 w-full resize-none overflow-y-auto rounded p-3 leading-[1.8] transition-all duration-300 ease-in-out focus:ring focus:outline-none"
            placeholder="댓글을 입력하세요 (최대 255자)"
            maxLength={255}
            value={localDesc}
            onChange={(e) => setLocalDesc(e.target.value)}
          />
          <div className="flex justify-end gap-2">
            <button
              className="bg-mainGreen text-exsm text-whiteGray rounded-full px-5 py-1 transition hover:cursor-pointer hover:bg-emerald-600"
              onClick={() => {
                setEditedDescription(localDesc);
                handleEdit();
              }}
            >
              저장
            </button>
            <button
              className="text-exsm border-lightGray text-midGray hover:bg-lightGray rounded-full border px-5 py-1 transition hover:cursor-pointer"
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
        <div className="leading-[1.8] break-words transition-all duration-300 ease-in-out">{comment.description}</div>
      )}
    </div>
  );
};

export default Comment;
