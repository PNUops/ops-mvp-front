import AwardBadge from '../../components/AwardBadge';

interface Submission {
  teamId?: number;
  rank?: number;
  teamName: string;
  projectName: string;
  isSubmitted?: boolean;
  likeCount?: number;
  displayOrder?: number;
  awardTitle?: string;
  awardBadgeColor?: string;
  awardBadgeSize?: string;
}

interface Props {
  submissions: Submission[];
  type: 'project' | 'vote';
  onDisplayOrderChange?: (teamId: number, order: number) => void;
  isEditMode?: boolean;
}

const TableHead = ({ type }: { type: 'project' | 'vote' }) => {
  return (
    <thead className="bg-gray-100">
      <tr>
        <th className="w-[5%] border-r border-b border-gray-300 p-2 text-left text-sm">
          {type === 'project' ? '순번' : '순위'}
        </th>
        <th className="w-[20%] border-r border-b border-gray-300 p-2 text-left text-sm">팀명</th>
        <th className="w-[35%] border-r border-b border-gray-300 p-2 text-left text-sm">작품명</th>
        <th className="w-[20%] border-r border-b border-gray-300 p-2 text-left text-sm">수상</th>
        <th className="w-[20%] border-b border-gray-300 p-2 text-sm">
          {type === 'project' ? '제출여부' : '좋아요 수'}
        </th>
      </tr>
    </thead>
  );
};

const TableBody = ({ submissions, type, onDisplayOrderChange, isEditMode }: Props) => {
  return (
    <tbody>
      {submissions.map((item: Submission, idx: number) => (
        <tr key={`${item.teamName}-${item.projectName}-${idx}`} className="">
          {type === 'vote' && item.rank ? (
            <td className="w-[8%] border-r border-b border-gray-300 p-2 py-3 pl-4 text-sm">{item.rank}</td>
          ) : isEditMode && item.teamId && onDisplayOrderChange ? (
            <td className="w-[8%] border-r border-b border-gray-300 p-2 py-3 pl-4 text-sm">
              <input
                type="number"
                value={item.displayOrder || ''}
                onChange={(e) => onDisplayOrderChange(item.teamId!, parseInt(e.target.value))}
                className="w-16 px-2 py-1 border rounded text-center"
                min="1"
              />
            </td>
          ) : (
            <td className="w-[8%] border-r border-b border-gray-300 p-2 py-3 pl-4 text-sm">
              {item.displayOrder || ''}
            </td>
          )}
          <td className="w-[20%] min-w-[80px] overflow-hidden border-r border-b border-gray-300 p-2 py-3 pl-4 text-sm text-ellipsis whitespace-nowrap">
            {item.teamName}
          </td>
          <td className="w-[35%] min-w-[80px] overflow-hidden border-r border-b border-gray-300 p-2 py-3 pl-4 text-sm text-ellipsis whitespace-nowrap">
            {item.projectName}
          </td>
          <td className="w-[20%] border-r border-b border-gray-300 p-2 py-3 pl-4 text-sm">
            {item.awardTitle && (
              <AwardBadge
                title={item.awardTitle}
                color={item.awardBadgeColor}
                size={item.awardBadgeSize as 'small' | 'medium' | 'large'}
              />
            )}
          </td>
          {type === 'vote' ? (
            <td className="w-[20%] border-b border-gray-300 p-2 py-3 pl-4 text-sm">
              <div className="inline-flex items-center gap-1">
                <span className="min-w-[50px]">좋아요</span>
                <span className="font-bold">{item.likeCount?.toLocaleString()}</span>
                <span>개</span>
              </div>
            </td>
          ) : (
            <td className="w-[20%] min-w-[110px] border-b border-gray-300 p-2 py-3 pl-4 text-sm">
              <div
                className={`flex h-[35px] w-[100%] items-center justify-center rounded-md text-center ${
                  item.isSubmitted ? 'bg-mainBlue' : 'bg-mainRed'
                } text-exsm px-2 py-[4px] text-white`}
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

const ProjectSubmissionTable = ({ submissions, type, onDisplayOrderChange, isEditMode }: Props) => {
  return (
    <section className="mb-8 min-w-[350px]">
      <h2 className="mb-8 text-2xl font-bold">{type === 'project' ? '프로젝트 등록현황' : '좋아요 랭킹'}</h2>
      <table className="w-full border-collapse bg-white">
        <TableHead type={type} />
        <TableBody 
          submissions={submissions} 
          type={type} 
          onDisplayOrderChange={onDisplayOrderChange}
          isEditMode={isEditMode}
        />
      </table>
    </section>
  );
};

export default ProjectSubmissionTable;
