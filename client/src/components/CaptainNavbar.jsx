import React from 'react'
import { useContext } from 'react'
import { SocketContext } from '../Context/SocketContext'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'
import { CaptainContext } from '../Context/CaptainContext'

const CaptainNavbar = () => {
    const socket = useContext(SocketContext)
    const { captain } = useContext(CaptainContext)
    const navigate = useNavigate()

    const [isOnline, setIsOnline] = useState(false)
    const handleLogout = async () => {
        try {
            const token = localStorage.getItem("Captaintoken")

            const res = await axios.post(
                `${import.meta.env.VITE_API_URL}/captain/logout`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            localStorage.removeItem("Captaintoken")
            // setUser(null)
            toast.success("Logged out successfully")
            navigate("/captain-login")
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Logout failed"
            )
        }
    }
    const setAvailabilty = () => {
        setIsOnline(prev => !prev)
        toast.success("Toggled")
    }
    return (
        <div>
            <div className="fixed top-0 left-0 w-full flex items-center justify-between px-4 py-3 bg-black shadow-md z-10">
                <div className='pl-2 md:pl-8'>
                    <div className='text-2xl max-sm:text-xl font-medium font-mono text-pink-100'> RideFlow</div>
                
                </div>

                <div className='gap-1 md:gap-5 flex'>
                    <button
                        onClick={setAvailabilty}
                        className={` max-sm:rounded-2xl  px-3 py-2 rounded-full text-sm font-medium transition ${isOnline ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-700'
                            }`}
                    >
                        {isOnline ? 'Online' : 'Offline'}
                    </button>
                    <button
                        onClick={handleLogout}
                        className='bg-red-500 p-3 rounded-3xl cursor-pointer max-sm:p-2 max-sm:rounded-2xl'>Logout</button>
                </div>
            </div>
        </div>
    )
}

export default CaptainNavbar
