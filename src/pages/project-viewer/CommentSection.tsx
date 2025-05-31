import { useState } from 'react';
import { GoKebabHorizontal } from 'react-icons/go';
import { comment_list } from '@mocks/data/comment'; // 댓글 목록 데이터

const CommentSection = () => {
  const [comments, setComments] = useState(comment_list); // 댓글 상태 관리
  const [isMenuOpen, setIsMenuOpen] = useState<number | null>(null); // 메뉴 열기/닫기 상태
  const [editedDescription, setEditedDescription] = useState<string>(''); // 수정된 댓글 내용
  const [newComment, setNewComment] = useState<string>(''); // 새 댓글 내용

  // 댓글 수정 메뉴 토글
  const toggleMenu = (commentId: number) => {
    setIsMenuOpen(isMenuOpen === commentId ? null : commentId);
  };

  // 댓글 수정 처리
  const handleEdit = (commentId: number) => {
    // 수정된 댓글을 상태에 반영하는 로직
    setComments(
      comments.map((comment) =>
        comment.commentId === commentId ? { ...comment, description: editedDescription } : comment,
      ),
    );
    setIsMenuOpen(null); // 메뉴 닫기
  };

  // 댓글 삭제 처리
  const handleDelete = (commentId: number) => {
    setComments(comments.filter((comment) => comment.commentId !== commentId));
    setIsMenuOpen(null); // 메뉴 닫기
  };

  // 댓글 등록 처리
  const handleAddComment = () => {
    const newCommentData = {
      commentId: comments.length + 1, // 새로운 ID (임시)
      description: newComment,
      memberId: 103, // 예시: 고정된 ID 또는 로그인한 사용자 ID로 교체
      teamId: 5, // 예시: 고정된 팀 ID
    };
    setComments([newCommentData, ...comments]);
    setNewComment(''); // 입력 필드 초기화
  };

  return (
    <div className="flex flex-col">
      <div className="border-midGray flex h-[200px] flex-col justify-between rounded border p-5 text-sm">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="프로젝트에 대해 댓글을 남겨보세요."
          className="placeholder-lightGray mb-1 w-full flex-1 resize-none focus:outline-none"
        />
        <button
          onClick={handleAddComment}
          className="text-mainGreen self-end rounded-full bg-[#D1F3E1] px-15 py-3 font-bold"
        >
          등록
        </button>
      </div>
      <div className="h-20" />
      <div className="border-lightGray border-b pb-5 text-sm font-bold">
        댓글 <span className="text-mainGreen">{comments.length}</span>개
      </div>
      <div className="flex flex-col">
        {comments.map(({ commentId, memberId, description }) => (
          <div key={commentId} className="border-lightGray relative flex flex-col gap-2 border-b p-5 text-sm">
            <span className="flex justify-between font-bold">
              {memberId}
              <button onClick={() => toggleMenu(commentId)}>
                <GoKebabHorizontal className="text-midGray cursor-pointer hover:bg-gray-100" />
              </button>
            </span>
            <div className="leading-[1.8]">{description}</div>

            {/* 수정/삭제 메뉴 */}
            {isMenuOpen === commentId && (
              <div className="border-lightGray absolute right-0 mt-10 rounded border bg-white p-2 shadow-lg">
                <button
                  onClick={() => handleDelete(commentId)}
                  className="block w-full p-2 text-left hover:bg-gray-100"
                >
                  댓글 삭제
                </button>
                <button onClick={() => handleEdit(commentId)} className="block w-full p-2 text-left hover:bg-gray-100">
                  댓글 수정
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentSection;
