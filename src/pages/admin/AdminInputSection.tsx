import ContestMenu from '@components/ContestMenu';

import { ContestResponseDto } from 'types/DTO';

interface AdminInputSectionProps {
  contestId: number;
  contests: ContestResponseDto[];
  projectName: string;
  teamName: string;
}

const AdminInputSection = ({ contestId, contests, projectName, teamName }: AdminInputSectionProps) => {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-5 text-sm sm:flex-row sm:items-center sm:gap-10">
        <div className="text-midGray flex w-25 gap-1">
          <span className="mr-1 text-red-500">*</span>
          <span className="w-full">대회명</span>
        </div>
        <div className="flex flex-1 flex-col">
          <ContestMenu options={contests} selectedContestId={0} />
        </div>
      </div>
      <div className="h-10" />
      <div className="flex flex-col gap-5 text-sm sm:flex-row sm:items-center sm:gap-10">
        <div className="text-midGray flex w-25 gap-1">
          <span className="mr-1 text-red-500">*</span>
          <span className="w-full text-nowrap">프로젝트명</span>
        </div>
        <div className="flex flex-1 flex-col">
          <input
            type="text"
            value={projectName}
            placeholder="프로젝트 이름을 입력해주세요."
            className="placeholder-lightGray focus:ring-lightGray w-full truncate rounded bg-gray-100 px-5 py-3 text-sm text-black duration-300 ease-in-out focus:ring-1 focus:outline-none"
          />
        </div>
      </div>
      <div className="flex flex-col gap-5 text-sm sm:flex-row sm:items-center sm:gap-10">
        <div className="text-midGray flex w-25 gap-1">
          <span className="mr-1 text-red-500">*</span>
          <span className="w-full">팀명</span>
        </div>
        <div className="flex flex-1 flex-col">
          <input
            type="text"
            value={teamName}
            placeholder="팀 이름을 입력해주세요."
            className="placeholder-lightGray focus:ring-lightGray w-full truncate rounded bg-gray-100 px-5 py-3 text-sm text-black duration-300 ease-in-out focus:ring-1 focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
};

export default AdminInputSection;
