import { DataSource } from "typeorm";
import { Config } from "../config/config";
import { Attendance } from "../../entities/attendance";
import { User } from "../../entities/user";

const AppDataSource = new DataSource({
    type: "mysql",
    host: Config.mysqlDbHost,
    port: Config.mysqlDbPort,
    username: Config.mysqlDbUser,
    password: Config.mysqlDbPassword,
    database: Config.mysqlDbName,
    synchronize: true,
    logging: true,
    entities: [
        Attendance, User
    ],
});

export default AppDataSource;
