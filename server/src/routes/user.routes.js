import express, { Router } from 'express'
import validate from '../middleware/validate.middleware.js'
import { loginSchema, registerSchema } from '../validators/user.validator.js'
import { getUser, login, logout, register } from '../controllers/user.controller.js'
import verifyJWT from '../middleware/auth.middleware.js'
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
router.get('/getuser',verifyJWT,getUser)
router.post('/logout',logout)

export default router
