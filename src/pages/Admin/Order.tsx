import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
function Order() {
  return (
    <>
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Orders</h1>
      </div>
      <div
        className="flex flex-1 items-center justify-center rounded-lg border-dashed shadow-sm"
        x-chunk="dashboard-02-chunk-1"
      >
        <div className="flex flex-col items-center gap-1 text-center">
          <h3 className="text-2xl font-bold tracking-tight">
            You have no Order yet!
          </h3>
          <p className="text-sm text-muted-foreground">
            You can start selling as soon as you add a product{" "}
          </p>
          <Button className="mt-4">Add Product</Button>
        </div>
      </div>
    </>
  );
}

export default Order;