import express, { Router } from 'express'
import validate from '../middleware/validate.middleware.js'
import { loginSchema, registerSchema } from '../validators/user.validator.js'
import { login, register } from '../controllers/user.controller.js'
const router = Router() 

router.post(
    "/register",
    validate(registerSchema),
    register
)
router.post(
    "/login",
    validate(loginSchema),
    login
)

export default router
