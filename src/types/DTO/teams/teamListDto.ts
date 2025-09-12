export interface TeamListItemResponseDto {
  teamId: number;
  teamName: string;
  projectName: string;
  isLiked: boolean;
  displayOrder: number | null;
  awardTitle: string | null;
  awardBadgeColor: string | null;
  awardBadgeSize: string | null;
}
