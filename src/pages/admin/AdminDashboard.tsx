import React from 'react';
import ProjectSubmissionTable from 'components/ProjectSubmissionTable';
import VoteRate from 'components/PiChart';

const mockSubmissions = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  teamName: `Pnu ops ${i + 1}`,
  projectName: `Pnu ops`,
  isSubmitted: i % 5 !== 2, // 3개 정도 미제출로
  likes: 1000 + i,
}));
const sortedByLikes = [...mockSubmissions].sort((a, b) => b.likes - a.likes);

const pieData = [
  { name: '참여', value: 10 },
  { name: '미참여', value: 90 },
];
const pieColors = ['#22c55e', '#e5e7eb'];

const AdminDashboardContent = () => {
  return (
    <div className="max-w-container flex flex-col gap-12 p-8">
      {/* 프로젝트 등록현황 */}
      <ProjectSubmissionTable submissions={mockSubmissions} type="project" />

      {/* 좋아요 랭킹 */}
      <ProjectSubmissionTable submissions={sortedByLikes} type="vote" />

      {/* 투표 참여율 */}
      <VoteRate
        pieData={pieData}
        pieColors={pieColors}
        totalVotes={1000} // 총 투표수
        participationRate={pieData[0].value} // 참여율
      />
    </div>
  );
};

export default AdminDashboardContent;
