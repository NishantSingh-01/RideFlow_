import React, { useEffect, useState } from 'react'
import NormalNav from '../components/NormalNav'
import axios from 'axios'
import { useParams } from 'react-router-dom'
const ShareOtp = () => {
    const [otp, setOtp] = useState('3333')
    const { rideId } = useParams()


  useEffect(() => {
    const getRideInfo = async () => {
        try {
            const token = localStorage.getItem("token")

            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/ride/${rideId}/info`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            const ride = response.data.data
            setOtp(ride.otp)
        } catch (error) {
            console.log(error)
        }
    }
    getRideInfo()
}, [rideId])


    return (
        <div className='flex flex-col md:gap-14 bg-gradient-to-br from-blue-50 to-white  justify-center items-center md:mt-13 md:flex-row-reverse'>
            <NormalNav />
            <div className='mt-15 md:mt-25'>
                <img src="https://static.vecteezy.com/system/resources/thumbnails/079/151/268/small/gps-map-navigation-to-markers-abstract-transportation-background-track-navigation-pins-on-street-maps-position-pin-city-in-isometric-view-illustration-vector.jpg" alt="" />
                {/* <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRg7WGWbYBf2bDHMc8Eop-Okkp50R7wyTnDSJfxiUwSNL7ZsE-wQVR6pUE&s=10" alt="" /> */}
                {/* <img src="https://img.magnific.com/premium-vector/destinations-gps-tracking-map-track-navigation-pin-street-maps-navigate-mapping-locate-position_753943-584.jpg" alt="" /> */}
            </div>
            <div className='flex flex-col justify-center items-center md:items-start mt-4 md:mt-14'>

                <h1 className="text-4xl md:text-5xl font-bold  text-gray-800">
                    Driver Has Arrived
                </h1>

                <p className="mt-4 text-gray-60 text-center md:mt-3 text-lg md:text-2xl">
                    Share this Pickup Code with your Captain to begin the ride.
                </p>

                <div className='px-5 py-4 md:py-7 mt-6 border-1 border-gray-400 rounded-2xl w-80 md:w-120 flex flex-col justify-center items-center '>
                    <p className='font-mono text-xl md:text-2xl font-semibold'>Your Pickup Code</p>
                    {/* <div className='p-2 border-1 mt-2 text-blue-500 border-gray-300 rounded-lg'> 5 6 7 8{}</div> */}
                    <div className="flex justify-center gap-4 mt-6">
                        {otp.split("").map((digit, index) => (
                            <div
                                key={index}
                                className="w-13 h-13 md:h-16 md:w-16 flex items-center justify-center rounded-xl border-1 md:border-2 border-gray-500 bg-blue-50 text-2xl md:text-3xl font-bold text-blue-500"
                            >
                                {digit}
                            </div>
                        ))}
                    </div>

                </div>
                <h1 className='text-center mt-4 text-lg font-serif p-1'>Only share this code with nishant{ } once your's Captain has Arrived </h1>
            </div>
        </div>
    )
}

export default ShareOtp


