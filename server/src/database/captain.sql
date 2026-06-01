CREATE TABLE IF NOT EXISTS captains (
    id SERIAL PRIMARY KEY,

    firstname VARCHAR(100) NOT NULL,
    lastname VARCHAR(100),

    email VARCHAR(255) UNIQUE NOT NULL,
    password TEXT NOT NULL,

    socket_id VARCHAR(255),

    status VARCHAR(20)
        CHECK (status IN ('active', 'inactive'))
        DEFAULT 'active',

    color VARCHAR(50) NOT NULL,
    plate VARCHAR(20) UNIQUE NOT NULL,
    capacity INTEGER NOT NULL,

    vehicle_type VARCHAR(20) NOT NULL
        CHECK (vehicle_type IN ('car', 'bike', 'auto')),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);