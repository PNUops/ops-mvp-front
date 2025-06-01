import axios from "axios";
import { useTokenStore } from "../stores/useTokenStore";
import apiClient from "./apiClient";

export const fetchAllTeams = async () => {
    const token = useTokenStore.getState().token;
    const headers = token ? {Authorization: `Bearer ${token}`} : {};

    const res = await axios.get("/teams", {headers});
    return res.data;
}

export const fetchSubmissionStatus = async () => {
    const res = await apiClient.get("/teams/submission-status");
    return res.data;
}