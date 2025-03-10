import getRedisClient from './redis';
import AppDataSource from "./mysql";

const connectToMysql = async () => {
    try {
        await AppDataSource.initialize();
        console.log("=====Connected to Mysql!");
    } catch (error) {
        console.error("Error during DataSource initialization:", error);
        throw error;
    }
};

const connectToRedis = (): Promise<void> => {
    return new Promise((resolve, reject) => {
        const redisClient = getRedisClient();
        redisClient.on('connect', () => {
            console.log("=====Connected to Redis!");
            resolve();
        });

        redisClient.on('error', (err) => {
            console.error("Error connecting to Redis:", err);
            reject(new Error("Redis connection failed"));
        });
    });
};

export { connectToRedis, connectToMysql }