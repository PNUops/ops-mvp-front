import { useEffect, useState } from 'react';
import EmailRow from './EmailRow';
import EmailVerifyRow from './EmailVerifyRow';

interface Props {
  email: string;
  setEmail: (value: string) => void;
  isEmailVerified: boolean;
  setIsEmailVerified: (value: boolean) => void;
}

const EmailBlock = ({ email, setEmail, isEmailVerified, setIsEmailVerified }: Props) => {
  const EMAIL_VERIFY_COOLDOWN_SEC = 300;
  const [isMailSent, setIsMailSent] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setInterval(() => {
      setCooldown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [cooldown]);

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
