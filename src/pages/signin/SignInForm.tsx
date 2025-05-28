import Input from '@components/Input';
import PasswordInput from '@components/PasswordInput';

const SignInForm = () => {
  return (
    <form className="flex w-full flex-col gap-4">
      <Input placeholder="이메일" />
      <PasswordInput value="" setValue={() => {}} />
      <div className="h-2" />
      <button className="bg-mainBlue rounded-lg p-3 text-lg font-bold text-white">로그인</button>
      <button className="border-midGray rounded-lg border p-3 text-lg font-bold">회원가입</button>
    </form>
  );
};
export default SignInForm;
