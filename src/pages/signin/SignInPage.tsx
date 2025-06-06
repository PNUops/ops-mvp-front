import { Link } from 'react-router-dom';
import SignInForm from './SignInForm';

const SignInPage = () => {
  return (
    <>
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-10 p-10">
        <h1 className="my-8 text-4xl font-bold">로그인</h1>
        <SignInForm />
        <Link className="text-midGray block" to="/find">
          아이디/비밀번호 찾기
        </Link>
      </div>
    </>
  );
};
export default SignInPage;
