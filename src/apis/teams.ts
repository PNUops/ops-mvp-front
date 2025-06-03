import axios from "axios";
import { useTokenStore } from "../stores/useTokenStore";
import apiClient from "./apiClient";

export const fetchAllTeams = async () => {
    const res = await apiClient.get("/teams");
    return res.data;
}

export const fetchSubmissionStatus = async () => {
    const res = await apiClient.get("/teams/submission-status");
    return res.data;
}