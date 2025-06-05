import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import useAuth from 'hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { patchLikeToggle } from 'apis/projectViewer';

import { FaHeart } from 'react-icons/fa';
import { sign } from 'crypto';

interface LikeSectionProps {
  teamId: number;
  isLiked: boolean;
}

const LikeSection = ({ teamId, isLiked: initIsLiked }: LikeSectionProps) => {
  const { isSignedIn } = useAuth();
  const [isLiked, setIsLiked] = useState(initIsLiked);
  const navigate = useNavigate();

  const likeMutation = useMutation({
    mutationFn: (nextIsLiked: boolean) => patchLikeToggle({ teamId, isLiked: nextIsLiked }),
    onSuccess: () => {
      setIsLiked((prev) => !prev);
    },
  });

  const handleClick = () => {
    if (!isSignedIn) {
      alert('로그인이 필요해요.'); // TODO: 토스트 메시지로 바꾸기
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
          isLiked ? 'bg-mainGreen' : 'bg-lightGray'
        } relative flex cursor-pointer items-center gap-5 justify-self-center rounded-full px-5 py-3 text-sm text-white hover:bg-[#D1F3E1] sm:px-8`}
      >
        <FaHeart className="text-white" size={20} />
        <span className="hidden sm:inline">좋아요</span>
      </button>
    </>
  );
};

export default LikeSection;
