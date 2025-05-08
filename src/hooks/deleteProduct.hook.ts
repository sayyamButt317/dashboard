import { deleteProducts } from "@/http/api"
import { Product } from "@/types/productInterface";
import { useMutation, useQueryClient } from "@tanstack/react-query"

const DeleteProduct = () => {
    const queryClient = useQueryClient();
    // Mutation hook to delete a product by id
    return useMutation({
        // Update the cache with the new data from the API.
        mutationFn: (id: string) => deleteProducts(id),
        // Delete the product from the cache and database.
        onSuccess: (_, id) => {
            //  update the cache
            queryClient.setQueryData(['products'], (data: Product[]) => {
                return data.filter((product: Product) => product._id !== id)
            })
            // Refetch to ensure data is in sync
            queryClient.invalidateQueries({ queryKey: ['products'] })
        },
        onError: (error) => { console.error('Delete failed:', error) }
    })
}
export default DeleteProduct;