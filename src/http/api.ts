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

export const login = async (data: { email: string; password: string }) => await api.post("api/users/login", data);


export const register = async (data: {firstname: string;lastname: string;email: string; password: string;
}) =>  await api.post("api/users/register", data);


<<<<<<< HEAD
export const getProducts = async (pageNumber:number): Promise<Product[]> => {
  const response =  await api.get<{ status: number; data: Product[] }>(`api/products?_start=${pageNumber}&_limit=3`)
=======
export const getProducts = async (): Promise<Product[]> => {
<<<<<<< HEAD
  const response =  await api.get<{ data: Product[] }>("api/products")
>>>>>>> 7a1b244 (update the fetch data function)
  return response.data.data;
=======
  const response = await api.get<{ products: Product[] }>("api/products");
  return response.data.products;
>>>>>>> a00d7c5 (optimize fetching data)
};

export const getProductById = async (id: string) => {
  const response = await api.get<Product>(`api/products/${id}`);
  return response.data;
};

export const createProduct = async (data: FormData) => await api.post("api/create", data,{
  headers: {
    'Content-Type': 'multipart/form-data'
  }
});
<<<<<<< HEAD
export const editProducts = async (id:string) =>{
  return await api.put(`api/edit/${id}`);
}

export const deleteProducts = async (id:string) =>{
  return await api.delete(`api/delete/${id}`);
}
=======
export const editProducts = async() => await api.put("api/edit");


export const deleteProducts = async(id:string) => await api.delete(`api/delete/${id}`);


export const fetchUsers = async(id:string) => await api.get(`api/products/${id}`)
>>>>>>> a00d7c5 (optimize fetching data)
