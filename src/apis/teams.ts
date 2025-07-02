import { TeamListItemResponseDto } from "../types/DTO/teams/teamListDto";
import { SubmissionStatusResponseDto} from "../types/DTO/teams/submissionStatusDto";
import apiClient from "./apiClient";

export const getAllTeams = async (): Promise<TeamListItemResponseDto[]> => {
    const res = await apiClient.get("/teams");
    return res.data;
}

export const getSubmissionStatus = async (): Promise<SubmissionStatusResponseDto> => {
    const res = await apiClient.get("/teams/submission-status");
    return res.data;
}

export const getCurrentContestTeams = async (): Promise<TeamListItemResponseDto[]> => {
    const { data } = await apiClient.get('/contests/current');
    return data;
};

export const getTeamsByContestId = async (contestId: number): Promise<TeamListItemResponseDto[]> => {
    const { data } = await apiClient.get(`/contests/${contestId}`);
    return data;
};