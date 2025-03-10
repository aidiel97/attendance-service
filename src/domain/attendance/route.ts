import { Router } from 'express';
import { AttendanceHandler } from './handler';
import {UserHandler} from "../user/handler";

const router = Router();

router.get("/status", AttendanceHandler.CheckLastStatus);
router.get("/report", AttendanceHandler.Report)

router.post("/in", AttendanceHandler.ClockIn);
router.put("/out", AttendanceHandler.ClockOut);

export default router;
