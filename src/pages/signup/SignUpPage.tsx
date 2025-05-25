import SignUpForm from './SignUpForm';

const SignUpPage = () => {
  return (
    <div className="mx-auto flex max-w-4xl flex-col p-10">
      <div className="my-10 flex flex-col gap-4">
        <h1 className="text-4xl font-bold">회원가입</h1>
        <h2 className="text-gray-500">회원가입 후 프로젝트와 성과를 한눈에 관리하세요.</h2>
      </div>
      <SignUpForm />
    </div>
  );
};

export default SignUpPage;
