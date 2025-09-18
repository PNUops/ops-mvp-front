export interface ContestResponseDto {
  contestId: number;
  contestName: string;
  updatedAt: Date;
}

export interface VoteTermDto {
  voteStartAt: string;
  voteEndAt: string;
}

export interface PatchAwardRequestDto {
  awardName: string | null;
  awardColor: string | null;
}

export interface PatchCustomOrderRequestDto {
  contestId: number;
  teamOrders: { teamId: number; itemOrder: number }[];
}
