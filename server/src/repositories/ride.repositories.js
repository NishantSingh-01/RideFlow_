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

export const changeStatus = async (rideId, status, captainId) => {
    const query = `
        UPDATE rides
        SET status = $1,
            captain_id = $2
        WHERE id = $3
    `
    const result = await pool.query(query, [status, captainId, rideId])
    return result.rows[0]
}
export const getRideWithUserAndCaptain = async (rideId) => {  //todo to see
    const query = `
        SELECT
            r.*,

            u.id AS user_id,
            u.firstname AS user_firstname,
            u.lastname AS user_lastname,
            u.email AS user_email,
            u.socket_id AS user_socket_id,   

            c.id AS captain_id,
            c.firstname AS captain_firstname,
            c.lastname AS captain_lastname,
            c.email AS captain_email,
            c.capacity AS vehicle_capacity,
            c.color AS vehicle_color,
            c.plate AS vehicle_plate,
            c.vehicle_type

        FROM rides r
        JOIN users u ON r.user_id = u.id
        LEFT JOIN captains c ON r.captain_id = c.id

        WHERE r.id = $1
    `

    const { rows } = await pool.query(query, [rideId])

    return rows[0]
}