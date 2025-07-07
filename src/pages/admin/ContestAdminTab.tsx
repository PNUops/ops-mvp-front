import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { getAllContests } from 'apis/contests';
import Input from '@components/Input';
import Button from '@components/Button';
import Table from '@components/Table';
import { ContestResponseDto } from 'types/DTO';
import { TeamListItemResponseDto } from 'types/DTO/teams/teamListDto';
import { IoIosArrowDown } from 'react-icons/io';
import DeleteInfoModal from '@pages/admin/DeleteInfoModal';
import EditModal from '@pages/admin/EditModal';
import useContestAdmin from 'hooks/useContestAdmin';
import { useNavigate } from 'react-router-dom';

type HistoryMenuProps = {
  contestName: string;
  onContestChange: (contestName: string, contestId: number) => void;
};

const HistoryMenu = ({ contestName, onContestChange }: HistoryMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: contests } = useQuery({ queryKey: ['contests'], queryFn: getAllContests });

  return (
    <div className="relative inline-block" onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
      <div className="hover:text-mainGreen flex pt-1 pb-4">
        <button>{contestName}</button>
        <IoIosArrowDown className="text-mainGreen text-2xl" />
      </div>

      {isOpen && contests && (
        <ul className="border-subGreen absolute z-50 w-fit border-2 bg-white text-base font-normal text-nowrap">
          {contests.map((contest) => (
            <li key={contest.contestId}>
              <button
                onClick={() => onContestChange(contest.contestName, contest.contestId)}
                className="hover:text-mainGreen hover:bg-whiteGray block w-full p-4 transition-colors duration-200 ease-in"
              >
                {contest.contestName}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const ContestAdminTab = () => {
  const {
    state,
    contests,
    handleAddContest,
    handleDeleteContest,
    handleContestChange,
    handleDeleteTeam,
    closeDeleteModal,
    openEditModal,
    closeEditModal,
    setContestName,
  } = useContestAdmin();
  const navigate = useNavigate();

  return (
    <div className="max-w-container flex flex-col gap-12 px-4 py-8">
      {state.isModalOpen && <DeleteInfoModal closeModal={closeDeleteModal} />}
      {state.isEditModalOpen && <EditModal closeModal={closeEditModal} editId={state.editContestId} />}

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
          rows={contests ?? []}
          actions={(row) => (
            <>
              <Button
                className="bg-mainRed h-[35px] w-full min-w-[70px]"
                onClick={() => handleDeleteContest(row.contestId)}
              >
                삭제하기
              </Button>
              <Button
                className="bg-mainGreen h-[35px] w-full min-w-[70px]"
                onClick={() => openEditModal(row.contestId)}
              >
                수정하기
              </Button>
            </>
          )}
        />

        <div className="mt-8 flex w-full justify-between">
          <Input
            type="text"
            value={state.contestName}
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
          <HistoryMenu contestName={state.currentContestName} onContestChange={handleContestChange} />
        </div>

        <Table<TeamListItemResponseDto>
          columns={[
            { label: '순번', width: '10%', key: 'teamId' },
            { label: '팀명', width: '30%', key: 'teamName' },
            { label: '작품명', width: '30%', key: 'projectName' },
          ]}
          rows={state.contestTeams}
          actions={(row) => (
            <>
              <Button className="bg-mainRed h-[35px] w-full min-w-[70px]" onClick={() => handleDeleteTeam(row.teamId)}>
                삭제하기
              </Button>
              <Button className="bg-mainGreen h-[35px] w-full min-w-[70px]">수정하기</Button>
            </>
          )}
        />

        <div className="mt-8 flex w-full flex-row-reverse">
          <Button
            className="bg-mainBlue h-12 w-[20%] min-w-[130px]"
            onClick={() => navigate(`/admin/contest/create/${state.currentContestId}`)}
          >
            프로젝트 생성하기
          </Button>
        </div>
      </section>
    </div>
  );
};

export default ContestAdminTab;
