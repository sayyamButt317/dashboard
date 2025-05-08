import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import useProducts from "@/hooks/fetchdata.hook"
import { HeartIcon, ShoppingCart } from "lucide-react"
import { useCartStore } from "@/store/cartStore"
import { Link } from "react-router-dom"
import { Skeleton } from "@/components/ui/skeleton"

const LandingPage = () => {
  const { data: products, isLoading, error } = useProducts()
  const addCart = useCartStore((state) => state.addToCart)

  if (error) return <div>Error: {error.message}</div>

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {isLoading
        ? // Skeleton loading
        Array.from({ length: 8 }).map((_, index) => (
          <Card key={index} className="w-[300px] space-y-4">
            <Skeleton className="h-[300px] w-full rounded-lg" />
            <CardContent className="px-4 py-0">
              <div className="flex justify-between">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[150px]" />
                  <Skeleton className="h-3 w-[200px]" />
                  <Skeleton className="h-4 w-[100px]" />
                </div>
                <Skeleton className="h-6 w-16 rounded-full" />
              </div>
            </CardContent>
            <CardFooter className="p-0 border-t">
              <Skeleton className="h-10 w-full" />
            </CardFooter>
            <Skeleton className="h-10 w-full" />
          </Card>
        ))
        : products?.map((product) => (
          <Card key={product._id} className="w-[300px] group relative space-y-4 overflow-hidden">
            <figure className="group-hover:opacity-90 relative">
              <Button
                variant="ghost"
                size="icon"
                className="bg-white/70 absolute top-3 right-3 rounded-full dark:text-black z-10"
              >
                <HeartIcon className="h-4 w-4" />
              </Button>
              <Link to={`/productdetail/${product._id}`}>
                <img
                  className="aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-7/8"
                  src={product.picture.secure_url || "/placeholder.svg"}
                  width={300}
                  height={300}
                  alt={product.productName}
                />
              </Link>
            </figure>
            <CardContent className="px-4 py-0">
              <div className="flex justify-between">
                <div>
                  <h3 className="mt-1 text-lg font-medium text-gray-900">
                    {product.productName.length > 20 ? `${product.productName.slice(0, 20)}...` : product.productName}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {product.productDescription.length > 50
                      ? `${product.productDescription.slice(0, 50)}...`
                      : product.productDescription}
                  </p>
                  <h2 className="mt-1 text-lg font-medium text-gray-900">Rs:{product.price}</h2>
                </div>
                <div>
                  <p className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground">
                    InStock
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="p-0 border-t">
              <Button
                variant="ghost"
                className="w-full"
                onClick={() => addCart({ ...product, id: product._id, price: product.price, quantity: 1, picture: { secure_url: product.picture.secure_url } })}
              >
                <ShoppingCart className="h-4 w-4 mr-1" /> Add to Cart
              </Button>
              <Link
                to="/Cart"
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
              >
                Buy Now
              </Link>
            </CardFooter>
            {/* <Button variant="ghost" className="w-full" >
              <Link to={`/productdetail/${product._id}`}>Details</Link>
            </Button> */}
          </Card>
        ))}
    </div>
  )
}

export default LandingPage

