
interface Submission {
  teamId?: number;
  rank?: number;
  teamName: string;
  projectName: string;
  isSubmitted?: boolean;
  likeCount?: number;
}

interface Props {
  submissions: Submission[];
  type: 'project' | 'vote';
}

const TableHead = ({ type }: { type: 'project' | 'vote' }) => {
  return (
    <thead className="bg-gray-100">
      <tr>
        <th className="w-[5%] border-r border-b border-gray-300 p-2 text-sm">{type === 'project' ? '순번' : '순위'}</th>
        <th className="w-[20%] border-r border-b border-gray-300 p-2 text-sm">팀명</th>
        <th className="w-[55%] border-r border-b border-gray-300 p-2 text-sm">작품명</th>
        <th className="w-[20%] border-b border-gray-300 p-2 text-sm">
          {type === 'project' ? '제출여부' : '좋아요 수'}
        </th>
      </tr>
    </thead>
  );
};

const TableBody = ({ submissions, type }: Props) => {
  return (
    <tbody>
      {submissions.map((item: Submission, idx: number) => (
        <tr key={item.teamId} className="">
          <td className="w-[10%] border-r border-b border-gray-300 p-2 py-3 pl-4 text-sm">{idx + 1}</td>
          <td className="w-[20%] border-r border-b border-gray-300 p-2 py-3 pl-4 text-sm">{item.teamName}</td>
          <td className="w-[50%] border-r border-b border-gray-300 p-2 py-3 pl-4 text-sm">{item.projectName}</td>
          {type === 'vote' ? (
            <td className="w-[20%] border-b border-gray-300 p-2 py-3 pl-4 text-sm">
              <div className="inline-flex items-center gap-1">
                <span className="min-w-[50px]">좋아요</span>
                <span className="font-bold">{item.likeCount?.toLocaleString()}</span>
                <span>개</span>
              </div>
            </td>
          ) : (
            <td className="w-[20%] border-b border-gray-300 p-2 py-3 pl-4 text-sm">
              <div
                className={`flex h-[35px] w-[80px] items-center justify-center rounded-md text-center ${
                  item.isSubmitted ? 'bg-mainBlue' : 'bg-mainRed'
                } px-2 py-[4px] text-sm text-white`}
              >
                {item.isSubmitted ? '제출완료' : '미제출'}
              </div>
            </td>
          )}
        </tr>
      ))}
    </tbody>
  );
};

const ProjectSubmissionTable = ({ submissions, type }: Props) => {
  return (
    <section className="mb-8">
      <h2 className="mb-8 text-2xl font-bold">{type === 'project' ? '프로젝트 등록현황' : '좋아요 랭킹'}</h2>
      <table className="w-full border-collapse bg-white">
        <TableHead type={type} />
        <TableBody submissions={submissions} type={type} />
      </table>
    </section>
  );
};

export default ProjectSubmissionTable;

