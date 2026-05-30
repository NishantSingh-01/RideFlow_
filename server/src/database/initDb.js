import { pool } from "../config/db.js"

const createUsersTable = async () => {
    await pool.query(`
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            firstname VARCHAR(100) NOT NULL,
            lastname VARCHAR(100),
            email VARCHAR(255) UNIQUE NOT NULL,
            password TEXT NOT NULL,
            role VARCHAR(20)
                CHECK(role IN ('rider','driver','admin'))
                DEFAULT 'rider',
            profile_photo TEXT DEFAULT '',
            socket_id VARCHAR(255),
            created_at TIMESTAMP DEFAULT NOW(),
            updated_at TIMESTAMP DEFAULT NOW()
        )
    `)

    console.log("Users table ready")
}

export default createUsersTable