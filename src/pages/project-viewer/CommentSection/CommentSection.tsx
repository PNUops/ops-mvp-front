import { useNavigate } from 'react-router-dom';
import useAuth from 'hooks/useAuth';
import { useToast } from 'hooks/useToast';

import CommentFormSection from './CommentFormSection';
import CommentListSection from './CommentListSection';

interface CommentSectionProps {
  teamId: number;
  memberId?: number;
}

const CommentSection = ({ teamId, memberId }: CommentSectionProps) => {
  const { isSignedIn } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();

  if (!isSignedIn) {
    return (
      <button
        onClick={() => navigate('/signin')}
        className="bg-whiteGray text-midGray flex h-[100px] w-full items-center justify-center rounded hover:cursor-pointer"
      >
        댓글 작성 및 열람은 로그인이 필요해요.
      </button>
    );
  }

  return (
    <>
      {memberId !== undefined && (
        <div className="flex flex-col">
          <CommentFormSection teamId={teamId} />
          <div className="h-20" />
          <CommentListSection teamId={teamId} memberId={memberId} />
        </div>
      )}
    </>
  );
};

export default CommentSection;
