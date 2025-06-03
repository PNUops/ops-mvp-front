import { TeamListItemDto } from "../types/DTO/teamListDto";
import { SubmissionStatusDto} from "../types/DTO/submissionStatusDto";
import apiClient from "./apiClient";

export const getAllTeams = async (): Promise<TeamListItemDto[]> => {
    const res = await apiClient.get("/teams");
    return res.data;
}

export const getSubmissionStatus = async (): Promise<SubmissionStatusDto> => {
    const res = await apiClient.get("/teams/submission-status");
    return res.data;
}