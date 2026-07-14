import { Router } from "express"
import {calculateFare, createRide ,changeStatus ,getAvailableVehicles,endRide,startRide, getRideById } from "../controllers/ride.controller.js"
import verifyUserJWT from "../middleware/userAuth.middleware.js"
import verifyCaptainJWT from '../middleware/captainAuth.middleware.js'

const router = Router()

router.get("/fare",verifyUserJWT,calculateFare)
router.post( "/create",verifyUserJWT, createRide)
router.get('/available-vehicles', verifyUserJWT, getAvailableVehicles)
router.patch("/update-status",verifyCaptainJWT, changeStatus)
router.get("/:rideId/info",verifyUserJWT,getRideById)

//TODO 
router.post("/start-ride",verifyCaptainJWT, startRide)
router.post("/end-ride",verifyCaptainJWT, endRide)

export default router
