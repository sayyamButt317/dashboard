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
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import {  LoaderCircle } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { formSchema } from "@/schema/formSchema";
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
      // size: "",
      // gender: "",
      category: "",
      stock: "",
      status: "",
    },
  });

  // const coverImageRef = form.register("productImage");

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
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

  function onSubmit(values: z.infer<typeof formSchema>) {
    
    // ✅ This will be type-safe and validated.
    const formdata = new FormData();
    formdata.append("productTitle", values.productName);
    formdata.append("price", values.price);
    formdata.append("description", values.productDescription);
    formdata.append("discount", values.discountPercent);
    formdata.append("discountype", values.discountType);
    formdata.append("Category", values.category);
    formdata.append("amountInStock", values.stock);
    formdata.append("status", values.status);
    formdata.append("coverImage", values.productImage[0]);

    mutation.mutate(formdata);

    console.log(values);
  }

  return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex items-center justify-between">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/dashboard/home">Home</BreadcrumbLink>
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
            <div className="flex items-center gap-4">
              <Link to="/dashboard/books">
                <Button variant={"outline"}>
                  <span className="ml-2">Cancel</span>
                </Button>
              </Link>
              <Button type="submit" disabled={mutation.isPending}>
                {mutation.isPending && (
                  <LoaderCircle className="animate-spin" />
                )}
                <span className="ml-2">Submit</span>
              </Button>
            </div>
          </div>
          <Card>
            <CardContent className="p-6">
              <div className="space-y-6">
                <h2 className="text-xl font-semibold">General Information</h2>

                <div className="grid gap-6">
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
                          <div className="flex gap-4">
                            <Input
                              type="text"
                              className="w-16 h-16"
                              {...field}
                            />
                            <Input
                              type="text"
                              className="w-16 h-16"
                              {...field}
                            />
                            <Input
                              type="text"
                              className="w-16 h-16"
                              {...field}
                            />
                            <Input
                              type="text"
                              className="w-16 h-16"
                              {...field}
                            />
                            <Input
                              type="text"
                              className="w-16 h-16"
                              {...field}
                            />
                          </div>

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
                              className="flex gap-4"
                            >
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="men" id="men" />
                                <Label htmlFor="men">Men</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="women" id="women" />
                                <Label htmlFor="women">Women</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="unisex" id="unisex" />
                                <Label htmlFor="unisex">Unisex</Label>
                              </div>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <h2 className="text-xl font-semibold">Pricing And Stock</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="Price"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Base Pricing</FormLabel>
                          <FormControl>
                            <Input placeholder="$0.00" {...field} />
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
                            <Input type="number" placeholder="0" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="discount"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Discount</FormLabel>
                          <FormControl>
                            <Input placeholder="10%" {...field} />
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
                            <Input
                              placeholder="Chinese New Year Discount"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* <div className="space-y-6">
            <FormField
              control={form.control}
              name="coverImage"
              render={() => (
                <FormItem>
                  <FormLabel>Cover Image</FormLabel>
                  <FormControl>
                    <Input type="file" className="w-full" {...coverImageRef} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}

            {/* <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold">Upload Img</h2>
                  <div className="grid gap-4">
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

                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        className="hidden"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card> */}

            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold">Category</h2>
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
                  <Button variant="outline" className="w-full">
                    Add Category
                  </Button>
                </div>
              </CardContent>
            </Card>
          {/* </div> */}
        </form>
      </Form>
    
  );
};

export default Productform;
