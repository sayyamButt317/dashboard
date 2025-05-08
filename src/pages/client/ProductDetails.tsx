import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { HeartIcon, ShoppingCart } from "lucide-react"
import { Link, useParams } from "react-router-dom"
import FetchProductById from "@/hooks/fetchProductById.hook"
import { toast } from "@/hooks/use-toast"

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>()
  const { data: products, isLoading, error } = FetchProductById(id || "")
  

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>
  if (!products) return <div>Product not found</div>

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="overflow-hidden rounded-lg shadow-lg">
        <div className="flex flex-col lg:flex-row">
          <div className="relative w-full lg:w-1/2 h-[400px] lg:h-[800px]">
            <HeartIcon className="absolute top-4 right-4 w-6 h-6 text-yellow-50" onClick={() => {
              <HeartIcon className="absolute top-4 right-4 w-6 h-6 text-red"
              />
              toast({
                title: "Add to Favourite Sucessfully.",
                description: `Product has been added to the Favourite list.`,
              });

            }} />
            <img
              src={products.picture.secure_url || "/placeholder.svg"}
              alt={products.productName}
              width={600}
              height={1200}
              className="object-cover rounded-lg w-full h-full"
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className="w-full lg:w-1/2 p-6 lg:p-12 flex flex-col justify-between">
            <div>
              <h1 className="text-3xl lg:text-5xl font-bold mb-2">{products.productName}</h1>
                   <Button size="icon" variant="outline" className="rounded-full">
            <ShoppingCart className="w-4 h-4" />
            <span className="sr-only">Refresh</span>
          </Button>
              <p className="text-lg text-gray-600 mb-4">IV Treatment</p>
              <p className="text-2xl font-semibold text-[#323132] mb-6">${products.price.toFixed(2)}</p>
              <p className="text-gray-700 mb-6">{products.productDescription}</p>
            </div>

            <div className="font-sans text-gray-500">
              Pick Available Size
            </div>

            <div>

              <Button className="w-full lg:w-auto px-8 py-3 bg-[#323132] text-white hover:bg-[#716b70] transition-colors duration-300">
               <Link to={'/productdetail/${id}/payment'}>Buy Now</Link> 
              </Button>
              <p className="mt-4 text-sm font-semibold">*US locations only</p>
              <div className="mt-8">
                <h2 className="text-lg font-bold mb-2">Available:</h2>
                <p className="text-gray-700">Only {products.stock} left In Stock</p>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
export default ProductDetails

