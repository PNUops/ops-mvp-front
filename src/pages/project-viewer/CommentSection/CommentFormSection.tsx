import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import useAuth from 'hooks/useAuth';
import { CommentFormRequestDto } from 'types/DTO/projectViewerDto';
import { postCommentForm } from 'apis/projectViewer';
import { comment } from 'postcss';

interface CommentFormSection {
  teamId: number;
}

const CommentFormSection = ({ teamId }: CommentFormSection) => {
  const [newComment, setNewComment] = useState('');

  const commentMutation = useMutation<void, Error, string>({
    mutationFn: (comment) =>
      postCommentForm({
        teamId,
        description: comment,
      }),
    onSuccess: () => {
      setNewComment('');
    },
    onError: () => {
      alert('댓글 등록에 실패했어요.');
    },
  });

  const handleClick = () => {
    if (!newComment.trim()) return alert('댓글을 입력해주세요.');
    if (commentMutation.isPending) return;
    commentMutation.mutate(newComment);
  };

  return (
    <>
      <div className="border-midGray flex h-[200px] flex-col justify-between rounded border p-5 text-sm">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="프로젝트에 대해 댓글을 남겨보세요."
          className="placeholder-lightGray mb-1 w-full flex-1 resize-none focus:outline-none"
        />
        <button
          onClick={handleClick}
          className="text-mainGreen self-end rounded-full bg-[#D1F3E1] px-15 py-3 font-bold hover:cursor-pointer"
        >
          {commentMutation.isPending ? '등록 중...' : '등록'}
        </button>
      </div>
    </>
  );
};

export default CommentFormSection;
