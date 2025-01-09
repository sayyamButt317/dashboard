import axios from "axios";
import { LoginResponse } from "@/types/authInterface";
import { Product } from "@/types/productInterface";
import useTokenStore from "@/store/tokenstore";

const api = axios.create({
  baseURL: "http://localhost:8000/",
  headers: {
    "Content-Type": "application/json",
  },
});


//to add token on frnt end request
api.interceptors.request.use((config) => {
  const token =useTokenStore.getState().token;
  if(token){
    config.headers!.Authorization = `Bearer ${token}`;
  }
  return config;
})

export const login = async (data: { email: string; password: string }) => {
  return await api.post("api/users/login", data);
};

export const register = async (data: {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}) => {
  return await api.post("api/users/register", data);
};

export const getProducts = async (): Promise<Product[]> => {
  const response =  await api.get<{ status: number; data: Product[] }>("api/products")
  return response.data.data;
};

export const createProduct = async (data: FormData) => await api.post("api/create", data,{
  headers: {
    'Content-Type': 'multipart/form-data'
  }
});

