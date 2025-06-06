export interface ProjectDetailsEditDto {
  overview: string;
  githubPath: string;
  youTubePath: string;
}

export interface PreviewDeleteRequestDto {
  imageIds: number[];
}
