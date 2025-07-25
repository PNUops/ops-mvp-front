import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useToast } from 'hooks/useToast';
import { getAllContests } from 'apis/contests';
import { createProjectDetails } from 'apis/projectEditor';
import Input from '@components/Input';
import Button from '@components/Button';
import Table from '@components/Table';
import { ContestResponseDto } from 'types/DTO';
import { TeamListItemResponseDto } from 'types/DTO/teams/teamListDto';
import { IoIosArrowDown } from 'react-icons/io';
import EditModal from '@pages/admin/ContestsTab/EditModal';
import useContestAdmin from 'hooks/useContestAdmin';
import CommentConfirmModal from '@pages/project-viewer/CommentSection/CommentConfirmModal';
import dayjs from 'dayjs';

type HistoryMenuProps = {
  contestName: string;
  onContestChange: (contestName: string, contestId: number) => void;
};

const HistoryMenu = ({ contestName, onContestChange }: HistoryMenuProps) => {
  const { data: contests } = useQuery({ queryKey: ['contests'], queryFn: getAllContests });

  return (
    <div className="relative inline-block w-64">
      <select
        value={contestName}
        onChange={(e) => {
          const selectedContest = contests?.find((contest) => contest.contestName === e.target.value);
          if (selectedContest) {
            onContestChange(selectedContest.contestName, selectedContest.contestId);
          }
        }}
        className="border-subGreen cursor-pointer appearance-none rounded border-b-2 bg-white px-4 py-2 pr-10 text-nowrap focus:outline-none"
      >
        {contests?.map((contest: ContestResponseDto) => (
          <option key={contest.contestId} value={contest.contestName}>
            {contest.contestName}
          </option>
        ))}
      </select>
      <IoIosArrowDown className="text-mainGreen pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-lg" />
    </div>
  );
};

const ContestAdminTab = () => {
  const {
    state,
    contests,
    handleAddContest,
    handleContestChange,
    openDeleteModal,
    closeDeleteModal,
    openEditModal,
    closeEditModal,
    setContestName,
    deleteModal,
    handleDelete,
  } = useContestAdmin();
  const navigate = useNavigate();
  const toast = useToast();

  return (
    <>
      <CommentConfirmModal
        isOpen={state.isDeleteModalOpen}
        onConfirm={handleDelete}
        onCancel={closeDeleteModal}
        message={`삭제한 ${deleteModal.type == 'contest' ? '대회' : '팀'}은 복구할 수 없습니다.`}
      />
      <EditModal
        isOpen={state.isEditModalOpen}
        closeModal={closeEditModal}
        editId={state.editContestId}
        editContestName={state.editContestName}
      />

      <section className="mb-8 min-w-[350px]">
        <h2 className="mb-8 text-2xl font-bold">대회 목록</h2>
        <Table<ContestResponseDto>
          columns={[
            {
              header: '편집일시',
              width: '20%',
              key: 'updatedAt',
              render: (row) => dayjs(row.updatedAt).format('YYYY년 M월 D일 HH:mm'),
            },
            { header: '대회명', width: '50%', key: 'contestName' },
          ]}
          rows={contests ?? []}
          actions={(row) => (
            <>
              <Button className="bg-mainRed h-[35px] w-full" onClick={() => openDeleteModal('contest', row.contestId)}>
                삭제하기
              </Button>
              <Button
                className="bg-mainGreen h-[35px] w-full"
                onClick={() => openEditModal(row.contestId, row.contestName)}
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
        <div className="mb-8 flex flex-col md:flex-row">
          <h2 className="mr-16 text-2xl font-bold text-nowrap sm:mb-4">대회별 프로젝트 목록</h2>
          <HistoryMenu contestName={state.currentContestName} onContestChange={handleContestChange} />
        </div>
        <Table<TeamListItemResponseDto>
          columns={[
            { header: '순번', width: '10%', key: 'teamId' },
            {
              header: '팀명',
              width: '30%',
              key: 'teamName',
            },
            { header: '작품명', width: '30%', key: 'projectName' },
          ]}
          rows={state.contestTeams}
          actions={(row) => (
            <>
              <Button
                className="bg-mainRed h-[35px] w-full min-w-[70px]"
                onClick={() => openDeleteModal('team', row.teamId)}
              >
                삭제하기
              </Button>
              <Button
                onClick={() => navigate(`/teams/edit/${row.teamId}`)}
                className="bg-mainGreen h-[35px] w-full min-w-[70px]"
              >
                수정하기
              </Button>
            </>
          )}
        />

        <div className="mt-8 flex w-full flex-row-reverse">
          <Button
            onClick={() => {
              if (state.currentContestId === 1) {
                toast('현재 진행 중인 대회의 프로젝트를 생성할 수 없어요');
                if (contests?.length === 1) toast('대회 생성 후 프로젝트 생성해주세요');
                return;
              }
              navigate(`/admin/contest/create/${state.currentContestId}`);
            }}
            className="bg-mainBlue h-12 w-[20%] min-w-[160px]"
          >
            프로젝트 생성하기
          </Button>
        </div>
      </section>
    </>
  );
};

export default ContestAdminTab;
