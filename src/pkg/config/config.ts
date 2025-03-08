import dotenv from "dotenv";

dotenv.config();
export const Config = {
    port: process.env.PORT || "3000",

    mysqlDbHost: process.env.MYSQL_DB_HOST || "localhost",
    mysqlDbUser: process.env.MYSQL_DB_USER || "root",
    mysqlDbPassword: process.env.MYSQL_DB_PASSWORD || "password",
    mysqlDbName: process.env.MYSQL_DB_NAME || "my_database",
    mysqlDbPort: parseInt(process.env.MYSQL_DB_PORT || '3306', 10),

    redisHost: process.env.REDIS_HOST || "redis",
    redisPort: parseInt(process.env.REDIS_PORT || '6379', 10),
    redisPassword: process.env.REDIS_PASSWORD || "",
    redisDb: parseInt(process.env.REDIS_DB || '0', 10),
};
