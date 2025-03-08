export class DateTime {
    static nowUTC7(): number {
        return new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Bangkok" })).getTime() / 1000;
    }

    static nowUTC(): number {
        return new Date(new Date().toLocaleString("en-US", { timeZone: "UTC" })).getTime() / 1000;
    }
}