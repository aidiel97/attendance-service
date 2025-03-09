import {DateTime} from "../../pkg/datetime/datetime";
import {AttendanceCommand} from "./repository/command";
import {AttendanceQuery} from "./repository/query";
import getRedisClient from "../../pkg/db/redis";

const attendanceCommand = new AttendanceCommand();
const attendanceQuery = new AttendanceQuery();

export class AttendanceUseCase {
    static async checkLastStatus(user_id: string) {
        return attendanceQuery.findUserAttendanceToday(user_id);
    }

    static async clockIn(user_id: string) {
        const now = DateTime.nowUTC7();
        if (DateTime.isWithinWorkingHoursUTC7()) {
            throw new Error("Outside Working Hour");
        }

        const redisClockIn = await attendanceQuery.getRedisAttendanceStatus(user_id);
        console.log(redisClockIn)
        if (redisClockIn) {
            throw new Error("Already Clocked In");
        }

        const clockInCheck = await attendanceQuery.findUserAttendanceToday(user_id)
        if (clockInCheck) {
            throw new Error("Already Clock In");
        }

        const status = 'IN'
        await attendanceCommand.redisAttendanceStatus(user_id, status)
        return attendanceCommand.mysqlCreate({
            user_id,
            clock_in: now,
            clock_out: 0,
            status,
            is_deleted: false,
            created_at: now,
            updated_at: now
        });
    }
}
