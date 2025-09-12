export interface DashboardTeamResponseDto {
  teamId: number;
  teamName: string;
  projectName: string;
  isSubmitted: boolean;
  displayOrder?: number;
  awardTitle?: string;
  awardBadgeColor?: string;
  awardBadgeSize?: string;
}
