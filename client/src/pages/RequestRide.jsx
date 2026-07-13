import React from 'react'
import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useContext } from 'react'
import { SocketContext } from '../Context/SocketContext'
import Map from '../components/Map'
import { MapPin } from "lucide-react";
import NormalNav from '../components/NormalNav'

const ConfirmRide = () => {
    const navigate = useNavigate() ;
    const socket = useContext(SocketContext)
    const [searchParams] = useSearchParams()
    const pickup = searchParams.get('pickup')
    const destination = searchParams.get('destination')

    const [confirmedRide, setConfirmedRide] = React.useState(null)

    useEffect(() => {
        socket.on("ride-confirmed", (data) => {
            console.log("Ride confirmed:", data)
            setConfirmedRide(data)
        })

        return () => {
            socket.off("ride-confirmed");
        }
    }, [socket])

    useEffect(()=>{
        socket.on('arrived',(data)=>{
            console.log(data)
            navigate(`/shareOtp/${confirmedRide.id}`)
        })
    }
        ,[]
    )


    return (
        <div>
            <NormalNav />
            <div className='flex flex-col h-full w-full gap-4  md:flex-row-reverse md:justify-around md:gap-10'>
                <div className='flex md:mt-26 mt-7 flex-col items- justify-center  md:flex-row-reverse md:justify-around md:gap-14'>
                    <div className='h-[50vh] w-full   overflow-x-hidden md:h-[470px] md:w-[800px] shadow-xl rounded-lg overflow-hidden relative z-0'>
                        <Map /> //TODO get routes 
                    </div>
                    <div className='  w-full h-[35vh] rounded-xl md:w-[500px]  p-4 '>
                        {confirmedRide ? (
                
                            <div className='flex justify-center flex-col pb-2 mt-3'>
                                <h1 className='text-center text-2xl font-mono font-bold md:text-3xl '>Ride Accepted by Captain ...</h1>
                                <div className='flex justify-around items-center gap-3 mt-2 md:mt-5'>
                                    <div className='h-17 w-17 rounded-full border-2 border-cyan-700 overflow-hidden'>
                                        <img className='h-full w-full object-cover' src="https://png.pngtree.com/png-vector/20191021/ourmid/pngtree-vector-driver-icon-png-image_1834504.jpg" alt="" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-xl">{confirmedRide.captain_firstname} {confirmedRide.captain_lastname}</p>
                                        {/* <p>{confirmedRide.vehicle_color} Vehicle</p> */}
                                        <p className='font-sans font-semibold text-blue-800'>{confirmedRide.vehicle_plate}</p>
                                    </div>
                                    
                                </div>
                                <div className='flex items-center justify-center gap-8 font-semibold text-lg mt-6 p-3 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg'>
                                    <div className='flex items-center gap-2'>
                                        <span className='text-blue-600 font-bold'>{confirmedRide.distance ? `${(Number(confirmedRide.distance) / 1000).toFixed(1)}` : '0'}</span>
                                        <span className='text-gray-700'>km away</span>
                                    </div>
                                    <div className='h-6 w-[3px] rounded bg-gray-500'></div>
                                    <div className='flex items-center gap-2'>
                                        <span className='text-blue-600 font-bold'>{confirmedRide.duration ? `${Math.round(Number(confirmedRide.duration) / 60)}` : '0'}</span>
                                        <span className='text-gray-700'>mins</span>
                                    </div>
                                </div>
                                <p className='text-center text-lg font-semibold text-gray-700 mt-4 md:mt-6'> Please wait for your captain to arrive</p>
                                <button className='p-2.5 border-3 border-red-600 text-red-600 font-semibold rounded-lg w-full mt-4 transition-colors md:mt-6'>Cancel Ride</button>

                            </div>
                        ) : (
                            <div className='rounded-t-xl pb-1'>
                                <h1 className='text-center text-2xl font-mono font-black md:text-4xl '>Finding nearby Captains for you ...</h1>
                                <div className=' flex items-center justify-center'>
                                    <img className='h-50 md:h-78' src="https://img.magnific.com/premium-vector/self-driving-car-concept-illustration_114360-10685.jpg?semt=ais_hybrid&w=740&q=80" alt="" />
                                </div>
                                <button className='p-3 border-3 border-red-600 text-red-600 flex text-lg font-semibold items-center justify-center rounded-2xl w-full mt-2 mb-4'>Cancel Ride</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ConfirmRide

 




           