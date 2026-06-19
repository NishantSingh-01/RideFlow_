import { Router } from "express"
import { getAddressCoordinates } from "../controllers/map.controller.js"
import verifyUserJWT from "../middleware/userAuth.middleware.js"

const router = Router()

router.post("/coordinates", verifyUserJWT,getAddressCoordinates)

export default router