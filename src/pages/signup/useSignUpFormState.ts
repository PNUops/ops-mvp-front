import { useState } from 'react';
import { isPNUEmail } from 'utils/email';
import { isValidPassword } from 'utils/password';

interface SignUpFormState {
  name: string;
  studentNumber: string;
  email: string;
  isEmailVerified: boolean;
  password: string;
  passwordConfirm: string;
}
type SignUpFormError = Partial<Record<keyof SignUpFormState, string>>;

const initialFormState: SignUpFormState = {
  name: '',
  studentNumber: '',
  email: '',
  isEmailVerified: false,
  password: '',
  passwordConfirm: '',
};

export const useSignUpFormState = () => {
  const [formState, setFormState] = useState(initialFormState);
  const [formError, setFormError] = useState<SignUpFormError>({});

  const updateField = <K extends keyof SignUpFormState>(key: K, value: SignUpFormState[K]) => {
    setFormState((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const getErrors = (): SignUpFormError => {
    const errors: SignUpFormError = {};
    if (!formState.name.trim()) errors.name = '이름을 입력해주세요.';
    if (!formState.studentNumber.trim()) errors.studentNumber = '학번을 입력해주세요.';
    if (!isPNUEmail(formState.email)) errors.email = '부산대학교 이메일(@pusan.ac.kr)이 아닙니다.';
    else if (!formState.isEmailVerified) errors.email = '이메일 인증이 필요합니다.';
    if (!isValidPassword(formState.password))
      errors.password = '8~16자, 영어, 숫자, 특수문자(@$!%*#?&~)를 포함하여야 합니다.';
    if (formState.password !== formState.passwordConfirm) errors.passwordConfirm = '비밀번호가 일치하지 않습니다.';
    return errors;
  };

  const validate = () => {
    const errors = getErrors();
    const isValid = Object.keys(errors).length === 0;
    setFormError(errors);
    return isValid;
  };

  return {
    formState,
    updateField,
    formError,
    validate,
  };
};
