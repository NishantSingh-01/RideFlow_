import React from 'react'
import Map from '../components/Map'
import NormalNavbar from '../components/NormalNavbar'

const EndRide = () => {
    return (
        <div>
            <div className='flex flex-col h-full w-full gap-4  md:flex-row-reverse md:justify-around md:gap-10'>
                <NormalNavbar />
                <div className='flex md:mt-20 mt-7 flex-col items-center justify-center  md:flex-row-reverse md:justify-around md:gap-10'>
                    <div className='h-[50vh] w-full  overflow-x-hidden md:h-[490px] md:w-[950px] shadow-xl rounded-lg overflow-hidden relative z-0'>
                        <Map />
                    </div>
                    <div className='  w-full h-[39vh] flex flex-col items-center  rounded-xl md:w-[500px]  p-4 rounded-lg '>
                         <h1 className='font-medium text-gray-600 text-2xl '>Ride Completed</h1>
                         <button className= ' rounded-xl px-8 py-3 text-lg bg-green-500 '>End Ride</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EndRide
