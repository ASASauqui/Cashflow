import axios from "axios";
import { REACT_APP_API_URL } from "@env";

export const getUserCashInfo = async (token) => {
    return await axios.get(`${REACT_APP_API_URL}/userCashInfo`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
}
