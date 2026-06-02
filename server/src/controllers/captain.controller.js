import asyncHandler from "../utils/asyncHandler.js"
import * as CaptainService from '../services/captian.service.js'
import ApiResponse from "../utils/apiresponse.js"

const register = asyncHandler(async (req, res) => {
    const result = await CaptainService.register(req.body)
    const token = result.token
    res.cookie("token", token, {
        httpOnly: true,
        secure: false,
        maxAge: 7 * 24 * 60 * 60 * 1000
    })
    return res.status(201).json(
        new ApiResponse(
            201,
            result,
            "Captain registered successfully"
        )
    )
})
const login = asyncHandler(async (req, res) => {
    const result = await CaptainService.login(req.body)

    const token = result.token
    res.cookie("token", token, {
        httpOnly: true,
        secure: false,
        maxAge: 7 * 24 * 60 * 60 * 1000
    })

    return res.status(200).json(
        new ApiResponse(
            200,
            result,
            "Captain logged in successfully"
        )
    )
})
const getCaptain = asyncHandler(async (req, res) => {
    const captainId = req.captain.id
    const captain = await CaptainService.getCaptain(captainId)

    return res.status(200).json(
        new ApiResponse(
            200,
            captain,
            "Captain fetched successfully"
        )
    )
})
const logout = asyncHandler(async (req, res) => {
   res.clearCookie("token")
   return res.status(200).json(
        new ApiResponse(
            200,
            "Captain Logout successfully"
        )
    )
})
export { register, login, getCaptain,logout }