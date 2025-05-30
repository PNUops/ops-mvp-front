import { useState } from 'react';
import EmailRow from './EmailRow';
import EmailVerifyRow from './EmailVerifyRow';

interface Props {
  email: string;
  setEmail: (value: string) => void;
  isEmailVerified: boolean;
  setIsEmailVerified: (value: boolean) => void;
}

const EmailBlock = ({ email, setEmail, isEmailVerified, setIsEmailVerified }: Props) => {
  const [isMailSent, setIsMailSent] = useState(false);
  return (
    <>
      <EmailRow value={email} setValue={setEmail} isEmailVerified={isEmailVerified} setIsMailSent={setIsMailSent} />
      <EmailVerifyRow
        email={email}
        isEmailVerified={isEmailVerified}
        setIsEmailVerified={setIsEmailVerified}
        isMailSent={isMailSent}
      />
    </>
  );
};
export default EmailBlock;
