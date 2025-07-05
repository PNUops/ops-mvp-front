export const mockTeamDetail = {
  teamId: 1,
  name: 'AI Revolution',
  description: 'AI 기반 자동화 시스템 개발 프로젝트',
  participants: ['참가자1', '참가자2', '참가자3'],
  filePath: ['/files/project1/design.pdf', '/files/project1/demo.mp4'],
  githubPath: 'https://github.com/example/ai-revolution',
  youtubePath: 'https://youtube.com/watch?v=abc123',
  isLiked: true,
  viewCount: 1523,
};

export const mockTeamsMain = [
  {
    teamId: 1,
    teamName: "team1",
    projectName: "team1 Project",
    isLiked: false,
    thumbnail: undefined,
  },
  {
    teamId: 2,
    teamName: "team2",
    projectName: "team2 Project",
    isLiked: true,
    thumbnail: undefined,
  },
  {
    teamId: 3,
    teamName: "PNU OPS",
    projectName: "OPs Bakery",
    isLiked: true,
    thumbnail: 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D',
  },
]

export const mockTeamLeaderMessage = {
  teamId: 1,
  teamName: "team1",
  projectName: "team1 Project",
  isSubmitted: false,
}

export const mockTeamsResponse = [
  {
    teamId: 1,
    teamName: 'team1',
    projectName: 'team1 Project',
    isLiked: false,
  },
  {
    teamId: 2,
    teamName: 'team2',
    projectName: 'team2 Project',
    isLiked: false,
  },
];