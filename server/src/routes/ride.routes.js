import { Router } from "express"
import {calculateFare  } from "../controllers/ride.controller.js"
import verifyUserJWT from "../middleware/userAuth.middleware.js"


const router = Router()

router.get("/fare",verifyUserJWT,calculateFare)

export default router
