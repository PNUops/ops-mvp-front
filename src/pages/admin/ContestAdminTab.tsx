import { useQuery } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import { getAllContests } from 'apis/contests';
import Input from '@components/Input';
import Button from '@components/Button';
import Table from '@components/Table';
import { postAllContests, deleteContest } from 'apis/contests';
import { ContestResponseDto } from 'types/DTO';

const ContestAdminTab = () => {
  const { data, refetch } = useQuery({ queryKey: ['contests'], queryFn: getAllContests });
  const [contestList, setContestList] = useState<ContestResponseDto[]>([]);
  const [contestName, setContestName] = useState<string>('');

  const handleAddContest = async () => {
    try {
      await postAllContests(contestName);
      await refetch();
      setContestName('');
    } catch (error) {
      console.log(error);
      setContestName('');
    }
  };

  const handleDeleteContest = async (contestId: number) => {
    try {
      await deleteContest(contestId);
      await refetch();
      console.log(contestId);
    } catch {}
  };

  useEffect(() => {
    if (data != undefined) {
      setContestList(data);
    }
  }, [data]);

  return (
    <div className="max-w-container flex flex-col gap-12 px-4 py-8">
      <section className="mb-8 min-w-[350px]">
        <h2 className="mb-8 text-2xl font-bold">대회 목록</h2>

        <Table
          columns={[
            { label: '편집일시', width: '20%' },
            { label: '대회명', width: '50%' },
          ]}
          rows={contestList ?? []}
          actions={(row) => (
            <>
              <Button
                className="bg-mainRed h-[35px] w-full min-w-[70px]"
                onClick={async () => {
                  await handleDeleteContest(row.contestId);
                }}
              >
                삭제하기
              </Button>
              <Button className="bg-mainGreen h-[35px] w-full min-w-[70px]">수정하기</Button>
            </>
          )}
        />

        <div className="mt-8 flex w-full justify-between">
          <Input
            type="text"
            value={contestName}
            onChange={(e) => setContestName(e.target.value)}
            placeholder="대회명을 입력하세요."
            className="bg-whiteGray mx-4 h-12 w-[70%] rounded-lg"
          />
          <Button className="bg-mainBlue h-12 w-[20%] min-w-[130px]" onClick={handleAddContest}>
            대회 생성하기
          </Button>
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
          rows={[]}
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
