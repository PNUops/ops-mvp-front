export interface ProjectDetailsEditDto {
  overview: string;
  productionPath: string | null;
  githubPath: string;
  youTubePath: string;
}

export interface PreviewDeleteRequestDto {
  imageIds: number[];
}
