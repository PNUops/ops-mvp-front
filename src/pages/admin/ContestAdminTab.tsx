import { useQuery } from '@tanstack/react-query';
import { getAllContests } from 'apis/contests';
import Input from '@components/Input';
import Button from '@components/Button';
import Table from '@components/Table';

const contestRows = [
  {
    id: 1,
    data: ['25.06.30 14:00', '제6회PNU창의융합SW해커톤'],
  },
  {
    id: 2,
    data: ['25.06.30 13:58', '제5회PNU창의융합SW해커톤'],
  },
];

const projectRows = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  data: [String(i + 1), '팀명', '작품명'],
}));

const ContestAdminTab = () => {
  const { data } = useQuery({ queryKey: ['contests'], queryFn: getAllContests });
  console.log(data);

  return (
    <div className="max-w-container flex flex-col gap-12 px-4 py-8">
      <section className="mb-8 min-w-[350px]">
        <h2 className="mb-8 text-2xl font-bold">대회 목록</h2>

        <Table
          columns={[
            { label: '편집일시', width: '20%' },
            { label: '대회명', width: '50%' },
          ]}
          rows={contestRows}
          actions={() => (
            <>
              <Button className="bg-mainRed h-[35px] w-full min-w-[70px]">삭제하기</Button>
              <Button className="bg-mainGreen h-[35px] w-full min-w-[70px]">수정하기</Button>
            </>
          )}
        />

        <div className="mt-8 flex w-full justify-between">
          <Input type="text" placeholder="대회명을 입력하세요." className="bg-whiteGray mx-4 h-12 w-[70%] rounded-lg" />
          <Button className="bg-mainBlue h-12 w-[20%] min-w-[130px]">대회 생성하기</Button>
        </div>
      </section>

      <section className="min-w-[350px]">
        <h2 className="mb-8 text-2xl font-bold">대회별 프로젝트 목록</h2>

        <Table
          columns={[
            { label: '순번', width: '10%' },
            { label: '팀명', width: '30%' },
            { label: '작품명', width: '30%' },
          ]}
          rows={projectRows}
          actions={() => (
            <>
              <Button className="bg-mainRed h-[35px] w-full min-w-[70px]">삭제하기</Button>
              <Button className="bg-mainGreen h-[35px] w-full min-w-[70px]">수정하기</Button>
            </>
          )}
        />

        <div className="mt-8 flex w-full flex-row-reverse">
          <Button className="bg-mainBlue h-12 w-[20%] min-w-[130px]">프로젝트 생성하기</Button>
        </div>
      </section>
    </div>
  );
};

export default ContestAdminTab;
