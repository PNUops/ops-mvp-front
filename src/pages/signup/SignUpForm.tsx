import Input from '@components/Input';
import PasswordInput from '@components/PasswordInput';

const SignUpForm = () => {
  return (
    <div className="flex w-full flex-col items-end">
      <form className="grid w-full grid-cols-[max-content_1fr_max-content] items-center gap-x-4 gap-y-6">
        <label className="flex items-center gap-1">
          <span className="text-red-500">*</span>
          <span className="text-gray-500">이름</span>
        </label>
        <Input />
        <div />

        <label className="flex items-center gap-1">
          <span className="text-red-500">*</span>
          <span className="text-gray-500">학번</span>
        </label>
        <Input />
        <div />
        <Spacer />

        <label className="flex items-center gap-1">
          <span className="text-red-500">*</span>
          <span className="text-gray-500">이메일</span>
        </label>
        <Input placeholder="@pusan.ac.kr" />
        <button className="rounded-lg border border-gray-300 p-3 px-4">인증코드 전송</button>

        <label />
        <Input placeholder="인증코드 입력" />
        <button className="rounded-lg border border-gray-300 p-3 px-4">확인</button>
        <Spacer />

        <label className="flex items-center gap-1">
          <span className="text-red-500">*</span>
          <span className="text-gray-500">비밀번호</span>
        </label>
        <PasswordInput value="" setValue={() => {}} />
        <div />

        <label className="flex items-center gap-1">
          <span className="text-red-500">*</span>
          <span className="text-gray-500">비밀번호 확인</span>
        </label>
        <PasswordInput value="" setValue={() => {}} placeholder="비밀번호 확인" />
        <div />
      </form>

      <div className="mt-12 flex gap-4">
        <button className="min-w-32 rounded-full border border-gray-200 p-3">취소</button>
        <button className="min-w-32 rounded-full bg-gray-200 p-3">가입</button>
      </div>
    </div>
  );
};
export default SignUpForm;

const Spacer = () => <div className="col-span-3 h-2" aria-hidden="true" />;
