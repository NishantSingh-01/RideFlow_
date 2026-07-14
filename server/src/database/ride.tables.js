import { pool } from "../config/db.js";

const createRideTable = async () => {
    await pool.query(`
        CREATE TABLE IF NOT EXISTS rides (
            id SERIAL PRIMARY KEY,

            user_id INTEGER NOT NULL
                REFERENCES users(id) ON DELETE CASCADE,

            captain_id INTEGER
                REFERENCES captains(id) ON DELETE SET NULL,

            pickup TEXT NOT NULL,
            destination TEXT NOT NULL,

            pickup_latitude DECIMAL(10,8),
            pickup_longitude DECIMAL(11,8),

            destination_latitude DECIMAL(10,8),
            destination_longitude DECIMAL(11,8),

            distance INTEGER NOT NULL,
            duration INTEGER NOT NULL,

            fare DECIMAL(10,2) NOT NULL,

            status VARCHAR(20) NOT NULL
                DEFAULT 'pending'
                CHECK (
                    status IN (
                        'pending',
                        'accepted',
                        'arrived',
                        'ongoing',
                        'completed',
                        'cancelled'
                    )
                ),

            vehicle_type VARCHAR(10) NOT NULL
                CHECK (
                    vehicle_type IN (
                        'bike',
                        'car',
                        'auto'
                    )
                ),

            otp VARCHAR(6),

            payment_method VARCHAR(20)
                DEFAULT 'cash'
                CHECK (
                    payment_method IN (
                        'cash',
                        'upi',
                        'card',
                        'wallet'
                    )
                ),

            payment_status VARCHAR(20)
                DEFAULT 'pending'
                CHECK (
                    payment_status IN (
                        'pending',
                        'paid',
                        'failed'
                    )
                ),

            payment_id VARCHAR(255),
            order_id VARCHAR(255),
            signature VARCHAR(255),

            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            accepted_at TIMESTAMP,
            started_at TIMESTAMP,
            completed_at TIMESTAMP
        )
    `)
}

export default createRideTable