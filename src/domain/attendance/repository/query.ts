import { Between } from "typeorm";
import AppDataSource from "../../../pkg/db/mysql";
import { Attendance } from "../../../entities/attendance";
import {DateTime} from "../../../pkg/datetime/datetime";
import Redis from "ioredis";

const attendanceRepository = AppDataSource.getRepository(Attendance);
const redisKey = 'attendance';

export class AttendanceQuery {
    async getRedisAttendanceStatus(redisClient: Redis, user_id: string): Promise<Attendance | null> {
        const data = await redisClient.get(`${redisKey}:${user_id}`);
        return data ? JSON.parse(data) : null;
    }

    async findOneById(id: string) {
        return attendanceRepository.findOneBy({ id });
    };

    async find(filters?: Partial<Attendance>) {
        return attendanceRepository.find({
            where: {
                ...filters,
                is_deleted: false
            }
        });
    };

    async findUserAttendanceToday(user_id: string) {
        const {start, end} = DateTime.startEndOfDay(DateTime.nowUTC7())
        return attendanceRepository.findOneBy({
            user_id,
            is_deleted: false,
            created_at: Between(start, end),
        });
    };

    async userClockInCheck(user_id: string) {
        return attendanceRepository.findOneBy({
            user_id,
            status: 'IN',
            is_deleted: false
        });
    };
}
