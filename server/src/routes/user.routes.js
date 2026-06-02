import express, { Router } from 'express'
import validate from '../middleware/validate.middleware.js'
import { loginSchema, registerSchema } from '../validators/user.validator.js'
import { getUser, login, logout, register } from '../controllers/user.controller.js'
import verifyUserJWT  from '../middleware/userAuth.middleware.js'
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
router.get('/getuser',verifyUserJWT ,getUser)
router.post('/logout',logout)

export default router
