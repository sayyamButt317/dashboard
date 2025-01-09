import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
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
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { createProduct } from "@/http/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ImagePlus, LoaderCircle } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { FormSchema, formSchema } from "@/schema/formSchema";
import { toast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const Productform = () => {
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productName: "",
      price: "",
      productDescription: "",
      discountPercent: "",
      discountType: "",
      size: null,
      gender: null,
      category: "",
      stock: "",
      status: "",

    },
  });
  const productImageRef = form.register("productImage");

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      //to remove cache and get new data from db
      queryClient.invalidateQueries({ queryKey: ["products"] });
      console.log("Producted created successfully");
      toast({
        title: "Product Created Sucessfully.",
        description: `Product has been added to the list.`,
      });
      navigate("/dashboard/products");
    },
    onError: (error) => {
      console.error("Product failed to added:", error);
      toast({
        title: "Product failed to added. Please try again.",
        description: "There was a problem with your request.",
      });
    },
  });

  function onSubmit(values: FormSchema) {
    const formdata = new FormData();
    formdata.append("productTitle", values.productName);
    formdata.append("price", values.price);
    formdata.append("description", values.productDescription);
    // formdata.append("discountPercent", values.discountPercent);
    // formdata.append("discountType", values.discountType);
    formdata.append("category", values.category);
    formdata.append("size", values.size.join(','));
    formdata.append("amountInStock", values.stock);
    formdata.append("gender", values.gender);
    formdata.append("status", values.status);
    formdata.append("productImage", values.productImage[0]);

    mutation.mutate(formdata);

    console.log(values);
  }


  return (

    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard/home">
                Home
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard/products">
                Products
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Create</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="grid grid-cols-2 gap-8">
          {/* Left Column */}
          <div>
            {/* Card 1: General Information */}
            <div className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">General Information</h2>
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="productName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name Product</FormLabel>
                      <FormControl>
                        <Input type="text" className="w-full" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="productDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description Product</FormLabel>
                      <FormControl>
                        <Textarea className="min-h-32" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="size"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Size</FormLabel>
                        <div className="font-sans text-gray-500">
                          Pick Available Size
                        </div>
                        <FormControl>
                          <div className="flex gap-4">
                            <Input type="text" className="w-12 h-12"
                              {...field}
                            />
                            <Input type="text" className="w-12 h-12"
                              {...field}
                            />
                            <Input type="text" className="w-12 h-12"
                              {...field}
                            />
                            <Input type="text" className="w-12 h-12"
                              {...field}
                            />
                            <Input type="text" className="w-12 h-12"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>Gender</FormLabel>
                        <div className="font-sans text-gray-500">
                          Pick Available Gender
                        </div>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex gap-4">
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="men " id="men" />
                              <Label htmlFor="men">
                                Men
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="women" id="women" />
                              <Label htmlFor="women">Women</Label>
                            </div>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )
                    }
                  />
                </div>
              </div>
            </div>

            {/* Card 2: Pricing and Stock */}
            <div className="bg-white shadow-md rounded-lg p-6 mt-6">
              <h2 className="text-xl font-semibold mb-4">Pricing and Stock</h2>
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="$0.00" className="w-full" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="stock"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Stock</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="0" className="w-full" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="discountPercent"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Discount</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="10%" className="w-full" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="discountType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Discount Type</FormLabel>
                      <FormControl>
                        <Input type="text" placeholder="SALE!" className="w-full" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div>
            {/* Card 1: Category */}
            <div className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Category</h2>
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Category</FormLabel>
                    <FormControl>
                      <Input placeholder="Select category" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

            </div>

            {/* Card 2: Image Upload */}

            {/* <div className="bg-white shadow-md rounded-lg p-6 mt-6">
              <div className="text-xl font-semibold mb-4">Upload Image</div>
              <div className="border-2 border-dashed rounded-lg p-4 hover:border-primary/50 transition-color min-h-[300px] flex flex-col items-center justify-center gap-4 cursor-pointer">
                <div className="grid grid-cols-2 gap-4 w-full">
                  <img
                    key=""
                    src=""
                    alt=""
                    className="w-full h-32 object-cover rounded-lg"
                  />
                </div>
                <>
                  <ImagePlus className="w-8 h-8 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    Click to upload or drag and drop
                  </p>
                </>
                <FormControl>
                  
                <input
                id="productImage"
                  type="file"
                  multiple
                  accept="image/*"
                  className="hidden"
                  {...productImageRef}
                />
                </FormControl>
                
              </div>
            </div> */}

            <FormField
              control={form.control}
              name="productImage"
              render={() => (
                <FormItem>
                  <FormLabel>Product Image</FormLabel>
                  <FormControl>
                    <Input type="file" accept="image/*" {...productImageRef} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-4 mt-4">
              <Link to="/dashboard/products">
                <Button variant={"outline"}>
                  <span className="ml-2">
                    Cancel
                  </span>
                </Button>
              </Link>
              <Button type="submit"
                 disabled={mutation.isPending}
                 >
                   {mutation.isPending && <LoaderCircle className="animate-spin" />}
                <span className="ml-2">Submit
                </span>
              </Button>
            </div>
          </div>
        </div>

      </form>
    </Form>
  );
}
export default Productform;





