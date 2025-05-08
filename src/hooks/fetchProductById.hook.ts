import { getProductById } from "@/http/api"
import { useQuery } from "@tanstack/react-query"

const FetchProductById = (productId: string) => {
  return useQuery({
    queryKey: ["product", productId],
    queryFn: () => getProductById(productId),
    staleTime: 10000,
    retry: 2,
    enabled: !!productId, 
  })
}

export default FetchProductById

