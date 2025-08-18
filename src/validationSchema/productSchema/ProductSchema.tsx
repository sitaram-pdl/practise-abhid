
import { z } from "zod";

export const productSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  price: z.number().min(0.01, "Price must be greater than 0"),
  description: z.string().min(4, "description must be at least 4 characters"),
  category: z.string().min(1, "Category is required"),
  image: z.string()
    .url("Invalid URL format")
    .or(z.literal("")), // Allows empty string
});

export type ProductFormDataType = z.infer<typeof productSchema>;
