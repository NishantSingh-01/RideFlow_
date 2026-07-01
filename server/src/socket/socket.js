// socket.js
import { Server } from "socket.io"
import { pool } from "../config/db.js"
let io

export function initSocket(server) {
    io = new Server(server, {
        cors: {
            origin: "http://localhost:5173",
            credentials: true
        }
    })

    io.on("connection", (socket) => {
        console.log("User connected:", socket.id)

        socket.on("join", async ({ userId, userType }) => {
            if (userType === "user") {
                await pool.query(
                    "UPDATE users SET socket_id = $1 WHERE id = $2",
                    [socket.id, userId]
                )
                console.log("User socket updated:", userId)
            } else if (userType === "captain") {
                await pool.query(
                    "UPDATE captains SET socket_id = $1 WHERE id = $2",
                    [socket.id, userId]
                )
                console.log("Captain socket updated:", userId)
            }
        })
        socket.on('update-captain-location', async ({ captainId, latitude, longitude }) => {
            console.log("u[st]")
            if (!captainId || latitude == null || longitude == null) {
                return console.warn('Incomplete location update payload')
            }
            try {
                await pool.query(
                    "UPDATE captains SET latitude = $1, longitude = $2 WHERE id = $3",
                    [latitude, longitude, captainId]
                )
                console.log("Location updated ", captainId)
            } catch (err) {
                console.error('Failed to update captain location', err)
            }
        })

        socket.on("disconnect", () => {
            console.log("Disconnected:", socket.id)
        })
    })
}

export { io }
export default io