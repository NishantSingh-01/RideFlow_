import { z } from "zod"

const registerSchema = z.object({
    firstname: z
        .string()
        .min(3, "Firstname must be at least 3 characters"),

    lastname: z
        .string()
        .min(3, "Lastname must be at least 3 characters"),

    email: z
        .email("Invalid email address"),

    password: z
        .string()
        .min(6, "Password must be at least 6 characters"),

    role: z
        .enum(["user", "admin"])
        .default("user")
})

const loginSchema = z.object({
    email: z
        .email("Invalid email address"),

    password: z
        .string()
        .min(1, "Password is required")
})

export {
    registerSchema,
    loginSchema
}