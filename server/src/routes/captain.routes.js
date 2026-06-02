import express, { Router } from 'express'
import validate from '../middleware/validate.middleware.js'
import { loginCaptainSchema, registerCaptainSchema } from '../validators/captain.validator.js'
import verifyCaptainJWT from '../middleware/captainAuth.middleware.js'
import { getCaptain, login, logout, register } from '../controllers/captain.controller.js'

const router = Router() 

router.post(
    "/register",
    validate(registerCaptainSchema),
    register
)
router.post(
    "/login",
    validate(loginCaptainSchema),
    login
)
router.get('/getcaptain',verifyCaptainJWT,getCaptain)
router.post('/logout',logout)

export default router
