export interface ProjectDetailsEditDto {
  overview: string;
  githubPath: string;
  youTubePath: string;
}

export interface ThumbnailDeleteRequestDto {
  imageId: number;
}

export interface PreviewDeleteRequestDto {
  imageIds: number[];
}
