import { pool } from "../config/db.js"

export const createRide = async ({ userId, pickup, destination, vehicleType, fare }) => {
    await pool.query(
        `
    INSERT INTO rides (
        user_id,
        pickup,
        destination,
        vehicle_type,
        fare,
        status
    )
    VALUES ($1, $2, $3, $4, $5, 'pending')
    RETURNING *
    `,
        [userId, pickup, destination, vehicleType, fare]
    )
    return result.rows[0]
}