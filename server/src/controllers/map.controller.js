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