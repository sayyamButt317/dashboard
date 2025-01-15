import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
<<<<<<< HEAD
import {deleteProducts, editProducts, getProducts} from "@/http/api";
import {useMutation, useQuery,useQueryClient} from "@tanstack/react-query";
import { CirclePlus, MoreHorizontal } from "lucide-react";
import { Link } from "react-router-dom";
import { Product } from "@/types/productInterface";
import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationLink, PaginationEllipsis, PaginationNext } from "@/components/ui/pagination";




const Products = () => {
  const queryClient = useQueryClient();

  const productQuery = useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
    staleTime: 10000,
  });


<<<<<<< HEAD
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






=======
>>>>>>> 7a1b244 (update the fetch data function)
  const data: Product[] = productQuery.data || [];

  if (productQuery.isLoading) {
=======
import { deleteProducts, editProducts } from "@/http/api";
import { CirclePlus, MoreHorizontal } from "lucide-react";
import { Link } from "react-router-dom";
import useProducts from "@/hooks/fetchdatahook";
import SearchProduct from "@/hooks/searchdatahook";

const Products = () => {
  const { data: products, isLoading, error, } = useProducts();


  if (isLoading) {
>>>>>>> a00d7c5 (optimize fetching data)
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center text-red-500">
            Error:{" "}
            {Error instanceof Error
              ? Error.message
              : "An unknown error occurred"}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href={"/dashboard/home"}>Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Products</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <Link to={"/dashboard/products/create"}>
          <Button>
            <CirclePlus size={20} />
            <span className="ml-2">Add Products</span>
          </Button>
        </Link>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Products</CardTitle>
          <CardDescription>
            Manage your Products and view their sales performance.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {(products ?? []).length === 0 ? (
            <div className="text-center py-4">No products found.</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="hidden w-[100px] sm:table-cell">
                    <span className="sr-only">Image</span>
                  </TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Size</TableHead>
                  <TableHead>Gender</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Instock
                  </TableHead>
                  <TableHead className="hidden md:table-cell">
                    Created at
                  </TableHead>
                  <TableHead>
                    <span className="sr-only">Actions</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products?.map((product) => (
                  <TableRow key={product._id}>
                    <TableCell className="hidden sm:table-cell">
                      <img
                        alt={product.productName}
                        className="aspect-square rounded-md object-cover"
                        height="64"
                        // src={product.productImage}
                        width="64"
                      />
                    </TableCell>
                    <TableCell className="font-medium">
                      {product.productName}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{product.status}</Badge>
                    </TableCell>
                    <TableCell className="font-medium">
                      {product.category}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {product.price}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <Badge variant="outline">{product.size}</Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {product.gender}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <Badge variant="outline">{product.stock}</Badge>
                    </TableCell>

                    <TableCell>
                      {new Date(product.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            aria-haspopup="true"
                            size="icon"
                            variant="ghost"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Toggle menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => editMutation.mutate(id)}>Edit</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => deleteMutation.mutate(id)}>Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
        <CardFooter>
<<<<<<< HEAD
          <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive>
            2
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">3</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
=======
          <div className="text-xs text-muted-foreground">
            Showing <strong>1-{(products ?? []).length}</strong> of{" "}
            <strong>{(products ?? []).length}</strong> products
          </div>
>>>>>>> a00d7c5 (optimize fetching data)
        </CardFooter>
      </Card>
    </div>
  );
};

export default Products;
