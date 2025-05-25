const SignInForm = () => {
  return (
    <form className="flex flex-col gap-4">
      <input
        className="rounded-lg p-3 text-lg outline outline-gray-500 focus:outline-2 focus:outline-green-500"
        placeholder="이메일"
      />
      <PasswordInput />
      <div className="h-2" />
      <button className="rounded-lg bg-blue-500 p-3 text-lg font-bold text-white">로그인</button>
      <button className="rounded-lg p-3 text-lg font-bold outline outline-gray-500">회원가입</button>
    </form>
  );
};
export default SignInForm;
import { useState } from 'react';

const PasswordInput = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative w-full">
      <input
        type={showPassword ? 'text' : 'password'}
        className="w-full rounded-lg p-3 text-lg outline outline-gray-500 focus:outline-2 focus:outline-green-500"
        placeholder="비밀번호"
      />
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500"
      >
        {showPassword ? '가리기' : '보기'}
      </button>
    </div>
  );
};
