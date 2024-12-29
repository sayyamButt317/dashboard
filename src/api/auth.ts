import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000",
  headers: {
    "Content-Type": "application/json",
  },
});

export const login = async (
    data: { 
        email: string; 
        password: string 
    }) => {
  return await api.post("api/users/login", data);
};

export const register = async(data:{firstname: string; lastname: string; email: string; password: string}) => {
    return await api.post('api/users/register', data);
};