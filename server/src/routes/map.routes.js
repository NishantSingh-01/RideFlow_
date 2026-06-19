import { Router } from "express"
import { getAddressCoordinates, getDistanceTime, getRoute } from "../controllers/map.controller.js"
import verifyUserJWT from "../middleware/userAuth.middleware.js"

const router = Router()

router.post("/coordinates", verifyUserJWT, getAddressCoordinates)
router.get("/distance-time", verifyUserJWT, getDistanceTime)
router.get("/route", getRoute)

export default router