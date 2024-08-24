import { z } from "zod"

export const userFormValidation = z.object({
    name: z.string()
        .min(6, "Name must be at least 6 characters.")
        .max(20, "Name must be at most 20 characters."),
    email: z.string().email("Invalid email address"),
    phone: z.string().refine((phone)=> /^\+?[1-9]\d{1,14}$/.test(phone), "Invalid Phone number")
  })