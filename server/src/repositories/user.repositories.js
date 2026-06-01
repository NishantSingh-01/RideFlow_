import { pool } from "../config/db.js"


const createUser = async (firstname, lastname, email, password) => {
    const result = await pool.query(
        `
         INSERT INTO users(firstname,lastname,email,password)
         VALUES($1,$2,$3,$4)
         RETURNING id, firstname, lastname, email, created_at
         `
        , [firstname, lastname, email, password])

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