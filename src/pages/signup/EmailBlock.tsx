import { useEffect, useState } from 'react';
import EmailRow from './EmailRow';
import EmailVerifyRow from './EmailVerifyRow';
import { error } from 'console';

interface Props {
  email: string;
  setEmail: (value: string) => void;
  isEmailVerified: boolean;
  setIsEmailVerified: (value: boolean) => void;
  error?: string;
}

const EmailBlock = ({ email, setEmail, isEmailVerified, setIsEmailVerified, error }: Props) => {
  const EMAIL_VERIFY_COOLDOWN_SEC = 300;
  const [isMailSent, setIsMailSent] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setInterval(() => {
      setCooldown((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [cooldown > 0]);

  const startCooldown = () => {
    setCooldown(EMAIL_VERIFY_COOLDOWN_SEC);
  };
  const stopCooldown = () => {
    setCooldown(0);
  };
  return (
    <>
      <EmailRow
        email={email}
        setEmail={setEmail}
        isEmailVerified={isEmailVerified}
        setIsMailSent={setIsMailSent}
        startCooldown={startCooldown}
        error={error}
      />
      <EmailVerifyRow
        email={email}
        isEmailVerified={isEmailVerified}
        setIsEmailVerified={setIsEmailVerified}
        isMailSent={isMailSent}
        cooldown={cooldown}
        stopCooldown={stopCooldown}
      />
    </>
  );
};
export default EmailBlock;
