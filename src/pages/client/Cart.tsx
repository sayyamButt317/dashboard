"use client"

import { useShallow } from "zustand/shallow"
import { useCartStore } from "@/store/cartStore"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { RefreshCwIcon, Trash } from "lucide-react"

const Cart = () => {
  const { count, cart, addCart, removeCart } = useCartStore(
    useShallow((state) => ({
      count: state.count,
      cart: state.cart,
      addCart: state.addToCart,
      removeCart: state.removeFromCart,
    })),
  )

  const totalItems = count
  const totalPrice = cart.reduce((sum, product) => sum + product.price * product.quantity, 0)


  function refreshPage() {
    window.location.reload();
  }
  return (
    <div className="grid md:grid-cols-[1fr_300px] gap-8 max-w-6xl mx-auto px-4 md:px-6 py-12">
      <div className="grid gap-6">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold">Shopping Cart</h1>
          <Button size="icon" variant="outline" className="rounded-full">
            <RefreshCwIcon className="w-4 h-4" onClick={() => refreshPage()} />
            <span className="sr-only">Refresh</span>
          </Button>

        </div>
        <p className="text-gray-500 dark:text-gray-400">Review the items in your cart and proceed to checkout.</p>
        <div className="grid gap-4">
          <div className="grid gap-4 border rounded-lg overflow-hidden">
            <div className="grid grid-cols-[100px_1fr_100px] items-center gap-4 bg-gray-100 dark:bg-gray-800 px-4 py-3">
              <span className="font-medium">Product</span>
              <span className="font-medium">Price</span>
              <span className="font-medium text-right">Quantity</span>
            </div>

            {cart.map((product, index) => (
              <div
                key={index}
                className="grid grid-cols-[100px_1fr_100px] items-center gap-4 px-4 py-3 border-t dark:border-gray-700"
              >
                <img
                  src={product.picture?.secure_url || "/placeholder.svg"}
                  alt="Product Image"
                  width={100}
                  height={100}
                  className="rounded-md object-cover"
                  style={{ aspectRatio: "100/100", objectFit: "cover" }}
                />
                <div className="grid gap-1">
                  <h3 className="font-medium">${(product.price * product.quantity).toFixed(2)}</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">{product.productName}</p>
                </div>
                {/* Counter  */}
                <div className="flex items-center justify-end gap-2">
                  <button onClick={() => removeCart(product.id)}>-</button>
                  <p>{product.quantity}</p>
                  <button onClick={() => addCart(product)}>+</button>

                  {/* Remove product Button */}
                  <Button variant="destructive" onClick={() => removeCart(product.id)}>
                    <Trash className="h-4 w-4 mr-1" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <Separator />
            <div className="flex items-center justify-between font-medium text-lg">
              <span>TotalItems</span>
              <span>${totalItems}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Subtotal</span>
              <span className="font-medium">${totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Shipping</span>
              <span className="font-medium">$200.00</span>
            </div>
            <Separator />
            <div className="flex items-center justify-between font-medium text-lg">
              <span>Total</span>
              <span>${(totalPrice + 200).toFixed(2)}</span>
            </div>

          </CardContent>
          <CardFooter>
            <Button size="lg" className="w-full">
              Proceed to Checkout
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

export default Cart

