import { z } from "zod"

const address = z
  .string()
  .trim()
  .min(3, "Address must be at least 3 characters")
  .max(300, "Address cannot exceed 300 characters");

export const addressCoordinatesSchema = z.object({
  address,
})

export const distanceTimeSchema = z.object({
  origin: address,
  destination: address,
})

export const routeSchema = z.object({
  pickup: address,
  destination: address,
})

export const suggestionSchema = z.object({
  input: z
    .string()
    .trim()
    .min(1, "Input is required")
    .max(200, "Input cannot exceed 200 characters"),
})

export default {
  addressCoordinatesSchema,
  distanceTimeSchema,
  routeSchema,
  suggestionSchema,
}