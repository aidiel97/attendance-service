import { Router } from 'express';
import { UserHandler } from './handler';

const router = Router();

router.get("/", UserHandler.getList);

router.post("/register", UserHandler.register);
router.post("/login", UserHandler.login);

export default router;
