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
        <th className="w-[5%] border-r border-b border-gray-300 p-2 text-left text-sm">
          {type === 'project' ? '순번' : '순위'}
        </th>
        <th className="w-[20%] border-r border-b border-gray-300 p-2 text-left text-sm">팀명</th>
        <th className="w-[55%] border-r border-b border-gray-300 p-2 text-left text-sm">작품명</th>
        <th className="w-[20%] border-b border-gray-300 p-2 text-sm">
          {type === 'project' ? '제출여부' : '좋아요 수'}
        </th>
      </tr>
    </thead>
  );
};

const getTrackBackgroundColor = (teamName: string) => {
  if (teamName.startsWith('A')) return 'bg-[#FCD63E]/50';
  if (teamName.startsWith('B')) return 'bg-[#36D659]/50';
  if (teamName.startsWith('C')) return 'bg-[#FFA962]/50';
  if (teamName.startsWith('D')) return 'bg-[#6DB7FF]/50';
  return 'bg-white';
};

const getTrack = (teamName: string): 'A' | 'B' | 'C' | 'D' | null => {
  const firstChar = teamName.charAt(0).toUpperCase();
  if (['A', 'B', 'C', 'D'].includes(firstChar)) {
    return firstChar as 'A' | 'B' | 'C' | 'D';
  }
  return null;
};

const groupByTrack = (submissions: Submission[]) => {
  const tracks: Record<'A' | 'B' | 'C' | 'D', Submission[]> = { A: [], B: [], C: [], D: [] };

  submissions.forEach((item) => {
    const track = getTrack(item.teamName);
    if (track) {
      tracks[track].push(item);
    }
  });

  // 각 분과별로 등수 재계산
  Object.keys(tracks).forEach((track) => {
    tracks[track as 'A' | 'B' | 'C' | 'D'] = tracks[track as 'A' | 'B' | 'C' | 'D'].map((item, idx) => ({
      ...item,
      rank: idx + 1,
    }));
  });

  return tracks;
};

const TableBody = ({ submissions, type }: Props) => {
  return (
    <tbody>
      {submissions.map((item: Submission, idx: number) => (
        <tr
          key={`${item.teamName}-${item.projectName}-${idx}`}
          className={type === 'vote' ? getTrackBackgroundColor(item.teamName) : ''}
        >
          {type === 'vote' && item.rank ? (
            <td className="w-[8%] border-r border-b border-gray-300 p-2 py-3 pl-4 text-sm">{item.rank}</td>
          ) : (
            <td className="w-[8%] border-r border-b border-gray-300 p-2 py-3 pl-4 text-sm">{idx + 1}</td>
          )}
          <td className="w-[20%] min-w-[80px] overflow-hidden border-r border-b border-gray-300 p-2 py-3 pl-4 text-sm text-ellipsis whitespace-nowrap">
            {item.teamName}
          </td>
          <td className="w-[50%] min-w-[80px] overflow-hidden border-r border-b border-gray-300 p-2 py-3 pl-4 text-sm text-ellipsis whitespace-nowrap">
            {item.projectName}
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

const ProjectSubmissionTable = ({ submissions, type }: Props) => {
  if (type === 'vote') {
    const trackGroups = groupByTrack(submissions);
    const trackNames: Record<'A' | 'B' | 'C' | 'D', string> = {
      A: 'A분과',
      B: 'B분과',
      C: 'C분과',
      D: 'D분과',
    };

    return (
      <section className="mb-8 min-w-[350px]">
        <h2 className="mb-8 text-2xl font-bold">좋아요 랭킹</h2>
        {(['A', 'B', 'C', 'D'] as const).map((track) => (
          <div key={track} className="mb-8 last:mb-0">
            <h3 className="mb-4 text-xl font-semibold">{trackNames[track]}</h3>
            <table className="w-full border-collapse bg-white">
              <TableHead type={type} />
              <TableBody submissions={trackGroups[track]} type={type} />
            </table>
          </div>
        ))}
      </section>
    );
  }

  return (
    <section className="mb-8 min-w-[350px]">
      <h2 className="mb-8 text-2xl font-bold">{type === 'project' ? '프로젝트 등록현황' : '좋아요 랭킹'}</h2>
      <table className="w-full border-collapse bg-white">
        <TableHead type={type} />
        <TableBody submissions={submissions} type={type} />
      </table>
    </section>
  );
};

export default ProjectSubmissionTable;
