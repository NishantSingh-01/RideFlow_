import { pool } from "../config/db.js"

export const createRide = async ({ userId, pickup, destination, vehicleType, fare, distance, duration }) => {
    const result = await pool.query(
        `
    INSERT INTO rides (
        user_id,
        pickup,
        destination,
        vehicle_type,
        fare,
        distance,
        duration,
        status
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7, 'pending')
    RETURNING *
    `,
        [userId, pickup, destination, vehicleType, fare, distance, duration]
    )
    return result.rows[0]
}