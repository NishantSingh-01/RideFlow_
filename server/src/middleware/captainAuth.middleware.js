import jwt from "jsonwebtoken"
import asyncHandler from "../utils/asyncHandler.js"
import ApiError from "../utils/apierror.js"
import { pool } from "../config/db.js"

const verifyCaptainJWT = asyncHandler(async (req, res, next) => {
    const token =
        req.cookies?.token ||
        req.header("Authorization")?.replace("Bearer ", "")

    if (!token) {
        throw new ApiError(401, "Unauthorized request")
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    const result = await pool.query(
        `
        SELECT
            id,
            firstname,
            lastname,
            email,
            color,
            plate,
            capacity,
            vehicle_type,
            status,
            latitude,
            longitude
        FROM captains
        WHERE id = $1
        `,
        [decoded.id]
    )
    const captain = result.rows[0]
    if (!captain) {
        throw new ApiError(401, "Invalid token captain")
    }

    req.captain = captain
    next()
})

export default verifyCaptainJWT