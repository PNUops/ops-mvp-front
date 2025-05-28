import ProjectSubmissionTable from '@pages/admin/ProjectSubmissionTable';
import VoteRate from '@pages/admin/VoteRate';
import { mockDashboardDetail } from '@mocks/data/dashboard';
import { mockLikeDetail } from '@mocks/data/teamslike';
import { mockVoteRateDetail } from '@mocks/data/voterate';

const AdminPage = () => {
  const { mockDashboard } = mockDashboardDetail;
  const { mockLike } = mockLikeDetail;
  const { mockVoteRate, totalVoteCount } = mockVoteRateDetail;
  mockLike.sort((a, b) => a.rank - b.rank);
  return (
    <div className="max-w-container flex flex-col gap-12 p-8">
      <ProjectSubmissionTable submissions={mockDashboard} type="project" />

      <ProjectSubmissionTable submissions={mockLike} type="vote" />

      <VoteRate totalVotes={totalVoteCount} participationRate={mockVoteRate} />
    </div>
  );
};

export default AdminPage;
