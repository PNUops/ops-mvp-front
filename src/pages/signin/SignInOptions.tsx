import { Link } from 'react-router-dom';

const SignInOptions = () => {
  return (
    <div className="text-midGray flex justify-center gap-4 text-xs">
      <Link className="text-midGray" to="/find">
        아이디/비밀번호 찾기
      </Link>
      <span>|</span>
      <Link className="text-midGray" to="/signup">
        회원가입
      </Link>
    </div>
  );
};

export default SignInOptions;
