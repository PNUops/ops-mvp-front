export interface ProjectDetailsResponseDto {
  teamId: number;
  leaderId: number;
  teamName: string;
  projectName: string;
  overview: string;
  leaderName: string;
  participants: string[];
  previewIds: number[];
  productionPath: string | null;
  githubPath: string;
  youtubePath: string;
  isLiked: boolean;
}

export interface PreviewImagesResponseDto {
  imageUrls: string[];
}

export interface CommentFormRequestDto {
  teamId: number;
  description: string;
}

export interface CommentsListRequestDto {
  teamId: number;
}

export interface CommentDto {
  commentId: number;
  description: string;
  memberId: number;
  memberName: string;
  teamId: number;
}

export interface CommentDeleteRequestDto {
  teamId: number;
  commentId: number;
}

export interface CommentEditRequestDto {
  teamId: number;
  commentId: number;
  description: string;
}

export interface CommentEditResponseDto {
  description: string;
}

export interface LikeRequestDto {
  teamId: number;
  isLiked: boolean;
}
