import { Router } from "express"
import {calculateFare, createRide  } from "../controllers/ride.controller.js"
import verifyUserJWT from "../middleware/userAuth.middleware.js"


const router = Router()

router.get("/fare",verifyUserJWT,calculateFare)
router.post( "/create",verifyUserJWT, createRide)
   

export default router
