import { GoKebabHorizontal } from 'react-icons/go';
import { useState } from 'react';

interface CommentProps {
  comment: {
    commentId: number;
    memberId: number;
    memberName: string;
    description: string;
  };
  isEditing: boolean;
  isMenuOpen: boolean;
  toggleMenu: () => void;
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
  isMenuOpen,
  toggleMenu,
  handleEdit,
  handleDelete,
  setEditedDescription,
  onStartEdit,
  onCancelEdit,
  currentUserId
}: CommentProps) => {
  const [localDesc, setLocalDesc] = useState(comment.description);

  return (
    <div className="border-lightGray relative flex flex-col gap-2 border-b p-5 text-sm">
      <span className="flex justify-between font-bold">
        {comment.memberName}
        {comment.memberId === currentUserId && (
          <button onClick={toggleMenu}>
            <GoKebabHorizontal size={25}className="rounded-full p-1 text-midGray cursor-pointer hover:bg-gray-100" />
          </button>
        )}
      </span>

      {isEditing ? (
        <div className="flex flex-col gap-2">
          <textarea
            className="w-full rounded border p-2"
            value={localDesc}
            onChange={(e) => setLocalDesc(e.target.value)}
          />
          <div className="flex gap-2">
            <button
              className="bg-mainGreen rounded px-3 py-1 text-white"
              onClick={() => {
                setEditedDescription(localDesc);
                handleEdit();
              }}
            >
              저장
            </button>
            <button
              className="rounded border px-3 py-1"
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
        <div className="leading-[1.8]">{comment.description}</div>
      )}

      {isMenuOpen && !isEditing && (
        <div className="border-lightGray absolute right-0 z-10 mt-10 rounded border bg-white p-2 shadow-lg">
          <button onClick={handleDelete} className="block w-full p-2 text-left hover:bg-gray-100">
            댓글 삭제
          </button>
          <button
            onClick={() => {
              onStartEdit();
            }}
            className="block w-full p-2 text-left hover:bg-gray-100"
          >
            댓글 수정
          </button>
        </div>
      )}
    </div>
  );
};

export default Comment;
