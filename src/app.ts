import cors from "cors";
import 'reflect-metadata';
import express from "express";

import { Config } from "./pkg/config/config";
import attendanceHandler from "./domain/attendance/handler";
import { connectToMysql, connectToRedis } from "./pkg/db/connection";

const app = express();
app.use(cors());
app.use(express.json());

const startServer = async () => {
    try {
        await connectToMysql();
        await connectToRedis();

        app.use("/api/attendance", attendanceHandler);

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
