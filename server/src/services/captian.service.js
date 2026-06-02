import bcrypt from "bcrypt"
import ApiError from "../utils/apierror.js"
import { generateToken } from "../utils/JWT.js"
import { pool } from "../config/db.js"
import { createCaptain, findCaptainByEmail, findCaptainById } from "../repositories/captain.repositories.js"


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
    captain: {
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
    const captain = await findCaptainByEmail(data.email)
    if (!captain) {
        throw new ApiError(401, "Invalid email or password")
    }
    const isPasswordValid = await bcrypt.compare(
        data.password,
        captain.password
    )
    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid email or password")
    }
    const token = generateToken({
        id: captain.id,
        email: captain.email
    })

    return {
        captain: {
            id: captain.id,
            firstname: captain.firstname,
            lastname: captain.lastname,
            email: captain.email,
            vehicle_color: captain.color,
            vehicle_plate: captain.plate,
            vehicle_capacity: captain.capacity,
            vehicle_type: captain.vehicle_type
        },
        token
    }
}

export const getCaptain = async (captainId) => {
    const captain = await findCaptainById(captainId)

    if (!captain) {
        throw new ApiError(404, "Captain not found")
    }

    return captain
}
