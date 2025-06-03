/**
 * 입력 문자열이 부산대 이메일 형식인지 검사하는 함수
 * 부산대 이메일 형식은 @pusan.ac.kr로 끝나야 하며,
 * 영문자, 숫자, 언더스코어(_), 하이픈(-), 마침표(.)만 허용한다.
 * @param email 검사할 email
 * @returns 부산대 이메일 형식이면 true
 */
export const isPNUEmail = (email: string) => {
  return /^[\w.!-]+@pusan\.ac\.kr$/.test(email);
};
