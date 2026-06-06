import React from 'react'

const Navbar = () => {
    return (
        <div className='h-16 pl-10 pr-15 fixed top-0 left-0 text-white w-screen flex justify-between items-center bg-black '>
            <div className='flex pl-15 gap-6 items-center'>
                <div className="text-white text-xl font-medium flex items-center ">
                    RideFlow
                </div>
                <div>Ride</div>
                <div>Drive</div>
                <div>About</div>
                <div>Service</div>
            </div>
            <div className='flex gap-5 items-center'>
                <button>Help</button>
                <button className='cursor-pointer'>Log in</button>
                <button className='p-2 cursor-pointer font-normal bg-white text-black rounded-3xl'>Sign Up</button>
            </div>
        </div>
    )
}

export default Navbar
