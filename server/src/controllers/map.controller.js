import asyncHandler from "../utils/asyncHandler.js";
import * as MapServices from '../services/map.service.js'
import ApiResponse from "../utils/apiresponse.js";

export const getAddressCoordinates = asyncHandler(async (req, res) => {
    const { address } = req.body

    const { lat, lng } = await MapServices.getAddressCoordinates(address)
    return res.status(201).json(
        new ApiResponse(
            201,
            {
                lat: lat,
                lng: lng
            }
            ,
            "Address coordinates fetched successfully"
        )
    )
})

export const getDistanceTime = asyncHandler(async (req, res) => {
    const { origin, destination } = req.query
    const data = await MapServices.getDistanceTime(
        origin,
        destination
    )
    return res.status(200).json(
        new ApiResponse(
            200,
            data,
            "Distance and duration fetched successfully"
        )
    )
})

export const getRoute = asyncHandler(async (req, res) => {
    const { pickup, destination } = req.query

    const route = await MapServices.getRoute(
        pickup,
        destination
    )
    return res.status(200).json(
        new ApiResponse(
            200,
            route,
            "Route fetched successfully"
        )
    )
})

export const getSuggestions = asyncHandler(async(req, res) => {
    const { input } = req.query

    const suggestions = await MapServices.getSuggestions(input)
    return res.status(200).json(
        new ApiResponse(
            200,
            suggestions,
            "Suggestion fetched successfully"
        )
    )
})