import { FindOptionsWhere, Between } from "typeorm";
import AppDataSource from "../../../pkg/db/mysql";
import { Attendance } from "../../../entities/attendance";

const attendanceRepository = AppDataSource.getRepository(Attendance);

export const findOneById = async (id: number) => {
    return await attendanceRepository.findOneBy({ id });
};

export const find = async (filters?: FindOptionsWhere<Attendance>) => {
    return await attendanceRepository.find({
        where: filters
    });
};

export const findDataInRange = async (startDate: string, endDate: string) => {
    return await attendanceRepository.find({
        where: {
            created_at: Between(new Date(startDate), new Date(endDate))
        }
    });
};