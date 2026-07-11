import React from 'react'
import { useContext } from 'react'
import { AppContext } from '../Context/USerContext'

const NormalNav = () => {
    const {user} = useContext(AppContext)
    // console.log(user)
  return (
   
        <div>
      <div className="fixed w-auto h-15 top-0 left-0 w-full flex items-center justify-between px-4 py-4 bg-black shadow-md z-10">
                <div className='text-2xl max-sm:text-xl font-medium font-mono text-pink-100'> RideFlow</div>
                
                <div className='pr-1 md:pr-8'>
                    <h2 className="text-white text-lg font-semibold">Hi, <span className='text-xl font-mono text-blue-600 font-semibold'>{user?.firstname || 'Rider'}</span></h2>
                </div>
            </div>
    </div>
  )
}

export default NormalNav
