import ContestMenu from './ContestMenu';

interface AdminEditSectionProps {
  contestId: number | null;
  setContestId: (id: number) => void;
  projectName: string;
  setProjectName: (projectName: string) => void;
  teamName: string;
  setTeamName: (teamName: string) => void;
  leaderName: string;
  setLeaderName: (teamName: string) => void;
}

const AdminEditSection = ({
  contestId,
  setContestId,
  projectName,
  setProjectName,
  teamName,
  setTeamName,
  leaderName,
  setLeaderName,
}: AdminEditSectionProps) => {
  return (
    <div className="flex flex-col gap-8 sm:gap-5">
      <div className="flex flex-col gap-5 text-sm sm:flex-row sm:items-center sm:gap-10">
        <div className="text-midGray flex w-25 gap-1">
          <span className="mr-1 text-red-500">*</span>
          <span className="w-full">대회명</span>
        </div>
        <div className="flex flex-1 flex-col">
          <ContestMenu value={contestId} onChange={setContestId} />
        </div>
      </div>
      <div className="flex flex-col gap-5 text-sm sm:flex-row sm:items-center sm:gap-10">
        <div className="text-midGray flex w-25 gap-1">
          <span className="mr-1 text-red-500">*</span>
          <span className="w-full text-nowrap">프로젝트명</span>
        </div>
        <div className="flex flex-1 flex-col">
          <input
            type="text"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
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
            onChange={(e) => setTeamName(e.target.value)}
            placeholder="팀 이름을 입력해주세요."
            className="placeholder-lightGray focus:ring-lightGray w-full truncate rounded bg-gray-100 px-5 py-3 text-sm text-black duration-300 ease-in-out focus:ring-1 focus:outline-none"
          />
        </div>
      </div>
      <div className="flex flex-col gap-5 text-sm sm:flex-row sm:items-center sm:gap-10">
        <div className="text-midGray flex w-25 gap-1">
          <span className="mr-1 text-red-500">*</span>
          <span className="w-full">팀장명</span>
        </div>
        <div className="flex flex-1 flex-col">
          <input
            type="text"
            value={leaderName}
            onChange={(e) => setLeaderName(e.target.value)}
            placeholder="팀장 이름을 입력해주세요."
            className="placeholder-lightGray focus:ring-lightGray w-full truncate rounded bg-gray-100 px-5 py-3 text-sm text-black duration-300 ease-in-out focus:ring-1 focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
};

export default AdminEditSection;
