import { Router } from "express"
import {calculateFare, createRide ,ConfirmRide } from "../controllers/ride.controller.js"
import verifyUserJWT from "../middleware/userAuth.middleware.js"
import verifyCaptainJWT from '../middleware/captainAuth.middleware.js'

const router = Router()

router.get("/fare",verifyUserJWT,calculateFare)
router.post( "/create",verifyUserJWT, createRide)
router.post("/confirm-ride",verifyCaptainJWT, ConfirmRide)
   

export default router
