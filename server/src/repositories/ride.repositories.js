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
    RETURNING
          id ,
        user_id,
        pickup,
        destination,
        vehicle_type,
        fare,
        distance,
        duration,
          status
    `,
        [userId, pickup, destination, vehicleType, fare, distance, duration]
    )
    return result.rows[0]
}

export const updateRideStatus = async (rideId, status, captainId) => {
    const query = `
        UPDATE rides
        SET status = $1,
            captain_id = $2
        WHERE id = $3
    `
    const result = await pool.query(query, [status, captainId, rideId])
    return result.rows[0]
}
export const getRideWithUserAndCaptain = async (rideId) => { //todoto see
    const query = `
        SELECT
            r.*,

            u.id AS user_id,
            u.fullname AS user_name,
            u.phone AS user_phone,

            c.id AS captain_id,
            c.fullname AS captain_name,
            c.phone AS captain_phone,
            c.vehicle_color,
            c.vehicle_model,
            c.vehicle_number,
            c.vehicle_type

        FROM rides r
        JOIN users u ON r.user_id = u.id
        LEFT JOIN captains c ON r.captain_id = c.id

        WHERE r.id = $1
    `

    const { rows } = await pool.query(query, [rideId])

    return rows[0]
}