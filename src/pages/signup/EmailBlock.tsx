import EmailRow from './EmailRow';
import EmailVerifyRow from './EmailVerifyRow';

interface Props {
  email: string;
  setEmail: (value: string) => void;
  isEmailVerified: boolean;
  setIsEmailVerified: (value: boolean) => void;
}

const EmailBlock = ({ email, setEmail, isEmailVerified, setIsEmailVerified }: Props) => {
  return (
    <>
      <EmailRow value={email} setValue={setEmail} isEmailVerified={isEmailVerified} />
      <EmailVerifyRow email={email} isEmailVerified={isEmailVerified} setIsEmailVerified={setIsEmailVerified} />
    </>
  );
};
export default EmailBlock;
