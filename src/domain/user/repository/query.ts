import AppDataSource from "../../../pkg/db/mysql";
import { User } from "../../../entities/user";

const userRepository = AppDataSource.getRepository(User);

export const findOneById = async (id: number) => {
    return await userRepository.findOneBy({ id });
};

export const find = async (filters?: Partial<User>) => {
    return await userRepository.find({
        where: filters
    });
};
