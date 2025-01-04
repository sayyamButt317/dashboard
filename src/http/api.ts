import axios from "axios";
import { LoginResponse } from "@/types/authInterface";
import { Product } from "@/types/productInterface";

const api = axios.create({
  baseURL: "http://localhost:8000/",
  headers: {
    "Content-Type": "application/json",
  },
});

export const login = async (data: { email: string; password: string }) => {
  return await api.post<LoginResponse>("api/users/login", data);
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



