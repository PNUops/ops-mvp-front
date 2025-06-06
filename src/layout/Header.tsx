import logo from 'assets/logo.svg';
import useAuth from 'hooks/useAuth';
import { BiCog } from 'react-icons/bi';
import { useNavigate, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useToast } from 'hooks/useToast';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isSignedIn, signOut, isAdmin } = useAuth();
  const toast = useToast();

  const handleLogout = () => {
    toast('로그아웃 되었습니다.', 'success');
    signOut();
    navigate('/');
  };

  return (
    <header className="h-header min-h-header border-lightGray z-20 flex w-full items-center justify-between border-b bg-white px-4">
      <Link to="/">
        <img className="h-10 w-auto" src="/Logo.svg" alt="부산대학교 SW성과관리시스템 로고" />
      </Link>
      <div className="flex items-center justify-between gap-8">
        {isAdmin ?? (
          <Link to="/admin" className="flex items-center gap-2 hover:cursor-pointer">
            <BiCog className="text-mainGreen text-exsm cursor-pointer" />
            <span className="text-exsm">관리자 페이지</span>
          </Link>
        )}
        <button
          onClick={isSignedIn ? handleLogout : () => navigate('/signin')}
          className="text-exsm border-lightGray mr-8 rounded-full border px-4 py-2 hover:cursor-pointer"
        >
          {isSignedIn ? '로그아웃' : '로그인'}
        </button>
      </div>
    </header>
  );
};

export default Header;
