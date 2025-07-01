interface AdminInputSectionProps {
  contestId: number;
  projectName: string;
  teamName: string;
}

const AdminInputSection = ({ contestId, projectName, teamName }: AdminInputSectionProps) => {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-5 text-sm sm:flex-row sm:gap-10">
        <div className="text-midGray flex w-25 gap-1">
          <span className="mr-1 text-red-500">*</span>
          <span className="w-full">프로젝트명</span>
        </div>
        <div className="flex flex-1 flex-col">
          <input
            type="text"
            value={projectName}
            placeholder="프로젝트 이름을 입력해주세요."
            className="placeholder-lightGray ring-lightGray h-40 max-h-40 min-h-40 w-full resize-none overflow-auto rounded bg-gray-100 px-4 py-3 text-sm transition-all duration-300 ease-in-out focus-within:ring-1 focus:outline-none"
          />
        </div>
      </div>
      <div className="flex flex-col gap-5 text-sm sm:flex-row sm:gap-10">
        <div className="text-midGray flex w-25 gap-1">
          <span className="mr-1 text-red-500">*</span>
          <span className="w-full">팀명</span>
        </div>
        <div className="flex flex-1 flex-col">
          <input
            type="text"
            value={teamName}
            placeholder="팀 이름을 입력해주세요."
            className="placeholder-lightGray ring-lightGray h-40 max-h-40 min-h-40 w-full resize-none overflow-auto rounded bg-gray-100 px-4 py-3 text-sm transition-all duration-300 ease-in-out focus-within:ring-1 focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
};

export default AdminInputSection;
