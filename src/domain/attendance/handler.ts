import { Router } from 'express';
import MysqlConnect from '../../pkg/db/mysql';

const router = Router();

router.get("/", (req, res) => {
    res.status(200).json({});
});

export default router;
