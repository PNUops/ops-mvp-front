import axios from "axios";
import { useTokenStore } from "../stores/useTokenStore";

export const fetchAllTeams = async () => {
    const token = useTokenStore.getState().token;
    const headers = token ? {Authorization: `Bearer ${token}`} : {};

    const res = await axios.get("/teams", {headers});
    return res.data;
}