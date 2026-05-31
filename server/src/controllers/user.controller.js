import asyncHandler from "../utils/asyncHandler.js"
import * as authService from '../services/user.service.js'
import ApiResponse from "../utils/apiresponse.js"

const register = asyncHandler(async (req, res) => {
    const result = await authService.register(req.body)
    return res.status(201).json(
        new ApiResponse(
            201,
            result,
            "User registered successfully"
        )
    )
})
const login = asyncHandler(async (req, res) => {
    const result = await authService.login(req.body)

    return res.status(200).json(
        new ApiResponse(
            200,
            result,
            "User logged in successfully"
        )
    )
})
const getUser = asyncHandler(async (req, res) => {
    const userId = req.user.id

    const user = await authService.getUser(userId)

    return res.status(200).json(
        new ApiResponse(
            200,
            user,
            "User fetched successfully"
        )
    )
})

export {register,login,getUser}