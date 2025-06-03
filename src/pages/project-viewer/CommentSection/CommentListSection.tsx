import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Comment from './Comment';
import { getCommentsList, deleteComment, editComment } from 'apis/projectViewer';
import { CommentDto, CommentDeleteRequestDto, CommentEditRequestDto } from 'types/DTO/projectViewerDto';

interface CommentListSectionProps {
  teamId: number;
}

const CommentListSection = ({ teamId }: CommentListSectionProps) => {
  const queryClient = useQueryClient();
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState<number | null>(null);
  const [editedDescription, setEditedDescription] = useState<string>('');

  const { data: comments = [] } = useQuery<CommentDto[]>({
    queryKey: ['comments', teamId],
    queryFn: () => getCommentsList(teamId),
  });

  const deleteMutation = useMutation({
    mutationFn: (request: CommentDeleteRequestDto) => deleteComment(request),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['comments', teamId] }),
  });

  const editMutation = useMutation({
    mutationFn: (request: CommentEditRequestDto) => editComment(request),
    onSuccess: () => {
      setEditingId(null);
      queryClient.invalidateQueries({ queryKey: ['comments', teamId] });
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
            isMenuOpen={isMenuOpen === comment.commentId}
            toggleMenu={() => setIsMenuOpen(isMenuOpen === comment.commentId ? null : comment.commentId)}
            handleEdit={() =>
              editMutation.mutate({ teamId, commentId: comment.commentId, description: editedDescription })
            }
            handleDelete={() => deleteMutation.mutate({ teamId, commentId: comment.commentId })}
            setEditedDescription={setEditedDescription}
          />
        ))}
      </div>
    </div>
  );
};

export default CommentListSection;
