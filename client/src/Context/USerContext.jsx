import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'
import { useContext } from 'react'

export const AppContext = createContext()

const UserContext = ({ children }) => {
   
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const value = {
        user,
        setUser,
        loading
    }
    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem("token")

            if (!token) {
                setLoading(false)
                return
            }
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_API_URL}/auth/getuser`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                )
                
                setUser(response.data.data)
            } catch (error) {
                console.log(error.message)
                localStorage.removeItem("token")
                setUser(null)
            } finally {
                setLoading(false)
            }
        }

        fetchUser()
    }, [])


    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export default UserContext