import Input from '@components/Input';
import PasswordInput from '@components/PasswordInput';

const SignUpForm = () => {
  return (
    <form className="grid w-full grid-cols-[max-content_1fr_max-content] items-center gap-x-4 gap-y-6">
      <label className="flex items-center gap-1">
        <span className="text-mainRed">*</span>
        <span className="text-midGray">이름</span>
      </label>
      <Input />
      <div />

      <label className="flex items-center gap-1">
        <span className="text-mainRed">*</span>
        <span className="text-midGray">학번</span>
      </label>
      <Input />
      <div />
      <Spacer />

      <label className="flex items-center gap-1">
        <span className="text-mainRed">*</span>
        <span className="text-midGray">이메일</span>
      </label>
      <Input placeholder="@pusan.ac.kr" />
      <button className="border-lightGray rounded-lg border p-3 px-4">인증코드 전송</button>

      <label />
      <Input placeholder="인증코드 입력" />
      <button className="border-lightGray rounded-lg border p-3 px-4">확인</button>
      <Spacer />

      <label className="flex items-center gap-1">
        <span className="text-mainRed">*</span>
        <span className="text-midGray">비밀번호</span>
      </label>
      <PasswordInput value="" setValue={() => {}} />
      <div />

      <label className="flex items-center gap-1">
        <span className="text-mainRed">*</span>
        <span className="text-midGray">비밀번호 확인</span>
      </label>
      <PasswordInput value="" setValue={() => {}} placeholder="비밀번호 확인" />
      <div />

      <div className="col-span-3 mt-8 flex justify-end gap-4">
        <button className="border-lightGray w-32 rounded-full border p-3">취소</button>
        <button className="bg-lightGray w-32 rounded-full p-3">가입</button>
      </div>
    </form>
  );
};
export default SignUpForm;

const Spacer = () => <div className="col-span-3 h-2" aria-hidden="true" />;
