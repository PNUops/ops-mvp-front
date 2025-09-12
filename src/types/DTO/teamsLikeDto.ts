export interface TeamLikeResponseDto {
  rank: number;
  teamName: string;
  projectName: string;
  likeCount: number;
  displayOrder?: number;
  awardTitle?: string;
  awardBadgeColor?: string;
  awardBadgeSize?: string;
}
