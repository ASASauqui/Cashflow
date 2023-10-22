import axios from "axios";
import { REACT_APP_API_URL } from "@env";

export const getMoves = async (token) => {
    return await axios.get(`${REACT_APP_API_URL}/moves`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
}

export const createMove = async (token, body) => {
    return await axios.post(`${REACT_APP_API_URL}/moves`, body, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
}

export const deleteMove = async (token, id) => {
    return await axios.delete(`${REACT_APP_API_URL}/moves/${id}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
}