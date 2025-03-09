import { Between } from "typeorm";
import AppDataSource from "../../../pkg/db/mysql";
import { Attendance } from "../../../entities/attendance";
import {DateTime} from "../../../pkg/datetime/datetime";
import getRedisClient from "../../../pkg/db/redis";

const redisClient = getRedisClient();
const attendanceRepository = AppDataSource.getRepository(Attendance);

export class AttendanceQuery {
    async getRedisAttendanceStatus(user_id: string) {
        return await redisClient.get(`clockin:${user_id}`);
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
