import { getProducts } from '@/http/api';
import { Product } from '@/types/productInterface';
import { useQuery } from '@tanstack/react-query';

 const useProducts = () => {
  return useQuery<Product[], Error>({
    queryKey: ['products'],
    queryFn: getProducts,
    staleTime: 10000,
    retry: 2,
  });
};



export default useProducts;