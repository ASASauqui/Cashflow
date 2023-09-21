import axios from "axios";
import { REACT_APP_API_URL, REACT_APP_API_KEY } from "@env";

export const register = async (body) => {
    return await axios.post(`${REACT_APP_API_URL}/users/register`, body, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${REACT_APP_API_KEY}`
        }
    });
}

export const login = async (body) => {
    return await axios.post(`${REACT_APP_API_URL}/users/login`, body, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${REACT_APP_API_KEY}`
        }
    });
}

export const checkToken = async (token) => {
    return await axios.get(`${REACT_APP_API_URL}/users/check-token`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
}