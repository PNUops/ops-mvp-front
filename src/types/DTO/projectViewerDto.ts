export interface TeamMember {
  teamMemberId: number;
  teamMemberName: string;
}

export interface ProjectDetailsResponseDto {
  contestId: number;
  contestName: string;
  teamId: number;
  leaderId: number;
  teamName: string;
  projectName: string;
  overview: string;
  leaderName: string;
  teamMembers: TeamMember[]; // WARN: 백엔드 측에서 필드명 바꿀 수도 있음 주의
  previewIds: number[];
  productionPath: string | null;
  githubPath: string;
  youtubePath: string;
  isLiked: boolean;
}

export interface PreviewImagesResponseDto {
  imageUrls: string[];
}

export interface CommentCreateRequestDto {
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

export interface LikeUpdateRequestDto {
  teamId: number;
  isLiked: boolean;
}
