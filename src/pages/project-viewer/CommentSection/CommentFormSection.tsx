import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import useAuth from 'hooks/useAuth';
import { CommentFormRequestDto, CommentDto } from 'types/DTO/projectViewerDto';
import { postCommentForm } from 'apis/projectViewer';

interface CommentFormSection {
  teamId: number;
}

interface PreviousComments {
  previousComments: CommentDto[] | undefined;
}

const CommentFormSection = ({ teamId }: CommentFormSection) => {
  const [newComment, setNewComment] = useState('');
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const commentMutation = useMutation<void, Error, string, PreviousComments>({
    mutationFn: (comment) => {
      const requestDto: CommentFormRequestDto = {
        teamId,
        description: comment,
      };
      return postCommentForm(requestDto);
    },
    onMutate: async (newCommentText) => {
      await queryClient.cancelQueries({ queryKey: ['comments', teamId] });
      const previousComments = queryClient.getQueryData<CommentDto[]>(['comments', teamId]);

      const optimisticComment: CommentDto = {
        commentId: Date.now(),
        description: newCommentText,
        memberId: user?.id ?? 0,
        memberName: user?.name ?? '',
        teamId,
      };

      queryClient.setQueryData<CommentDto[]>(['comments', teamId], (old = []) => [...old, optimisticComment]);

      return { previousComments };
    },
    onError: (err, newComment, context) => {
      if (context?.previousComments) {
        queryClient.setQueryData(['comments', teamId], context.previousComments);
      }
      alert('댓글 등록에 실패했어요.');
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', teamId] });
      setNewComment('');
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
