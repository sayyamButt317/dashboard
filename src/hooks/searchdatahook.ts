
import { useMutation, useQuery } from '@tanstack/react-query';
import { deleteProducts, getProductById } from '@/http/api';
import { Product } from '@/types/productInterface';

const SearchProduct = (id:string) => {
return useQuery<Product[]>({
    queryKey: ['products', id],
    queryFn:()=> getProductById(id),
    staleTime: 10000,
    retry: 2,
  });
}

const editMutation = useMutation({
  mutationFn: (id:string) => editProducts(id),
  onSuccess: (apiData, updatedProduct) => {
    queryClient.setQueryData(['products'], (oldData: Product[] ) => {
      return oldData?.map((product) =>
          product._id === updatedProduct ? { ...product, ...apiData } : product
      );
    });
    // Refetch to ensure data is in sync
    queryClient.invalidateQueries(['products']);
  },
  onError: (error) => {
    console.error('Edit failed:', error);
    // Optionally, show an error message to the user
  }
});


const deleteMutation = useMutation({
  mutationFn: (id:string) => deleteProducts(id),
  onSuccess: (_data, id) => {
    //  update the cache
    queryClient.setQueryData(['products'], (oldData:Product[]) => {
      return oldData?.filter((product: Product) => product._id !== id)
    })
    // Refetch to ensure data is in sync
    queryClient.invalidateQueries(['products'])
  },
  onError: (error) => {
    // Handle any errors
    console.error('Delete failed:', error)
    // Optionally, show an error message to the user
  }
})
export default SearchProduct;