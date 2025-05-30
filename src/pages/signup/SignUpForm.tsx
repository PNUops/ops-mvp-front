import { useState } from 'react';
import NameRow from './NameRow';
import StudentNumberRow from './StudentNumberRow';
import PasswordRow from './PasswordRow';
import PasswordConfirmRow from './PasswordConfirmRow';
import EmailBlock from './EmailBlock';
import { useSignUpFormState } from './useSignUpFormState';

const SignUpForm = () => {
  const { formState, updateField, formError, validate } = useSignUpFormState();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validate()) {
      // TODO: 회원가입 api 호출
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid w-full grid-cols-[max-content_1fr_max-content] items-center gap-x-4 gap-y-6"
    >
      <NameRow value={formState.name} setValue={(val) => updateField('name', val)} />
      <StudentNumberRow value={formState.studentNumber} setValue={(val) => updateField('studentNumber', val)} />
      <Spacer />

      <EmailBlock
        email={formState.email}
        setEmail={(val) => updateField('email', val)}
        isEmailVerified={formState.isEmailVerified}
        setIsEmailVerified={(val) => updateField('isEmailVerified', val)}
      />
      <Spacer />

      <PasswordRow value={formState.password} setValue={(val) => updateField('password', val)} />
      <PasswordConfirmRow value={formState.passwordConfirm} setValue={(val) => updateField('passwordConfirm', val)} />

      <div className="col-span-3 mt-8 flex justify-end gap-4">
        <button className="border-lightGray w-32 rounded-full border p-3">취소</button>
        <button className="bg-lightGray w-32 rounded-full p-3">가입</button>
      </div>
    </form>
  );
};
export default SignUpForm;

const Spacer = () => <div className="col-span-3 h-2" aria-hidden="true" />;
