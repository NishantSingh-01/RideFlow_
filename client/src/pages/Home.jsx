import React from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const navigate = useNavigate()
    return (
        <div>
            <div className='h-screen w-screen bg-red-100'>
                <div>
                    <h1>Get Started with RideFlow</h1>
                    <button className='p-3 bg-black text-white rounded-xl'
                        onClick={() => navigate("/login")}
                    >Continue</button>
                </div>
            </div>
        </div>
    )
}

export default Home
