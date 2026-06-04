import { z } from "zod"

const registerCaptainSchema = z.object({
    firstname: z
        .string()
        .trim()
        .min(3, "Firstname must be at least 3 characters")
        .max(100, "Firstname cannot exceed 100 characters"),

    lastname: z
        .string()
        .trim()
        .max(100, "Lastname cannot exceed 100 characters")
        .optional(),

    email: z
        .string()
        .trim()
        .toLowerCase()
        .email("Invalid email address"),

    password: z
        .string()
        .min(6, "Password must be at least 6 characters"),

    color: z
        .string()
        .trim()
        .min(1, "Vehicle color is required")
        .max(50, "Color cannot exceed 50 characters"),

    plate: z
        .string()
        .trim()
        .min(1, "Vehicle plate is required")
        .max(20, "Plate number cannot exceed 20 characters"),

    capacity: z
        .number({
            required_error: "Capacity is required",
            invalid_type_error: "Capacity must be a number"
        })
        .int("Capacity must be an integer")
        .positive("Capacity must be greater than 0"),

    vehicle_type: z.enum(
        ["car", "bike", "auto"],
        {
            errorMap: () => ({
                message: "Vehicle type must be car, bike, or auto"
            })
        }
    )
})

const loginCaptainSchema = z.object({
    email: z
        .string()
        .trim()
        .toLowerCase()
        .email("Invalid email address"),

    password: z
        .string()
        .min(6, "Password length must e 6 character")
})

export {
    registerCaptainSchema,
    loginCaptainSchema
}