export interface ProjectDetailsEditDto {
  contestId: number;
  teamName: string;
  projectName: string;
  leaderName: string;
  overview: string;
  productionPath: string | null;
  githubPath: string;
  youTubePath: string;
}

export interface PreviewDeleteRequestDto {
  imageIds: number[];
}

export interface TeamMemberCreateRequestDto {
  teamMemberName: string;
}

export interface PreviewImage {
  id?: number;
  url: string;
}