import NameRow from './NameRow';
import StudentNumberRow from './StudentNumberRow';
import PasswordRow from './PasswordRow';
import PasswordConfirmRow from './PasswordConfirmRow';
import EmailBlock from './EmailBlock';
import { useSignUpFormState } from './useSignUpFormState';
import { useMutation } from '@tanstack/react-query';
import { patchEmailVerificationCode, postEmailVerification, postSignUp } from 'apis/signUp';
import { useNavigate } from 'react-router-dom';
import RoundedButton from '@components/RoundedButton';
import { useToast } from 'hooks/useToast';

const SignUpForm = () => {
  const { formState, updateField, formError, validate } = useSignUpFormState();
  const navigate = useNavigate();
  const toast = useToast();

  const mutation = useMutation({
    mutationFn: postSignUp,
    onSuccess: (data) => {
      toast(`회원가입이 완료되었어요.`, 'success');
      navigate('/signin'); // TODO: 회원가입 완료 시 자동 로그인
    },
    onError: (error: any) => {
      toast(`${error?.response.data.message}` || '회원가입에 실패했어요.', 'error');
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validate()) {
      mutation.mutate({
        name: formState.name,
        studentId: formState.studentNumber,
        email: formState.email,
        password: formState.password,
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid w-full grid-cols-[max-content_1fr_max-content] items-center gap-x-4 gap-y-6"
    >
      <NameRow value={formState.name} setValue={(val) => updateField('name', val)} error={formError.name} />
      <StudentNumberRow
        value={formState.studentNumber}
        setValue={(val) => updateField('studentNumber', val)}
        error={formError.studentNumber}
      />
      <Spacer />

      <EmailBlock
        email={formState.email}
        setEmail={(val) => updateField('email', val)}
        isEmailVerified={formState.isEmailVerified}
        setIsEmailVerified={(val) => updateField('isEmailVerified', val)}
        error={formError.email}
        emailVerificationMutationFn={postEmailVerification}
        emailVerificationCodeMutationFn={patchEmailVerificationCode}
      />
      <Spacer />

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

      <div className="col-span-3 mt-8 flex justify-end gap-4">
        <RoundedButton type="button" onClick={() => navigate(-1)}>
          취소
        </RoundedButton>
        <RoundedButton className="bg-lightGray" type="submit">
          가입
        </RoundedButton>
      </div>
    </form>
  );
};
export default SignUpForm;

const Spacer = () => <div className="col-span-3 h-2" aria-hidden="true" />;
