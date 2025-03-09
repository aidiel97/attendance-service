import { Router } from 'express';
import { AttendanceHandler } from './handler';

const router = Router();

router.get("/", AttendanceHandler.CheckLastStatus);

router.post("/in", AttendanceHandler.ClockIn);
// router.post("/out", AttendanceHandler.ClockOut);

export default router;
