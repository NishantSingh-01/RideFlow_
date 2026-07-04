// import React from 'react'
// import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'

// const Home = () => {
//   const navigate = useNavigate()

//   return (
//     <>
//       <Navbar />

//       <div className="min-h-screen flex flex-col-reverse md:flex-row items-start px-8 md:px-20 pt-32 max-md:pt-25">

//         <div className="max-w-xl text-center md:text-left">
//           <h1 className="text-3xl md:text-6xl font-bold ">
//             Go anywhere with      <i className="fa-solid fa-location-dot"></i>
//           </h1>
//           <h1 className='text-6xl font-bold mt-4 max-md:text-5xl'>RideFlow</h1>
//           <div>
//             <form className='flex flex-col justify-center items-' >
//               <input className='p-5 cursor-pointer border-2 border-t-4  border-l-4 rounded-xl mt-10 w-100 max-md:w-70 max-md:p-4'  type="text"  placeholder='Pick up Location'/>
//               <input className='p-5 cursor-pointer border-2 border-t-4 border-l-4  rounded-xl mt-5 w-100 max-md:w-70 max-md:p-4' type="text"  placeholder='Dropoff Loaction'/>
//             </form>
//           </div>
//         </div>

//         <div className="mb-0 md:mb-0">
//           <img
//             src="https://plus.unsplash.com/premium_vector-1725948286385-960183060815?q=80&w=2064&auto=format&fit=crop"
//             alt="RideFlow"
//             className=" md:w-[800px]  shadow-2xl"
//           />
//         </div>

//       </div>
//     </>
//   )
// }

// export default Home
// import React, { useState } from 'react'
// import Navbar from '../components/Navbar'

// const Home = () => {
//   const [pickup, setPickup] = useState('')
//   const [dropoff, setDropoff] = useState('')

//   const handleSubmit = (e) => {
//     e.preventDefault()

//     if (!pickup || !dropoff) {
//       alert('Please enter both locations')
//       return
//     }

//     console.log({
//       pickup,
//       dropoff,
//     })
//   }

//   return (
//     <>
//       <Navbar />

//       <div className="min-h-screen flex flex-col-reverse md:flex-row items-center justify-between px-6 md:px-20 pt-28 gap-10">

//         {/* Left Section */}
//         <div className="max-w-xl w-full">

//           <h1 className="text-4xl md:text-6xl font-bold leading-tight">
//             Go anywhere with{' '}
//             <span className="text-green-600">
//               <i className="fa-solid fa-location-dot"></i>
//             </span>
//           </h1>

//           <h2 className="text-5xl md:text-7xl font-bold mt-4">
//             RideFlow
//           </h2>

//           <p className="mt-5 text-gray-600 text-lg">
//             Book rides instantly, travel safely, and reach your destination
//             comfortably with RideFlow.
//           </p>

//           {/* Booking Card */}
//           <div className="mt-10 bg-white p-6 rounded-3xl shadow-2xl border">

//             <h3 className="text-xl font-semibold mb-5">
//               Book Your Ride
//             </h3>

//             <form onSubmit={handleSubmit} className="space-y-4">

//               {/* Pickup */}
//               <div className="relative">
//                 <i className="fa-solid fa-location-dot absolute left-4 top-1/2 -translate-y-1/2 text-green-600"></i>

//                 <input
//                   type="text"
//                   placeholder="Pickup Location"
//                   value={pickup}
//                   onChange={(e) => setPickup(e.target.value)}
//                   className="w-full border-2 rounded-xl p-4 pl-12 focus:outline-none focus:border-green-500 transition"
//                 />
//               </div>

//               {/* Dropoff */}
//               <div className="relative">
//                 <i className="fa-solid fa-location-crosshairs absolute left-4 top-1/2 -translate-y-1/2 text-red-500"></i>

//                 <input
//                   type="text"
//                   placeholder="Dropoff Location"
//                   value={dropoff}
//                   onChange={(e) => setDropoff(e.target.value)}
//                   className="w-full border-2 rounded-xl p-4 pl-12 focus:outline-none focus:border-red-500 transition"
//                 />
//               </div>

//               <button
//                 type="submit"
//                 className="w-full bg-black text-white py-4 rounded-xl hover:bg-gray-800 transition duration-300 font-medium"
//               >
//                 Find Ride
//               </button>
//             </form>
//           </div>
//         </div>

//         {/* Right Section */}
//         <div className="flex justify-center w-full md:w-auto">
//           <img
//             src="https://plus.unsplash.com/premium_vector-1725948286385-960183060815?q=80&w=2064&auto=format&fit=crop"
//             alt="RideFlow"
//             className="w-full max-w-[700px] rounded-3xl hover:scale-105 transition duration-500"
//           />
//         </div>

//       </div>
//     </>
//   )
// }

// export default Home
import React, { useEffect, useState } from 'react'
import SearchBox from '../components/SearchBox';
import LocationSearch from '../components/LoacationSearch';
import Footer from '../components/Footer';
import Map from '../components/Map';
import HomeMobile from '../components/HomeMobile';
import HomeDekstop from '../components/HomeDekstop';
import axios from 'axios';
import { useContext } from 'react';
import { AppContext } from '../Context/USerContext';
import { SocketContext } from '../Context/SocketContext';


const HOme = () => {

  const { user } = useContext(AppContext)
  const socket = useContext(SocketContext)

  const [pickup, setPickup] = useState(" Badlapur ,Jaunpur India")
  const [destination, setDestination] = useState("Jaunpur India")
  const [isExpanded, setIsExpanded] = useState(false)
  const [isSuggestion, setSuggestion] = useState(false)


  const selectLocation = (location) => {
    setDestination(location)
    setIsExpanded(false)
  }
  useEffect(() => {
    socket.emit("join", {
      userId: user.id,
      userType: "user"
    })
  }, [socket])

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* <div className='absolute top-3 left-3 text-2xl font-bold font-mono '>RideFlow</div> */}

      <Navbar />
      <HomeMobile
        pickup={pickup}
        setPickup={setPickup}
        destination={destination}
        setDestination={setDestination}
        isExpanded={isExpanded}
        setIsExpanded={setIsExpanded}
        isSuggestion={isSuggestion}
        setSuggestion={setSuggestion}
      />
      <HomeDekstop
        pickup={pickup}
        setPickup={setPickup}
        destination={destination}
        setDestination={setDestination}
        isSuggestion={isSuggestion}
        setSuggestion={setSuggestion}
        isExpanded={isExpanded}
        setIsExpanded={setIsExpanded}
      />

    </div>
  )
}

export default HOme
