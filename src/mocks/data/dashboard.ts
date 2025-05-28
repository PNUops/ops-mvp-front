export const mockDashboardDetail = {
  mockDashboard: Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    teamName: `Pnu ops ${i + 1}`,
    projectName: `Pnu ops 프로젝트 ${i + 1}`,
    isSubmitted: i % 5 !== 2, // 3개 정도 미제출로
  })),
};
