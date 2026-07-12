import { Router } from "express";
import authRoutes from "./auth.route.js";
import meetingRoutes from "./meeting.route.js";


const router = Router();


router.use("/auth", authRoutes);
router.use("/meetings", meetingRoutes);


export default router;