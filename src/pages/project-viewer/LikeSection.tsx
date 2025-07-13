import { useMutation, useQueryClient } from '@tanstack/react-query';
import useAuth from 'hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { patchLikeToggle } from 'apis/projectViewer';
import { useToast } from 'hooks/useToast';
import { FaHeart } from 'react-icons/fa';

interface LikeSectionProps {
  contestId: number;
  teamId: number;
  isLiked: boolean;
}

const LikeSection = ({ contestId, teamId, isLiked }: LikeSectionProps) => {
  const { isSignedIn } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();

  const queryClient = useQueryClient();
  const { user } = useAuth();
  const likeMutation = useMutation({
    mutationFn: (nextIsLiked: boolean) => patchLikeToggle({ teamId, isLiked: nextIsLiked }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projectDetails', teamId] });
      queryClient.invalidateQueries({ queryKey: ['teams', 'current', user?.id ?? 'guest'] });
      queryClient.invalidateQueries({ queryKey: ['teams', contestId, user?.id ?? 'guest'] });
      toast(!isLiked ? '좋아요를 눌렀어요.' : '좋아요를 취소했어요.');
    },
  });

  const handleClick = () => {
    if (!isSignedIn) {
      toast('로그인이 필요해요.');
      navigate('/signin');
    }
    if (likeMutation.isPending) return;
    likeMutation.mutate(!isLiked);
  };

  return (
    <>
      <button
        onClick={handleClick}
        disabled={likeMutation.isPending}
        className={`${
          isLiked ? 'bg-mainGreen text-white hover:bg-emerald-600' : 'bg-lightGray text-white hover:bg-gray-300'
        } relative flex cursor-pointer items-center gap-5 justify-self-center rounded-full px-5 py-3 text-sm sm:px-8`}
      >
        <FaHeart className={`${isLiked ? 'text-white' : 'text-whiteGray'}`} size={20} />
        <span className="hidden sm:inline">좋아요</span>
      </button>
    </>
  );
};

export default LikeSection;
