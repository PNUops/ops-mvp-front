import { useState } from 'react';
import NameRow from './NameRow';
import StudentNumberRow from './StudentNumberRow';
import PasswordRow from './PasswordRow';
import PasswordConfirmRow from './PasswordConfirmRow';
import EmailBlock from './EmailBlock';

const SignUpForm = () => {
  const [name, setName] = useState('');
  const [studentNumber, setStudentNumber] = useState('');
  const [email, setEmail] = useState('');
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid w-full grid-cols-[max-content_1fr_max-content] items-center gap-x-4 gap-y-6"
    >
      <NameRow value={name} setValue={setName} />
      <StudentNumberRow value={studentNumber} setValue={setStudentNumber} />
      <Spacer />

      <EmailBlock
        email={email}
        setEmail={setEmail}
        isEmailVerified={isEmailVerified}
        setIsEmailVerified={setIsEmailVerified}
      />
      <Spacer />

      <PasswordRow value={password} setValue={setPassword} />
      <PasswordConfirmRow value={passwordConfirm} setValue={setPasswordConfirm} />

      <div className="col-span-3 mt-8 flex justify-end gap-4">
        <button className="border-lightGray w-32 rounded-full border p-3">취소</button>
        <button className="bg-lightGray w-32 rounded-full p-3">가입</button>
      </div>
    </form>
  );
};
export default SignUpForm;

const Spacer = () => <div className="col-span-3 h-2" aria-hidden="true" />;
