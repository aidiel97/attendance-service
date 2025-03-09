import AppDataSource from "../../../pkg/db/mysql";
import { Attendance } from "../../../entities/attendance";
import getRedisClient from "../../../pkg/db/redis";

const redisClient = getRedisClient();
const attendanceRepository = AppDataSource.getRepository(Attendance);

export class AttendanceCommand {
    async redisAttendanceStatus(user_id: string, status: string) {
        const key = `clockin:${user_id}`;
        const ttl = 86400;
        await redisClient.set(key, status, "EX", ttl);
    }

    async mysqlCreate(attendanceData: Partial<Attendance>) {
        const attendance = attendanceRepository.create(attendanceData);
        return attendanceRepository.save(attendance);
    }

    async mysqlEdit(id: string, attendanceData: Partial<Attendance>) {
        await attendanceRepository.update(id, attendanceData);
        return attendanceRepository.findOneBy({ id });
    }

    async mysqlRemove(id: string) {
        return attendanceRepository.delete(id);
    }
}
