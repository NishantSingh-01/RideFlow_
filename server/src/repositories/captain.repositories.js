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
export { createCaptain, findCaptainByEmail }