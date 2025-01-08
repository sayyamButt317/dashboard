import { z } from "zod";

export const formSchema = z.object({
  productName: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  price: z.string().min(1, {
    message: "Price must be at least 1 characters.",
  }),
  productDescription: z.string().min(2, {
    message: "Description must be at least 2 characters.",
  }),
  discountPercent: z.string().optional(),
  discountType: z.string().optional(),
  category: z.string().min(1, {
    message: "Please select a category.",
  }),
  size: z.array(z.string()).min(1, {
    message: "Please select at least one size.",
  }),
  stock: z.string().min(1, {
    message: "Please enter stock amount.",
  }),
  gender: z.enum(["men", "women"], {
    required_error: "Please select a gender.",
  }),
  status: z.string().min(2, {
    message: "Status must be added.",
  }),
  productImage: z.instanceof(FileList).refine((file) => {
    return file.length == 1;
  }, " Image is required"),
});

export type FormSchema = z.infer<typeof formSchema>;
