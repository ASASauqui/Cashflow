import axios from "axios";
import { REACT_APP_API_URL } from "@env";

export const getSave = async (token) => {
    return await axios.get(`${REACT_APP_API_URL}/saves`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
}

export const createSave = async (token, body) => {
    return await axios.post(`${REACT_APP_API_URL}/saves`, body, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
}

export const updateSave = async (token, body) => {
    return await axios.put(`${REACT_APP_API_URL}/saves`, body, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
}

export const deleteSave = async (token) => {
    return await axios.delete(`${REACT_APP_API_URL}/saves`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
}