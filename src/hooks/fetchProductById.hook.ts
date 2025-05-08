import { getProductById } from "@/http/api"
import type { Product } from "@/types/productInterface"
import { useQuery } from "@tanstack/react-query"

const FetchProductById = (id: string) => {
  return useQuery<Product, Error>({
    queryKey: ["product", id],
    queryFn: () => getProductById(id),
    staleTime: 10000,
    retry: 2,
    enabled: !!id, // Only run the query if id is truthy
    
  })
}

export default FetchProductById

