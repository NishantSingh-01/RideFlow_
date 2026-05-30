import { z } from "zod"

const registerSchema = z.object({
    firstname: z
        .string()
        .trim()
        .min(3, "Firstname must be at least 3 characters"),

    lastname: z
        .string()
        .trim()
        .optional(),

    email: z
        .string()
        .trim()
        .toLowerCase()
        .email("Invalid email address"),

    password: z
        .string()
        .min(6, "Password must be at least 6 characters"),

    role: z
        .enum(["rider", "driver", "admin"])
        .default("rider")
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