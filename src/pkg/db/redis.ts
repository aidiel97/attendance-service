import Redis from 'ioredis';
import { Config } from "../config/config";

let redisClient: Redis | null = null;

const getRedisClient = (): Redis => {
    if (!redisClient) {
        redisClient = new Redis({
            host: Config.redisHost,
            port: Config.redisPort,
            password: Config.redisPassword,
            db: Config.redisDb,
        });
    }

    return redisClient;
};

export default getRedisClient;
