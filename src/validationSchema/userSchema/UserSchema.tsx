
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
        //     .regex(/[!@#$%^&*(),.?":{}|<>]/, "At least one special character required")
            //     .regex(/[a-z]/, "At least one lowercase letter required")
            //     .regex(/[0-9]/, "At least one number required")
            //     .regex(/[A-Z]/, "At least one uppercase letter required")
})

export type UserFormFieldType = z.infer<typeof UserSchema>