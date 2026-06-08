import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'

export const CaptainContext = createContext()

const CaptainProvider = ({ children }) => {
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
                // console.log(response.data)
                setCaptain(response.data.data)
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