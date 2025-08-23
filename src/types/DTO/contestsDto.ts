export interface ContestResponseDto {
  contestId: number;
  contestName: string;
  updatedAt: Date;
}

export interface VoteTermDto {
  voteStartAt: string;
  voteEndAt: string;
}
