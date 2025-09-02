
import {z} from "zod";

export const UserSchema = z.object({
    username: z.string()
            .min(3, "Minimum length of username is 3")
            .max(20, "Maximum length of username is 20"),
    email:z.string()
            .email("Please enter a valid email address"),
    password:z.string()
            .min(6, "Minimum length of password is 6")
            .max(20, "Maximum length of password is 20")
})

export type UserFormFieldType = z.infer<typeof UserSchema>