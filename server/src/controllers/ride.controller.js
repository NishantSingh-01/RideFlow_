import * as RideService from '..//services/ride.service.js'
import { findUserById } from '../repositories/user.repositories.js'
import { getNearbyCaptains } from '../services/captian.service.js'
import { getAddressCoordinates, getDistanceTime } from '../services/map.service.js'
import { sendMessageToSocketId } from '../socket/socket.js'
import ApiError from '../utils/apierror.js'
import ApiResponse from '../utils/apiresponse.js'
import asyncHandler from '../utils/asyncHandler.js'

export const calculateFare = asyncHandler(async (req, res) => {
    const { pickup, destination } = req.query

    if (!pickup || !destination) {
        throw new ApiError(
            400,
            "Pickup, destination  are required"
        )
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
                Price: fares
            },
            "Fare calculated successfully"
        )
    )
})

export const createRide = asyncHandler(async (req, res) => {
    const { pickup, destination, vehicleType } = req.body

    if (!pickup || !destination || !vehicleType) {
        throw new ApiError(400, 'Pickup and Destination and Vehicle_Type required')
    }
    const ride = await RideService.createRide({
        userId: req.user.id,
        pickup,
        destination,
        vehicleType,
    })


    const { lat, lng } = await getAddressCoordinates(pickup)


    const NearbyCaptain = await getNearbyCaptains(lat, lng, 15)
    console.log(NearbyCaptain)

    const matchingCaptains = NearbyCaptain.filter(
        (captain) => captain.vehicle_type === vehicleType
    )

    if (!matchingCaptains || matchingCaptains.length === 0) {
        throw new ApiError(400, "No captain available for this ride at the moment")
    }

    const user = await findUserById(req.user.id)

    const rideWithUser = {
        ...ride,
        user: {
            id: user.id,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email
        }
    }
    matchingCaptains.map((captain) => {
        sendMessageToSocketId(
            captain.socket_id,
            "new-ride",
            rideWithUser
        )
    })
    return res.status(201).json(
        new ApiResponse(
            201,
            ride,
            "Ride created successfully"
        )
    )

})

export const getAvailableVehicles = asyncHandler(async (req, res) => {
    const { pickup } = req.query

    if (!pickup) {
        throw new ApiError(400, 'Pickup location required')
    }

    const { lat, lng } = await getAddressCoordinates(pickup)

    const nearbyCaptains = await getNearbyCaptains(lat, lng, 15)

    const availableVehicleTypes = [...new Set(
        nearbyCaptains.map((captain) => captain.vehicle_type)
    )]

    return res.status(200).json(
        new ApiResponse(200, { availableVehicleTypes }, "Available vehicles fetched")
    )
})

export const changeStatus = asyncHandler(async (req, res) => {
    const { rideId, status, captainId } = req.body

    if (!rideId || !status || !captainId) {
        throw new ApiError(400, "Ride ID, Status and Captain ID are required")
    }
    const updatedRide = await RideService.changeStatus(rideId, status, captainId)

    console.log("updatedRide:", updatedRide.user_socket_id, updatedRide)

    if (status === "accepted") {
        sendMessageToSocketId(
            updatedRide.user_socket_id,
            "ride-confirmed",
            updatedRide
        );
    }

    if (status === "arrived") {
        sendMessageToSocketId(
            updatedRide.user_socket_id,
            "ride-arrived",
            {
                rideId: updatedRide.id
            }
        );
    }

    if (status === "ongoing") {
        sendMessageToSocketId(
            updatedRide.user_socket_id,
            "ride-started",
            updatedRide
        )
    }

    if (status === "completed") {
        sendMessageToSocketId(
            updatedRide.user_socket_id,
            "ride-completed",
            updatedRide
        );
    }

    return res.status(200).json(
        new ApiResponse(
            200,
            updatedRide,
            "Ride status updated successfully"
        )
    )
})

export const getRideById = asyncHandler(async (req, res) => {

    const { rideId } = req.params

    const ride = await RideService.getRideDetails(rideId)

    return res.status(200).json(
        new ApiResponse(200, ride, "Ride fetched successfully")
    );
});


export const startRide = asyncHandler(async (req, res) => {

})

export const endRide = asyncHandler(async (req, res) => {

})

