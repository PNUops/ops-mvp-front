export const mockLikeDetail = Array.from({ length: 20 }, (_, i) => ({
    rank: 20 - i,
    teamName: `Pnu ops ${i + 1}`,
    projectName: `Pnu ops 프로젝트 ${i + 1}`,
    likeCount: 2000 + 50 * i,
  }));