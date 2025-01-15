
import { useQuery } from '@tanstack/react-query';
import { getProductById } from '@/http/api';
import { Product } from '@/types/productInterface';

const SearchProduct = (id:string) => {
return useQuery<Product[]>({
    queryKey: ['products', id],
    queryFn:()=> getProductById(id),
    staleTime: 10000,
    retry: 2,
  });
}
export default SearchProduct;