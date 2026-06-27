import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'
import { useContext } from 'react'
import { SocketContext } from './SocketContext'

export const CaptainContext = createContext()

const CaptainProvider = ({ children }) => {
    const socket = useContext(SocketContext)
    const [captain, setCaptain] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchCaptain = async () => {
            const token = localStorage.getItem("Captaintoken")
            // console.log(token)
            if (!token) {
                setLoading(false)
                return
            }
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_API_URL}/captain/getcaptain`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                )
                // console.log(response.data.data.id)
                setCaptain(response.data.data)
                // socket.emit('join', {
                //     id: req.captain.id,
                //     userType: "captain"
                // })
            } catch (error) {
                console.log(error)

                localStorage.removeItem("Captaintoken")
                setCaptain(null)
            } finally {
                setLoading(false)
            }
        }

        fetchCaptain()
    }, [])
    useEffect(() => {
    if (!captain) return

    if (socket.connected) {
        socket.emit("join", {
            id: captain.id,
            userType: "captain",
        })
    }
}, [captain, socket])

    const value = {
        captain,
        setCaptain,
        loading
    }

    return (
        <CaptainContext.Provider value={value}>
            {children}
        </CaptainContext.Provider>
    )
}

export default CaptainProvider