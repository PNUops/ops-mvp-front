import logo from 'assets/logo.svg';
import useAuth from 'hooks/useAuth';
import { BiCog } from 'react-icons/bi';
import { useNavigate, useLocation } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isSignedIn, signOut, user, isAdmin } = useAuth();

  const handleLogout = () => {
    const confirmLogout = window.confirm('로그아웃 하시겠습니까?');
    if (confirmLogout) {
      signOut();
      navigate('/');
    }
  };

  const handleAdminPage = () => {
    console.log('user: ', user);
    if (!isSignedIn) {
      alert('로그인 후 이용해주세요.');
      return;
    }
    if (user?.roles?.includes('ROLE_팀장')) {
      navigate('/monitor');
      return;
    }
    alert('관리자만 접근할 수 있습니다.');
    return;
  };

  return (
    <header className="h-header min-h-header border-lightGray z-20 flex w-full items-center justify-between border-b bg-white px-4">
      <div className="w-sidebar flex items-center justify-center font-bold">
        <img className="hover:cursor-pointer" src={logo} alt="대회 로고" onClick={() => navigate('/')} />
      </div>
      <div className="flex items-center justify-between gap-8">
        <div
          className="flex items-center gap-2 hover:cursor-pointer"
          onClick={location.pathname != '/monitor' ? handleAdminPage : undefined}
        >
          <BiCog className="text-mainGreen text-exsm cursor-pointer" />
          <span className="text-exsm">관리자 페이지</span>
        </div>
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
