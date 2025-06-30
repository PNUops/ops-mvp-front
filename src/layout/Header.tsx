import logo from 'assets/logo.svg';
import useAuth from 'hooks/useAuth';
import { BiCog } from 'react-icons/bi';
import { useNavigate, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useToast } from 'hooks/useToast';

const Header = () => {
  const navigate = useNavigate();
  const { isSignedIn, signOut, user, isAdmin } = useAuth();
  const toast = useToast();

  const handleLogout = () => {
    toast('로그아웃 되었습니다.', 'success');
    signOut();
    navigate('/');
  };

  return (
    <header className="border-lightGray lg:h-header md:h-header xs:h-8 z-20 flex w-full min-w-[350px] items-center justify-between border-b bg-white px-4 py-2 sm:h-16">
      <div className="mx-auto flex w-full items-center justify-between px-4 sm:px-8 lg:px-16">
        <Link to="/">
          <img className="h-10 w-auto max-sm:hidden" src="/Logo.svg" alt="부산대학교 SW성과관리시스템 로고" />
          <img
            className="h-10 w-auto sm:hidden"
            src="/swOpsLogo-sm.png"
            alt="부산대학교 SW성과관리시스템 로고 (작은 버전)"
          />
        </Link>
        <div className="flex items-center justify-between gap-8">
          {isAdmin && (
            <Link to="/admin" className="flex items-center gap-2 hover:cursor-pointer">
              <BiCog className="text-mainGreen text-exsm cursor-pointer" />
              <span className="text-exsm">관리자 페이지</span>
            </Link>
          )}
          {user?.name && (
            <div className="text-exsm max-md:hidden">
              <span className="text-mainGreen text-sm">{user.name}</span> 님 환영합니다!
            </div>
          )}
          <button
            onClick={isSignedIn ? handleLogout : () => navigate('/signin')}
            className="text-exsm border-lightGray rounded-full border px-4 py-2 hover:cursor-pointer"
          >
            {isSignedIn ? '로그아웃' : '로그인 / 회원가입'}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
