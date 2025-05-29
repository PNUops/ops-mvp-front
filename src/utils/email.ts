export const isPNUEmail = (email: string): boolean => {
  const domain = '@pusan.ac.kr';
  return email.endsWith(domain);
};
