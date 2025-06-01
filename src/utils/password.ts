/**
 * 비밀번호 형식의 유효성을 검사하는 함수.
 * 8~16자, 영어, 숫자, 특수문자 포함
 * @param password
 * @returns boolean
 */
export const isValidPassword = (password: string) => {
  const lengthRegex = /^.{8,16}$/;
  const alphabetRegex = /[A-Za-z]/;
  const numberRegex = /[0-9]/;
  const specialCharRegex = /[^A-Za-z0-9]/;

  return (
    lengthRegex.test(password) &&
    alphabetRegex.test(password) &&
    numberRegex.test(password) &&
    specialCharRegex.test(password)
  );
};
