import { DataSource } from "typeorm";
import { Config } from "../config/config"; // Pastikan Anda sudah mengonfigurasi config Anda
import { Attendance } from "../../entities/attendance"; // Import entities Anda

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
        Attendance,
    ],
});

export default AppDataSource;
