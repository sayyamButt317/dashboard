import { getProductById } from '@/http/api';
import { Product } from '@/types/productInterface';
import { useQuery } from "@tanstack/react-query"
const SearchProduct = (id:string) => {
return useQuery<Product,Error>({
    queryKey: ['products', id],
    queryFn:()=> getProductById(id),
    staleTime: 10000,
    retry: 2,
  });
}

export default SearchProduct;