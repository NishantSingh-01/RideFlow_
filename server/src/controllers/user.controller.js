import asyncHandler from "../utils/asyncHandler.js"
import * as authService from "../services/auth.service.js"
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
export {register,login}