export interface ProjectDetailsEditDto {
  githubPath: string;
  youtubePath: string;
  overview: string;
}

export interface ThumbnailUploadRequestDto {
  image: File;
}

export interface ThumbnailDeleteRequestDto {
  imageId: number;
}

export interface PreviewUploadRequestDto {
  images: File[];
}

export interface PreviewDeleteRequestDto {
  imageIds: number[];
}
