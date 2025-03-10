import AppDataSource from "../../../pkg/db/mysql";
import { Attendance } from "../../../entities/attendance";
import getRedisClient from "../../../pkg/db/redis";
import Redis from "ioredis";
import {AttendanceHandler} from "../handler";

const attendanceRepository = AppDataSource.getRepository(Attendance);
const redisKey = 'attendance';

export class AttendanceCommand {
    async redisAttendanceStatus(redisClient: Redis, attendance: Attendance, timestamp: number) {
        const key = `${redisKey}:${attendance.user_id}`;
        const ttl = 86400;
        const data = JSON.stringify(attendance);

        await redisClient.set(key, data, "EX", ttl);
    }

    async mysqlCreate(attendanceData: Partial<Attendance>) {
        const attendance = attendanceRepository.create(attendanceData);
        return attendanceRepository.save(attendance);
    }

    async mysqlEdit(id: string, attendanceData: Partial<Attendance>) {
        try {
            await attendanceRepository.update(id, attendanceData);
            return await attendanceRepository.findOneBy({ id });
        } catch (error) {
            console.error("Error in mysqlEdit:", error);
            throw error;
        }
    }

    async mysqlRemove(id: string) {
        return attendanceRepository.delete(id);
    }
}
