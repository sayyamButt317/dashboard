import { editProducts } from "@/http/api"
import { Product } from "@/types/productInterface";
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "react-router";
import { toast } from "./use-toast";


const EditProduct = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    // Update the cache with the new data from the API
    mutationFn: (id: string) => editProducts(id),
    onSuccess: (apiData, productId) => {
      // update the cache with the new data from the API.
      queryClient.setQueryData(['products'], (productsData: Product[]) => productsData?.map(
        (dbProductData) => dbProductData._id === productId ?
          { ...dbProductData, ...apiData } : dbProductData
      ));
      // Refetch to ensure data is in sync
      queryClient.invalidateQueries({ queryKey: ['products'] });
      navigate(`/dashboard/product/${productId}`);
    },
    onError: (error) => {
      console.error("Product failed to edited:", error);
      toast({
        title: "Product failed to edited. Please try again.",
        description: "There was a problem with your request.",
      });

    }
  });
}
export default EditProduct;