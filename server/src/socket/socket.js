// socket.js
import { Server } from "socket.io"
import { pool } from "../config/db.js"
import { getNearbyCaptains, updateCaptainLocation } from "../services/captian.service.js"
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
            if (!captainId || latitude == null || longitude == null) return
            try {
                await updateCaptainLocation(captainId, latitude, longitude)
                console.log("Location Updated",captainId)
            } catch (err) {
                console.error('Failed to update captain location', err)
            }
        })
        // socket.on('create-ride', async ({ pickup, destination, ...rideData }) => {
            // const nearbyCaptains = await getNearbyCaptains(pickupLat, pickupLng, 3)
        //     nearbyCaptains.forEach(captain => {
        //         const captainSocketId = captainSocketMap.get(captain.id)
        //         if (captainSocketId) {
        //             io.to(captainSocketId).emit('new-ride-request', rideData)
        //         }
        //     })
        // })

        socket.on("disconnect", () => {
            console.log("Disconnected:", socket.id)
        })
    })
}

export { io }
export default io