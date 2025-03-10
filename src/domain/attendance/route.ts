import { Router } from 'express';
import { AttendanceHandler } from './handler';

const router = Router();

router.get("/status", AttendanceHandler.CheckLastStatus);

router.post("/in", AttendanceHandler.ClockIn);
router.put("/out", AttendanceHandler.ClockOut);

export default router;
