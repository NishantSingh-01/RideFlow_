import { findUserByEmail } from "../repositories/user.repositories.js"
import ApiError from "../utils/apierror.js"
import bcrypt from 'bcrypt'
import { generateToken } from "../utils/JWT.js"
import * as repo from '../repositories/user.repositories.js'

export const register = async(data)=>{
    const user = await findUserByEmail(data.email) 
    if(user){
        throw new ApiError(409, "Email already exists")
    }
    const hashedPassword = await bcrypt.hash(data.password,10)
    const newUser = await repo.createUser(
      data.firstname,
      data.lastname,
      data.email, 
      hashedPassword,
      data.role
    )
    const token = generateToken({
        id: newUser.id,
        email: newUser.email,
        role: newUser.role
    })
     return {
        user: {
            id: newUser.id,
            firstname: newUser.firstname,
            lastname: newUser.lastname,
            email: newUser.email,
            role: newUser.role
        },
        token
    }
}
export const login = async (data) => {
    const user = await findUserByEmail(data.email)
    if (!user) {
        throw new ApiError(401, "Invalid email or password")
    }
    console.log(user.password)
    const isPasswordValid = await bcrypt.compare(
        data.password,
        user.password
    )
    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid email or password")
    }
    const token = generateToken({
        id: user.id,
        email: user.email,
        role: user.role
    })
    return {
        user: {
            id: user.id,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            role: user.role
        },
        token
    }
}