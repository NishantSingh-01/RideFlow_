import { Router } from "express"
import { getAddressCoordinates, getDistanceTime } from "../controllers/map.controller.js"
import verifyUserJWT from "../middleware/userAuth.middleware.js"

const router = Router()

router.post("/coordinates", verifyUserJWT, getAddressCoordinates)
router.get("/distance-time", verifyUserJWT, getDistanceTime)

export default router