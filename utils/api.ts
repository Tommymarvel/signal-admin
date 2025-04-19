import axios, { isAxiosError } from "axios";

const base_url = process.env.NEXT_PUBLIC_BASE_URL
export const axiosGet = async (endpoint:string, withAuth ?: boolean) => {
    try {
        let headers = {};

        if (withAuth) {
            // Request the token from the backend
            const tokenRes = await axios.get("/api/auth/auth-token", { withCredentials: true });
            const token = tokenRes.data.token;
    
            headers = {
                Authorization: `Bearer ${token}`,
            };
        }
        const res = await axios.get(`${base_url}${endpoint}`, { headers, timeout : 120000});
      
        return res.data;
    } catch (error) {
        if(isAxiosError(error)){
            console.error(error);
        }
        throw error
    }
};

export const axiosPost = async (endpoint:string, data?: object, withAuth ?: boolean) => {
    try {
        let headers = {};

        if (withAuth) {
            // Request the token from the backend
            const tokenRes = await axios.get("/api/auth/auth-token", { withCredentials: true });
            const token = tokenRes.data.token;

            headers = {
                Authorization: `Bearer ${token}`,
            };

        }
        const res = await axios.post(`${base_url}${endpoint}`,data,{ headers});
    
        return res;
            
    } catch (error) {
        if(isAxiosError(error)){
            console.log(error)
        }
        throw error
    }
    
};