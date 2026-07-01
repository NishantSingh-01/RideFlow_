import { pool } from "../config/db.js"


const createCaptain = async (firstname, lastname, email, password, color, plate, capacity, vehicle_type) => {
    const result = await pool.query(
        `
         INSERT INTO captains(firstname,lastname,email,password,color,plate,capacity,vehicle_type)
         VALUES($1,$2,$3,$4,$5,$6,$7,$8)
         RETURNING id, firstname, lastname, email,color,plate,capacity,vehicle_type, created_at
         `
        , [firstname, lastname, email, password, color, plate, capacity, vehicle_type])

    return result.rows[0]
}
const findCaptainByEmail = async (email) => {
    const result = await pool.query(
        `
        SELECT *
        FROM captains
        WHERE email = $1
    `,
        [email]
    )
    return result.rows[0];
}
const findCaptainById = async (id) => {
    const result = await pool.query(
        `
        SELECT
            id, firstname,  lastname, email,color,plate, capacity,vehicle_type,status,latitude,longitude,created_at,socket_id ,updated_at
        FROM captains
        WHERE id = $1
        `,
        [id]
    )

    return result.rows[0]
}
const findNearbyCaptains = async (latitude, longitude, radiusInKm) => {
    const query = `
    SELECT * FROM (
      SELECT id, name, vehicle_type, latitude, longitude,
      ( 6371 * acos(
          cos(radians($1)) * cos(radians(latitude)) *
          cos(radians(longitude) - radians($2)) +
          sin(radians($1)) * sin(radians(latitude))
        )
      ) AS distance_km
      FROM captains
      WHERE status = 'active'
        AND latitude IS NOT NULL
        AND longitude IS NOT NULL
    ) sub
    WHERE distance_km <= $3
    ORDER BY distance_km ASC
  `
    const { rows } = await pool.query(query, [latitude, longitude, radiusInKm])
    return rows
}
const updateCaptainLocation = async (captainId, latitude, longitude) => {
    return pool.query(
        "UPDATE captains SET latitude = $1, longitude = $2 WHERE id = $3",
        [latitude, longitude, captainId]
    )
}

export { createCaptain, findCaptainByEmail, findCaptainById, findNearbyCaptains, updateCaptainLocation }