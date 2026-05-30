import pkg from "pg"
const { Pool } = pkg
import dotenv from "dotenv"
dotenv.config()

console.log({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: String(process.env.DB_PASSWORD),
  port: Number(process.env.DB_PORT),
})

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: String(process.env.DB_PASSWORD),
    port: Number(process.env.DB_PORT)
})


// pool.on("connect", () => {
//     console.log("Connection pool established with Database")
// })
const connectDB = async () => {
    try {
        const client = await pool.connect();
        console.log("PostgreSQL Connected Successfully");

        const res = await client.query("SELECT current_database()");
        console.log("Database name is: :::", res.rows[0].current_database);

        client.release();
    } catch (error) {
        console.error("PostgreSQL Connection Error:", error.message);
        process.exit(1);
    }
}
//often use this >> later
// const connectDB = async () => {
//     try {
//         await pool.query("SELECT 1");
//         console.log("PostgreSQL Connected Successfully");
//     } catch (error) {
//      console.error("PostgreSQL Connection Error:", error);
//         process.exit(1)
//     }
// }
export  {pool , connectDB}