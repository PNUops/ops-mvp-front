import Backdrop from '@components/Backdrop';
import { Tooltip, TooltipContent, TooltipTrigger } from '@components/ToolTip';
import { ReactNode, useState } from 'react';
import { Link } from 'react-router-dom';

const SignInOptions = () => {
  return (
    <div className="text-midGray flex items-center justify-center gap-4 text-xs">
      <Link className="text-midGray" to="/find">
        아이디/비밀번호 찾기
      </Link>
      <span>|</span>
      <OnBoardingToolTip>
        <Link className="text-midGray" to="/signup">
          회원가입
        </Link>
      </OnBoardingToolTip>
    </div>
  );
};

export default SignInOptions;

interface ToolTipProps {
  children: ReactNode;
}
const OnBoardingToolTip = ({ children }: ToolTipProps) => {
  const isConfirmed = localStorage.getItem('signupLeaderMsgConfirmed');
  const [showTooltip, setShowTooltip] = useState(!isConfirmed);

  const handleConfirm = () => {
    setShowTooltip(false);
    localStorage.setItem('signupLeaderMsgConfirmed', 'true');
  };
  return (
    <>
      <Tooltip open={showTooltip}>
        <TooltipTrigger className="z-50 rounded-lg bg-white p-2" onClick={handleConfirm}>
          {children}
        </TooltipTrigger>
        <TooltipContent className="max-w-3xs duration-400">
          <div className="flex flex-col gap-2 p-2 text-base">
            <p className="break-keep">
              <strong className="text-mainBlue font-semibold">팀장 </strong>
              <span>또는 </span>
              <strong className="text-mainBlue font-semibold">팀원</strong>
              <span>이신가요? 소셜 로그인 대신 직접 </span>
              <strong className="text-mainBlue font-semibold">회원가입 </strong>
              <span>해주세요</span>
            </p>
            <button
              onClick={handleConfirm}
              className="text-mainBlue self-end-safe hover:cursor-pointer hover:font-semibold"
            >
              확인
            </button>
          </div>
        </TooltipContent>
      </Tooltip>
      <Backdrop isVisible={showTooltip} />
    </>
  );
};
