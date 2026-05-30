import { pool } from "../config/db.js"


const createUser = async (firstname, lastname, email, password,role) => {
    const result = await pool.query(
        `
         INSERT INTO users(firstname,lastname,email,password,role)
         VALUES($1,$2,$3,$4,$5)
         RETURNING id, firstname, lastname, email, role, created_at
         `
        , [firstname, lastname, email, password,role])

    return result.rows[0]
}
const findUserByEmail = async (email) => {
    const result = await pool.query(
        `
        SELECT *
        FROM users
        WHERE email = $1
    `,
        [email]
    )
    return result.rows[0];
}
export { createUser, findUserByEmail }