import React, { useContext, useState } from 'react'
import NormalNavbar from '../components/NormalNavbar'
import Map from '../components/Map'
import { MapPin, Circle } from "lucide-react";
import { useLocation, useNavigate } from 'react-router-dom'
import { CaptainContext } from '../Context/CaptainContext';
import { toast } from 'react-toastify'
import axios from 'axios'


const OtpVerify = () => {
    const navigate = useNavigate()
    const { captain } = useContext(CaptainContext)
    const { state } = useLocation()

    const rideId = state?.rideId
    const pickup = state?.pickup
    const destination = state?.destination

    const [otp, setOtp] = useState('')

    const HandleOtp = async() => {
        console.log("Handle opt")

        try {
            const token = localStorage.getItem('Captaintoken')

            await axios.post(`${import.meta.env.VITE_API_URL}/ride/start-ride`, {
                rideId: rideId,
                captainId: captain.id,
                otp: otp,
            }, {
                headers: { Authorization: `Bearer ${token}` }
            })


            toast.success('Ride Started')
            navigate(`/ride/${rideId}`, {
                state: {
                    rideId: rideId,
                    pickup: pickup,
                    destination:destination,
                },
            })

        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to confirm ride')
        }

    }

    return (
        <div>
            <div className='flex flex-col h-full w-full gap-4  md:flex-row-reverse md:justify-around md:gap-10'>
                <NormalNavbar />
                <div className='flex md:mt-20 mt-7 flex-col  justify-center  md:flex-row-reverse md:justify-around md:gap-10'>
                    <div className='h-[38vh] w-full  overflow-x-hidden md:h-[490px] md:w-[950px] rounded-b-2xl shadow-xl rounded-lg overflow-hidden relative z-0'>
                        <Map />
                    </div>
                    <div className='  w-full h-[60vh] rounded-xl md:w-[500px]  scroll-auto p-4  '>
                        <h1 className='text-lg flex items-center gap-2 font-bold font-mono  md:pl-5 md:text-3xl'>
                            <Circle className="w-4 h-3 text-red-600" />  Pickup Location
                            {/* <MapPin className="w-6 h-6 text-green-600" /> */}
                        </h1>
                        <p className='text-sm mt-1 font-sm p-2 bg-gray-100 border border-gray-300 rounded-md' >{pickup}</p>
                        <h1 className='text-lg flex mt-1 items-center gap-2 font-bold font-mono  md:pl-5 md:text-3xl'>
                            <Circle className="w-4 h-3 text-blue-600" />  Destination Location

                        </h1>
                        <p className='text-sm font-sm mt-1 p-2 bg-gray-100 border border-gray-300 rounded-md' >{destination}</p>

                        <div className=''>
                            <input
                                type="text"
                                maxLength={6}
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                placeholder="Enter OTP"
                                className="w-full mt-5 border border-gray-300 rounded-lg px-3.5 py-2 text-center text-2xl tracking-[0.6em] focus:outline-none focus:ring-2  focus:border-blue-900 transition"
                            />

                            <button
                                onClick={HandleOtp}
                                className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition">
                                Verify OTP and Start Ride
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OtpVerify
