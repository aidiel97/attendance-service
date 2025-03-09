import cors from "cors";
import "reflect-metadata";
import express from "express";
import userRouter from "./domain/user/route"
import attendanceRouter from "./domain/attendance/route"

import { Config } from "./pkg/config/config";
import { connectToMysql, connectToRedis } from "./pkg/db/connection";
import {Jwt} from "./pkg/authentication/jwt";

const app = express();
app.use(cors());
app.use(express.json());

const startServer = async () => {
    try {
        await connectToMysql();
        await connectToRedis();

        app.use("/v1/attendance", Jwt.verifyToken, attendanceRouter);
        app.use("/v1/user", userRouter);

        const PORT = Config.port;
        app.listen(PORT, () => {
            console.log(`=====Server running on port ${PORT}`);
        });
    } catch (error) {
        const err = error as Error;
        console.error("Error during server startup:", err.message);
        process.exit(1);
    }
};

startServer();
