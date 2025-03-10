import { Router } from 'express';
import { UserHandler } from './handler';
import {Jwt} from "../../pkg/authentication/jwt";

const router = Router();

router.get("/", UserHandler.getList);
router.get("/profile", Jwt.verifyToken, UserHandler.getProfile);

router.post("/register", UserHandler.register);
router.post("/login", UserHandler.login);

export default router;
