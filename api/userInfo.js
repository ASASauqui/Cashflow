import axios from "axios";
import { REACT_APP_API_URL } from "@env";

export const getUserInfo = async (token) => {
    return await axios.get(`${REACT_APP_API_URL}/userInfo`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
}

export const updateUserInfo = async (token, body) => {
    return await axios.put(`${REACT_APP_API_URL}/userInfo`, body, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
}

export const updatePassword = async (token, body) => {
    return await axios.put(`${REACT_APP_API_URL}/userInfo/password`, body, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
}