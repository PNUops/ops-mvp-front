import logo from 'assets/logo.svg';
import useAuth from 'hooks/useAuth';
import { BiCog } from 'react-icons/bi';
import { useNavigate, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isSignedIn, signOut, isAdmin } = useAuth();

  const handleLogout = () => {
    const confirmLogout = window.confirm('로그아웃 하시겠습니까?');
    if (confirmLogout) {
      signOut();
      navigate('/');
    }
  };

  return (
    <header className="h-header min-h-header border-lightGray z-20 flex w-full items-center justify-between border-b bg-white px-4">
      <Link to="/">
        <img className="h-10 w-auto" src="/Logo.svg" alt="부산대학교 SW성과관리시스템 로고" />
      </Link>
      <div className="flex items-center justify-between gap-8">
        {isAdmin ? (
          // 이미 /admin 경로에 있다면 Link가 아닌 div로 감싸서 클릭 이벤트를 막음
          location.pathname !== '/admin' ? (
            <Link to="/admin" className="flex items-center gap-2 hover:cursor-pointer">
              <BiCog className="text-mainGreen text-exsm cursor-pointer" />
              <span className="text-exsm">관리자 페이지</span>
            </Link>
          ) : (
            <div className="flex items-center gap-2 hover:cursor-pointer">
              <BiCog className="text-mainGreen text-exsm cursor-pointer" />
              <span className="text-exsm">관리자 페이지</span>
            </div>
          )
        ) : null}
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
