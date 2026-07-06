import React from 'react'
import NormalNavbar from '../components/NormalNavbar'
import Map from '../components/Map'
import { MapPin, Circle } from "lucide-react";
import { useNavigate } from 'react-router-dom'

const OtpVerify = () => {
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
                        <p className='text-sm mt-1 font-sm p-2 bg-gray-100 border border-gray-300 rounded-md' >rajatalab</p>
                        <h1 className='text-lg flex mt-1 items-center gap-2 font-bold font-mono  md:pl-5 md:text-3xl'>
                            <Circle className="w-4 h-3 text-blue-600" />  Destination Location

                        </h1>
                        <p className='text-sm font-sm mt-1 p-2 bg-gray-100 border border-gray-300 rounded-md' >destination</p>

                        <div className=''>
                            <input
                                type="text"
                                maxLength={6}
                                placeholder="Enter OTP"
                                className="w-full mt-5 border border-gray-300 rounded-lg px-3.5 py-2 text-center text-2xl tracking-[0.6em] focus:outline-none focus:ring-2  focus:border-blue-900 transition"
                            />

                            <button className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition">
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
