import { io } from "socket.io-client"

export const socket = io("https://rideflow-my5u.onrender.com", {
    withCredentials: true,
    autoConnect: true
})