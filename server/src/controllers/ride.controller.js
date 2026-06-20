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
                // distanceTime: {
                //     distance: distanceTime.distance,
                //     duration: distanceTime.duration,
                // },
                Price: fares
            },
            "Fare calculated successfully"
        )
    )
})

export const createRide = asyncHandler(async (req, res) => {
    const { pickup, destination, vehicleType } = req.body

    if (!pickup || !destination || !vehicleType) {
        throw new ApiError(
            400,
            "Pickup, destination and vehicle type are required"
        )
    }
    const ride = await RideService.createRide({
        userId: req.user.id,
        pickup,
        destination,
        vehicleType,
    })

    return res.status(201).json(
        new ApiResponse(201, ride, "Ride created successfully")
    )

})