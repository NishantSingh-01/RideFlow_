import jwt from "jsonwebtoken"
import asyncHandler from "../utils/asyncHandler.js"
import ApiError from "../utils/apierror.js"
import { pool } from "../config/db.js"


 const verifyJWT =  asyncHandler(async(req,res,next)=>{
       const token = req.cookies?.accesstoken || req.header("Authorization")?.replace("Bearer ", "")
       console.log(token)
       if(!token){
        throw new ApiError(401,"Unauthorized request" )
       }
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        const result = await pool.query(
            `SELECT id, firstname, lastname, email, role
             FROM users
             WHERE id = $1`,
            [decoded.id]
        )
        const user = result.rows[0]
        if (!user) {
            throw new ApiError(401,"Invalid token user")
        }
         req.user = user
        next()
 })

export default verifyJWT