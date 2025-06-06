import { useQuery } from '@tanstack/react-query';
import { getFindEmail } from 'apis/signIn';
import { useEffect, useState } from 'react';
import FindEmailForm from './FindEmailForm';
import FindEmailResult from './FindEmailResult';
import { FindEmailResponsetDto } from 'types/DTO';

const IdTab = () => {
  const [studentNumber, setStudentNumber] = useState('');

  const { data, refetch, isFetching, isError } = useQuery<FindEmailResponsetDto>({
    queryKey: ['findEmail', studentNumber],
    queryFn: () => getFindEmail({ studentId: studentNumber }),
    enabled: false,
  });

  const handleSubmit = () => {
    if (!studentNumber.trim()) return;
    refetch();
  };

  useEffect(() => {
    if (isError) alert('회원을 찾을 수 없습니다.');
  }, [isError]);

  if (data) return <FindEmailResult email={data.email} />;
  return (
    <FindEmailForm
      studentNumber={studentNumber}
      setStudentNumber={setStudentNumber}
      onSubmit={handleSubmit}
      isLoading={isFetching}
    />
  );
};
export default IdTab;
