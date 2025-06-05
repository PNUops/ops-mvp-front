import RoundedButton from '@components/RoundedButton';
import EmailBlock from '@pages/signup/EmailBlock';
import { useFindPasswordFormState } from './useFindPasswordFormState';
import {
  patchEmailVerificationCodePasswordReset,
  patchPasswordReset,
  postEmailVerificationPasswordReset,
} from 'apis/signIn';
import { useMutation } from '@tanstack/react-query';
import PasswordRow from '@pages/signup/PasswordRow';
import PasswordConfirmRow from '@pages/signup/PasswordConfirmRow';
import { useNavigate } from 'react-router-dom';

const PasswordTab = () => {
  const { formState, updateField, formError, validate } = useFindPasswordFormState();

  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: patchPasswordReset,
    onSuccess: (data) => {
      alert(`비밀번호 변경이 완료되었어요.`);
      navigate('/signin');
    },
    onError: (error) => {
      alert(`비밀번호 변경에 실패했어요. ${error.message}`);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validate()) {
      mutation.mutate({
        email: formState.email,
        newPassword: formState.password,
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid w-full grid-cols-[max-content_1fr_max-content] items-center gap-x-4 gap-y-6"
    >
      <EmailBlock
        email={formState.email}
        setEmail={(val) => updateField('email', val)}
        isEmailVerified={formState.isEmailVerified}
        setIsEmailVerified={(val) => updateField('isEmailVerified', val)}
        error={formError.email}
        emailVerificationMutationFn={postEmailVerificationPasswordReset}
        emailVerificationCodeMutationFn={patchEmailVerificationCodePasswordReset}
      />

      <PasswordRow
        value={formState.password}
        setValue={(val) => updateField('password', val)}
        error={formError.password}
      />
      <PasswordConfirmRow
        value={formState.passwordConfirm}
        setValue={(val) => updateField('passwordConfirm', val)}
        error={formError.passwordConfirm}
      />

      <div className="col-span-3 mt-8 flex justify-center gap-4">
        <RoundedButton type="submit">비밀번호 변경</RoundedButton>
      </div>
    </form>
  );
};
export default PasswordTab;

const Spacer = () => <div className="col-span-3 h-2" aria-hidden="true" />;
