import AppDataSource from "../../../pkg/db/mysql";
import { Attendance } from "../../../entities/attendance";

const attendanceRepository = AppDataSource.getRepository(Attendance);

export const create = async (attendanceData: Partial<Attendance>) => {
    const attendance = attendanceRepository.create(attendanceData);
    return await attendanceRepository.save(attendance);
};

export const edit = async (id: number, attendanceData: Partial<Attendance>) => {
    await attendanceRepository.update(id, attendanceData);
    return await attendanceRepository.findOneBy({ id });
};

export const remove = async (id: number) => {
    return await attendanceRepository.delete(id);
};

