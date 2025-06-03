export interface VoteRate {
  voteRate: number;
  totalVoteCount: number;
}

export interface GetVoteRateResponse {
  voteRate: VoteRate;
} 