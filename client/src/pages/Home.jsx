import React from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'

const Home = () => {
  const navigate = useNavigate()

  return (
    <>
      <Navbar />

      <div className="min-h-screen flex flex-col-reverse md:flex-row items-center justify-between px-8 md:px-20 pt-20">
        
        {/* Left Section */}
        <div className="max-w-xl text-center md:text-left">
          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            Go anywhere with
          </h1>

          <h2 className="text-6xl md:text-8xl font-black text-black mt-2">
            RideFlow
          </h2>

          <p className="mt-6 text-gray-600 text-lg">
            Book rides instantly, track your driver in real-time,
            and travel safely wherever you need to go.
          </p>

          <button
            onClick={() => navigate('/login')}
            className="mt-8 px-8 py-4 bg-black text-white rounded-xl hover:bg-gray-800 transition"
          >
            Get Started
          </button>
        </div>

        {/* Right Section */}
        <div className="mb-10 md:mb-0">
          <img
            src="https://plus.unsplash.com/premium_vector-1725948286385-960183060815?q=80&w=2064&auto=format&fit=crop"
            alt="RideFlow"
            className="w-[350px] md:w-[500px] rounded-2xl shadow-xl"
          />
        </div>

      </div>
    </>
  )
}

export default Home