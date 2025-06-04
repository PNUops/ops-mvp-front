import SignInForm from './SignInForm';

const SignInPage = () => {
  return (
    <>
      <div className="mx-auto flex max-w-2xl flex-col items-center p-10">
        <img src="/Logo.svg" />
        <h1 className="my-4 text-4xl font-bold">로그인</h1>
        <div className="h-6" />
        <SignInForm />
      </div>
    </>
  );
};
export default SignInPage;
