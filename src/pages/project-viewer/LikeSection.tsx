import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import useAuth from 'hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { patchLikeToggle } from 'apis/projectViewer';

import { FaHeart } from 'react-icons/fa';
import { useToast } from 'hooks/useToast';

interface LikeSectionProps {
  teamId: number;
  isLiked: boolean;
}

const LikeSection = ({ teamId, isLiked: initIsLiked }: LikeSectionProps) => {
  const { isSignedIn } = useAuth();
  const [isLiked, setIsLiked] = useState(initIsLiked);
  const navigate = useNavigate();
  const toast = useToast();

  const queryClient = useQueryClient();
  const { user } = useAuth();
  const likeMutation = useMutation({
    mutationFn: (nextIsLiked: boolean) => patchLikeToggle({ teamId, isLiked: nextIsLiked }),
    onSuccess: () => {
      const nextLiked = !isLiked;
      setIsLiked((prev) => !prev);
      queryClient.invalidateQueries({ queryKey: ['teams', user?.id ?? 'guest'] });
      toast(nextLiked ? '좋아요를 눌렀어요.' : '좋아요를 취소했어요.');
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
