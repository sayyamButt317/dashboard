import axios from "axios";
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

// Authentications
export const login = async (data: { email: string; password: string }) => await api.post("api/users/login", data);
export const register = async (data: {firstname: string;lastname: string;email: string; password: string;
}) =>  await api.post("api/users/register", data);


// Products
export const getProducts = async (): Promise<Product[]> => {
  const response = await api.get<{ products: Product[] }>("api/product");
  return response.data.products;
};
export const getProductById = async (id: string): Promise<Product> =>{
  const response = await api.get<{product:Product}>(`api/product/${id}`);
  return response.data.product;
};
export const createProduct = async (data: FormData) => await api.post("/api/product/create", data, {
      headers: {"Content-Type": "multipart/form-data",},})


export const editProducts = async(id:string) => await api.patch(`api/product/${id}/edit`);
export const deleteProducts = async(id:string) => await api.delete(`api/product/${id}/delete`);
export const fetchUsers = async(id:string) => await api.get(`api/user/${id}`)
