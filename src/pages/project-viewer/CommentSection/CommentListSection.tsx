import { useQuery } from '@tanstack/react-query';
import Comment from './Comment';
import { getCommentsList } from 'apis/projectViewer';
import { CommentDto } from 'types/DTO/projectViewerDto';

interface CommentListSectionProps {
  teamId: number;
  memberId: number;
}

const CommentListSection = ({ teamId, memberId }: CommentListSectionProps) => {
  const { data: comments = [] } = useQuery<CommentDto[]>({
    queryKey: ['comments', teamId],
    queryFn: () => getCommentsList(teamId),
  });

  return (
    <div>
      <div className="border-lightGray border-b pb-5 text-sm font-bold">
        댓글 <span className="text-mainGreen">{comments.length}</span>개
      </div>
      <div className="flex flex-col">
        {comments.map((comment) => (
          <Comment key={comment.commentId} comment={comment} />
        ))}
      </div>
    </div>
  );
};

export default CommentListSection;
