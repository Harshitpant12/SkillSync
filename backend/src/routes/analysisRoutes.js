import { Router } from "express"

import optionalAuth from "../middleware/optionalAuth.js"
import upload from "../middleware/multer.js"
import runAnalysis from "../controllers/analysisController.js"


const router = Router()

router.route('/run').post(optionalAuth, upload.single("resume"), runAnalysis)

export default router