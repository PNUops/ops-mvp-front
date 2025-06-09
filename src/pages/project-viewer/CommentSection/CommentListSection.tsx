import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from 'hooks/useToast';
import Comment from './Comment';
import { getCommentsList, deleteComment, editComment } from 'apis/projectViewer';
import { CommentDto, CommentDeleteRequestDto, CommentEditRequestDto } from 'types/DTO/projectViewerDto';

interface CommentListSectionProps {
  teamId: number;
  memberId: number;
}

const CommentListSection = ({ teamId, memberId }: CommentListSectionProps) => {
  const queryClient = useQueryClient();
  const toast = useToast();
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState<number | null>(null);
  const [editedDescription, setEditedDescription] = useState<string>('');

  const { data: comments = [] } = useQuery<CommentDto[]>({
    queryKey: ['comments', teamId],
    queryFn: () => getCommentsList(teamId),
  });

  const deleteMutation = useMutation({
    mutationFn: (request: CommentDeleteRequestDto) => deleteComment(request),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', teamId] }), toast('댓글이 삭제되었어요.');
    },
  });

  const editMutation = useMutation({
    mutationFn: (request: CommentEditRequestDto) => editComment(request),
    onSuccess: () => {
      setEditingId(null);
      queryClient.invalidateQueries({ queryKey: ['comments', teamId] });
      toast('댓글이 편집되었어요.');
    },
  });

  return (
    <div>
      <div className="border-lightGray border-b pb-5 text-sm font-bold">
        댓글 <span className="text-mainGreen">{comments.length}</span>개
      </div>
      <div className="flex flex-col">
        {comments.map((comment) => (
          <Comment
            key={comment.commentId}
            comment={comment}
            isEditing={editingId === comment.commentId}
            handleEdit={() =>
              editMutation.mutate({
                teamId,
                commentId: comment.commentId,
                description: editedDescription,
              })
            }
            handleDelete={() => deleteMutation.mutate({ teamId, commentId: comment.commentId })}
            setEditedDescription={setEditedDescription}
            onStartEdit={() => setEditingId(comment.commentId)}
            onCancelEdit={() => setEditingId(null)}
            currentUserId={memberId}
          />
        ))}
      </div>
    </div>
  );
};

export default CommentListSection;
