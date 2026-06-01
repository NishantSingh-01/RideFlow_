import asyncHandler from "../utils/asyncHandler.js"
import * as authService from '../services/user.service.js'
import ApiResponse from "../utils/apiresponse.js"

const register = asyncHandler(async (req, res) => {
    const result = await authService.register(req.body)
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
            "User registered successfully"
        )
    )
})
const login = asyncHandler(async (req, res) => {
    const result = await authService.login(req.body)

    const token = result.token
    res.cookie("token", token, {
        httpOnly: true,
        secure: false,
        maxAge: 7 * 24 * 60 * 60 * 1000
    })

    return res.status(200).json(
        new ApiResponse(
            200,
            result.user,
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
const logout = asyncHandler(async (req, res) => {
   res.clearCookie("token")
   return res.status(200).json(
        new ApiResponse(
            200,
            "User Logout successfully"
        )
    )
})
export { register, login, getUser,logout }