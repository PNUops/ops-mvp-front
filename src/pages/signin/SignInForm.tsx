import Input from '@components/Input';
import PasswordInput from '@components/PasswordInput';

const SignInForm = () => {
  return (
    <form className="flex flex-col gap-4">
      <Input placeholder="이메일" />
      <PasswordInput value="" setValue={() => {}} />
      <div className="h-2" />
      <button className="rounded-lg bg-blue-500 p-3 text-lg font-bold text-white">로그인</button>
      <button className="rounded-lg p-3 text-lg font-bold outline outline-gray-500">회원가입</button>
    </form>
  );
};
export default SignInForm;
