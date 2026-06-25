import React from 'react'
import { useSearchParams } from 'react-router-dom'

const ConfirmRide = () => {
        const [searchParams] = useSearchParams()

    const pickup = searchParams.get('pickup')
    const destination = searchParams.get('destination')
    
  return (
       <div className="flex flex-col md:flex-row-reverse md:mt-10 md:justify-center md:gap-15 flex-1">

        {/* <div className="h-[47vh] rounded-b-2xl md:mt-7 md:h-[490px] md:w-[750px] border-2 border-blue-100 shadow-xl rounded-lg overflow-hidden relative z-0">
            <RideMap
                pickup={rideData.pickup}
                destination={rideData.destination}
            />
        </div> */}
        s s  s s
    </div>
  )
}

export default ConfirmRide
