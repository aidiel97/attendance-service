import {Config} from "../config/config";

export class DateTime {
    static nowUTC7(): number {
        return new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Bangkok" })).getTime() / 1000;
    }

    static nowUTC(): number {
        return new Date(new Date().toLocaleString("en-US", { timeZone: "UTC" })).getTime() / 1000;
    }

    static startEndOfDay(time: number): { start: number; end: number } {
        const date = new Date(time);

        const start = new Date(date.setHours(0, 0, 0, 0)).getTime();
        const end = new Date(date.setHours(23, 59, 59, 999)).getTime();

        return { start, end };
    }

    static isWithinWorkingHoursUTC7(): boolean {
        const now = new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Bangkok" }));
        const hours = now.getHours();

        return hours >= Config.startWorkingHour || hours <= Config.endWorkingHour;
    }
}