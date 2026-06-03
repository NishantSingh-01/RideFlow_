import { findUserByEmail } from "../repositories/user.repositories.js"
import ApiError from "../utils/apierror.js"
import bcrypt from 'bcrypt'
import { generateToken } from "../utils/JWT.js"
import * as repo from '../repositories/user.repositories.js'
import { pool } from "../config/db.js"

export const register = async (data) => {
    const user = await findUserByEmail(data.email)
    if (user) {
        throw new ApiError(409, "Email already exists")
    }
    const hashedPassword = await bcrypt.hash(data.password, 10)
    const newUser = await repo.createUser(
        data.firstname,
        data.lastname,
        data.email,
        hashedPassword,
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

        },
        token
    }
}
export const login = async (data) => {
    const user = await findUserByEmail(data.email)
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
        },
        token
    }
}
export const getUser = async (userId) => {

    const user = await repo.findUserById(userId)
    if (!user) {
        throw new ApiError(404, "User not found")
    }
    return user
}