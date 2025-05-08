import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "./use-toast";
import { useNavigate } from "react-router";
import { createProduct } from "@/http/api";

export function AddProductMutation() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Mutation hook to create a new product
  useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      //to remove cache and get new data from db
      queryClient.invalidateQueries({ queryKey: ["products"] });
      console.log("Producted created successfully");
      navigate("/dashboard/products");
      toast({
        title: "Product Created Sucessfully.",
        description: `Product has been added to the list.`,
      });
    },
    onError: (error) => {
      console.error("Product failed to added:", error);
      toast({
        title: "Product failed to added. Please try again.",
        description: "There was a problem with your request.",
      });
    },
  });
}
export default AddProductMutation;
