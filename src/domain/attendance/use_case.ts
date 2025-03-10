import {DateTime} from "../../pkg/datetime/datetime";
import {AttendanceCommand} from "./repository/command";
import {AttendanceQuery} from "./repository/query";
import {Attendance} from "../../entities/attendance";
import getRedisClient from "../../pkg/db/redis";
import { getElasticsearchClient } from "../../pkg/db/elastic"

const attendanceCommand = new AttendanceCommand();
const attendanceQuery = new AttendanceQuery();

export class AttendanceUseCase {
    static async checkLastStatus(user_id: string) {
        const attendance = await attendanceQuery.mysqlFindUserAttendanceToday(user_id);
        if (!attendance) {
            throw new Error("Outside Working Hour");
        }
        return {
            user_id: attendance.user_id,
            status: attendance.status,
            clock_in: attendance.clock_in,
            clock_out: attendance.clock_out,
        }
    }

    static async clockIn(user_id: string) {
        const status = 'IN'
        const now = DateTime.nowUTC7();
        const redisClient = getRedisClient();

        if (!DateTime.isWithinWorkingHoursUTC7()) {
            throw new Error("Outside Working Hour");
        }

        const redisClockIn = await attendanceQuery.getRedisAttendanceStatus(redisClient, user_id);
        if (redisClockIn) {
            throw new Error("Already Clocked In");
        }

        const clockInCheck = await attendanceQuery.mysqlFindUserAttendanceToday(user_id)
        if (clockInCheck) {
            throw new Error("Already Clock In");
        }

        try {
            const attendanceData = await attendanceCommand.mysqlCreate({
                user_id,
                clock_in: now,
                clock_out: 0,
                status,
                is_deleted: false,
                created_at: now,
                updated_at: now
            });

            await attendanceCommand.redisAttendanceStatus(redisClient, attendanceData, now)
            return attendanceData
        } catch (error) {
            console.error("Failed to clock in:", error);
            throw error;
        }
    }

    static async clockOut(user_id: string) {
        const status = 'OUT'
        const now = DateTime.nowUTC7();
        const redisClient = getRedisClient();
        const elasticsearchClient = getElasticsearchClient();

        let attendance;
        attendance = await attendanceQuery.getRedisAttendanceStatus(redisClient, user_id);
        if (!attendance) {
            attendance = await attendanceQuery.mysqlFindUserAttendanceToday(user_id)
            if (!attendance) {
                throw new Error("Need to Clocked In First");
            }
        }

        if (attendance?.status == 'OUT') {
            throw new Error("Already Clocked Out");
        }

        try {
            const attendanceData = await attendanceCommand.mysqlEdit(attendance.id, {
                status,
                clock_out: now,
                updated_at: now
            });
            if (attendanceData) {
                await attendanceCommand.redisAttendanceStatus(redisClient, attendanceData, now);

                await elasticsearchClient.index({
                    index: 'attendance',
                    id: attendanceData.id.toString(),
                    body: {
                        user_id: user_id,
                        status: status,
                        clock_out: now,
                        updated_at: now,
                        created_at: attendanceData.created_at
                    }
                });

                return attendanceData;
            } else {
                console.log("Attendance record not found.");
            }

        } catch (error) {
            console.error("Failed to clock out:", error);
            throw error
        }
    }

    static async report() {
        return await attendanceQuery.mysqlFind();
    }
}
