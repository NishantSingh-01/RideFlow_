import bcrypt from "bcrypt"
import ApiError from "../utils/apierror.js"
import { generateToken } from "../utils/JWT.js"
import { pool } from "../config/db.js"
import { createCaptain, findCaptainByEmail } from "../repositories/captain.repositories.js"


export const register = async (data) => {
    const user = await findCaptainByEmail(data.email)
    if (user) {
        throw new ApiError(409, "Email already exists")
    }
    const hashedPassword = await bcrypt.hash(data.password, 10)
    const newUser = await createCaptain(
        data.firstname,
        data.lastname,
        data.email,
        hashedPassword,
        data.color,
        data.plate,
        data.capacity,
        data.vehicle_type,
    )
    const token = generateToken({
        id: newUser.id,
        email: newUser.email
    })
    return {
    user: {
        id: newUser.id,
        firstname: newUser.firstname,
        lastname: newUser.lastname,
        email: newUser.email,
        vehicle_color: newUser.color,
        vehicle_plate: newUser.plate,
        vehicle_capacity: newUser.capacity,
        vehicle_type: newUser.vehicle_type
    },
    token
}
}

export const login = async (data) => {
    const user = await findCaptainByEmail(data.email)
    if (!user) {
        throw new ApiError(401, "Invalid email or password")
    }
    const isPasswordValid = await bcrypt.compare(
        data.password,
        user.password
    )
    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid email or password")
    }
    const token = generateToken({
        id: user.id,
        email: user.email
    })

    return {
        user: {
            id: user.id,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            vehicle_color: user.color,
            vehicle_plate: user.plate,
            vehicle_capacity: user.capacity,
            vehicle_type: user.vehicle_type
        },
        token
    }
}