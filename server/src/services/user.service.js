import { findUserByEmail } from "../repositories/user.repositories.js"
import ApiError from "../utils/apierror.js"
import bcrypt from 'bcrypt'
import { generateToken } from "../utils/JWT.js"


const register = async(data)=>{
    const userExist = await findUserByEmail(data.email) 
    if(userExist){
        throw new ApiError( "Email already exists")
    }
    const hashedPassword = await bcrypt.hash(data.password,10)
    const newUser =  repo.createUser(
      data.firstname,
      data.lastname,
      data.email,
      hashedPassword,
      data.role
    )
    const token = generateToken({}) //TODO

    return {
    user: newUser,
    token,
  }
}