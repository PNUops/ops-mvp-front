import SignInForm from './SignInForm';

const SignInPage = () => {
  return (
    <>
      <div className="mx-auto flex max-w-2xl flex-col items-center p-10">
        <img className="w-2/3" src="/Logo.svg" alt="부산대학교 SW성과관리시스템 로고" />
        <h1 className="my-12 text-4xl font-bold">로그인</h1>
        <SignInForm />
      </div>
    </>
  );
};
export default SignInPage;
