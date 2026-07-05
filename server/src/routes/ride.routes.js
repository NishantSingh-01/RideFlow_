import { Router } from "express"
import {calculateFare, createRide ,ConfirmRide ,getAvailableVehicles,ArrivedatPickup,endRide,startRide } from "../controllers/ride.controller.js"
import verifyUserJWT from "../middleware/userAuth.middleware.js"
import verifyCaptainJWT from '../middleware/captainAuth.middleware.js'

const router = Router()

router.get("/fare",verifyUserJWT,calculateFare)
router.post( "/create",verifyUserJWT, createRide)
router.get('/available-vehicles', verifyUserJWT, getAvailableVehicles)
router.post("/confirm-ride",verifyCaptainJWT, ConfirmRide)
router.post("/start-ride",verifyCaptainJWT, startRide)
router.post("/end-ride",verifyCaptainJWT, endRide)
router.post("/arrived-at-pickup",verifyCaptainJWT, ArrivedatPickup)

export default router
