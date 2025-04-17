import axios from "axios";

const base_url = process.env.NEXT_PUBLIC_BASE_URL
export const axiosGet = async (endpoint:string, withAuth ?: boolean) => {
    let headers = {};

    if (withAuth) {
        try {
        // Request the token from the backend
        const tokenRes = await axios.get("/api/auth/auth-token", { withCredentials: true });
        const token = tokenRes.data.token;

        headers = {
            Authorization: `Bearer ${token}`,
        };
        } catch (error) {
            console.error("Failed to retrieve auth token:", error);
            return error
        }
    }
    const res = await axios.get(`${base_url}${endpoint}`, { headers, withCredentials: withAuth });
  
    return res.data;
};

export const axiosPost = async (endpoint:string, data?: object, withAuth ?: boolean) => {
    let headers = {};

    if (withAuth) {
        try {
        // Request the token from the backend
        const tokenRes = await axios.get("/api/auth/auth-token", { withCredentials: true });
        const token = tokenRes.data.token;

        headers = {
            Authorization: `Bearer ${token}`,
        };
        } catch (error) {
        console.error("Failed to retrieve auth token:", error);
        }
    }
    const res = await axios.post(`${base_url}${endpoint}`,data,{ headers, withCredentials: withAuth });
  
    return res;
};