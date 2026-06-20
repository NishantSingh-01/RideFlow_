import * as RideService from '..//services/ride.service.js'
import { getDistanceTime } from '../services/map.service.js'
import ApiResponse from '../utils/apiresponse.js'
import asyncHandler from '../utils/asyncHandler.js'

export const calculateFare = asyncHandler(async (req, res) => {
    const { pickup, destination } = req.query

    if (!pickup || !destination) {
        return res.status(400).json({
            success: false,
            message: "Pickup and destination are required"
        })
    }
    const distanceTime = await getDistanceTime(
        pickup,
        destination
    )
    const fares = await RideService.calculateFare(
        distanceTime.distance,
        distanceTime.duration
    )
    return res.status(200).json(
        new ApiResponse(
            200,
            {
                distanceTime: {
                    distance: distanceTime.distance,
                    duration: distanceTime.duration,
                },
                Price: fares
            },
            "Fare calculated successfully"
        )
    )
})

export const createRide = asyncHandler(async(req,res)=>{
     const {userId,pickup,destination,vehicle_type} = req.body
     
})