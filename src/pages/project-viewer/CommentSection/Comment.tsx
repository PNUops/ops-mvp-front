import { GoKebabHorizontal } from 'react-icons/go';

interface CommentProps {
  comment: {
    commentId: number;
    memberId: number;
    description: string;
  };
  isEditing: boolean;
  isMenuOpen: boolean;
  toggleMenu: () => void;
  handleEdit: () => void;
  handleDelete: () => void;
  setEditedDescription: (desc: string) => void;
}

const Comment = ({ comment, isMenuOpen, toggleMenu, handleEdit, handleDelete, setEditedDescription }: CommentProps) => {
  return (
    <div className="border-lightGray relative flex flex-col gap-2 border-b p-5 text-sm">
      <span className="flex justify-between font-bold">
        {comment.memberId}
        <button onClick={toggleMenu}>
          <GoKebabHorizontal className="text-midGray cursor-pointer hover:bg-gray-100" />
        </button>
      </span>
      <div className="leading-[1.8]">{comment.description}</div>

      {isMenuOpen && (
        <div className="border-lightGray absolute right-0 mt-10 rounded border bg-white p-2 shadow-lg">
          <button onClick={handleDelete} className="block w-full p-2 text-left hover:bg-gray-100">
            댓글 삭제
          </button>
          <button
            onClick={() => {
              const newDesc = prompt('댓글을 수정하세요', comment.description);
              if (newDesc !== null) setEditedDescription(newDesc);
              handleEdit();
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
