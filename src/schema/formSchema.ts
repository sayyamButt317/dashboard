import { z } from "zod";

export const formSchema = z.object({
  productName: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  productDescription: z.string().min(2, {
    message: "Description must be at least 2 characters.",
  }),

  price: z.string().min(1, {
    message: "Price must be at least 1 characters.",
  }),
  category: z.string().min(1, {
    message: "Please select a category.",
  }),
  stock: z.string().min(1, {
    message: "Please enter stock amount.",
  }),
  // discountPercent: z.string().optional(),
  // discountType: z.string().optional(),
  // size: z.array(z.string()).min(1, {
  //   message: "Please select at least one size.",
  // }),
  // gender: z.enum(["men", "women"], {
  //   required_error: "Please select a gender.",
  // }),
  // status: z.string().min(2, {
  //   message: "Status must be added.",
  // }),
  picture: z.instanceof(FileList).refine((files) => files.length > 0, "Image is required"),
})

export type FormSchema = z.infer<typeof formSchema>;




// picture: z
// .any()
// // To not allow empty files
// .refine((files) => files?.length >= 1, { message: "Image is required." })
// // To not allow files other than images
// .refine((files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type), {
//   message: ".jpg, .jpeg, .png and .webp files are accepted.",
// })
// // To not allow files larger than 5MB
// .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, {
//   message: `Max file size is 5MB.`,
// }),
// });