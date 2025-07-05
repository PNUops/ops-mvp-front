import { useQuery } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import { getAllContests, postAllContests, deleteContest } from 'apis/contests';
import Input from '@components/Input';
import Button from '@components/Button';
import Table from '@components/Table';
import { ContestResponseDto } from 'types/DTO';
import { TeamListItemResponseDto } from 'types/DTO/teams/teamListDto';
import { getAllTeams, deleteTeams } from 'apis/teams';
import { IoIosArrowDown } from 'react-icons/io';
import { useToast } from 'hooks/useToast';

type HistoryProps = {
  contestName: string;
  handleContestName: (contestName_: string, contestId: number) => void;
};
const HistoryMenu = ({ contestName, handleContestName }: HistoryProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { data } = useQuery({ queryKey: ['contests'], queryFn: getAllContests });

  return (
    <div className="relative inline-block" onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
      <div className="hover:text-mainGreen flex pt-1 pb-4">
        <button className="">{contestName}</button>
        <IoIosArrowDown className="text-mainGreen text-2xl" />
      </div>

      {isOpen && data && (
        <ul className="border-subGreen absolute z-50 w-fit border-2 bg-white text-base font-normal text-nowrap">
          {data?.map((item) => (
            <li key={item.contestId}>
              <button
                onClick={() => handleContestName(item.contestName, item.contestId)}
                className="hover:text-mainGreen hover:bg-whiteGray block p-4 transition-colors duration-200 ease-in"
              >
                {item.contestName}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const ContestAdminTab = () => {
  const { data, refetch } = useQuery({
    queryKey: ['contests'],
    queryFn: getAllContests,
  });
  const [contestName, setContestName] = useState<string>('');
  const [currentContestName, setCurrentContest] = useState<string>('불러오는 중...');
  const [currentContestId, setCurrentContestId] = useState<number>(1);
  const [contestTeam, setContestTeam] = useState<TeamListItemResponseDto[]>([]);
  const toast = useToast();

  useEffect(() => {
    const fetchTeams = async () => {
      if (data && data[0]) {
        setCurrentContest(data[0].contestName);
        const teams = await getAllTeams(data[0].contestId);
        setContestTeam(teams);
      }
    };
    fetchTeams();
  }, [data]);

  const handleAddContest = async () => {
    if (contestName == '') {
      toast('대회명이 비어있습니다.', 'error');
      return;
    }
    try {
      await postAllContests(contestName);
      await refetch();
      setContestName('');
    } catch (error) {
      setContestName('');
    }
  };

  const handleDeleteContest = async (contestId: number) => {
    try {
      await deleteContest(contestId);
      console.log('delete');
      await refetch();
    } catch {}
  };

  const handleContestName = async (contestName: string, contestId: number) => {
    setCurrentContest(contestName);
    setCurrentContestId(contestId);
    const teams = await getAllTeams(contestId);
    setContestTeam(teams);
  };

  const handleDeleteTeams = async (teamId: number) => {
    try {
      await deleteTeams(teamId);
      const teams = await getAllTeams(currentContestId);
      setContestTeam(teams);
    } catch {
      console.log('error');
    }
  };

  return (
    <div className="max-w-container flex flex-col gap-12 px-4 py-8">
      <section className="mb-8 min-w-[350px]">
        <h2 className="mb-8 text-2xl font-bold">대회 목록</h2>
        <Table<ContestResponseDto>
          columns={[
            {
              label: '편집일시',
              width: '20%',
              key: 'updatedAt',
              render: (row) => row.updatedAt.replace('T', ' ').slice(0, 16),
            },
            { label: '대회명', width: '50%', key: 'contestName' },
          ]}
          rows={data ?? []}
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
        <div className="mb-8 flex">
          <h2 className="mr-16 text-2xl font-bold">대회별 프로젝트 목록</h2>
          <HistoryMenu contestName={currentContestName} handleContestName={handleContestName} />
        </div>

        <Table<TeamListItemResponseDto>
          columns={[
            { label: '순번', width: '10%', key: 'teamId' },
            { label: '팀명', width: '30%', key: 'teamName' },
            { label: '작품명', width: '30%', key: 'projectName' },
          ]}
          rows={contestTeam || []}
          actions={(row) => (
            <>
              <Button className="bg-mainRed h-[35px] w-full min-w-[70px]" onClick={() => handleDeleteTeams(row.teamId)}>
                삭제하기
              </Button>
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
