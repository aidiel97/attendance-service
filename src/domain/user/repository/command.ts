import AppDataSource from "../../../pkg/db/mysql";
import { User } from "../../../entities/user";

const userRepository = AppDataSource.getRepository(User);

export const create = async (userData: Partial<User>) => {
    const user = userRepository.create(userData);
    return await userRepository.save(user);
};

export const edit = async (id: number, userData: Partial<User>) => {
    await userRepository.update(id, userData);
    return await userRepository.findOneBy({ id });
};

export const remove = async (id: number) => {
    return await userRepository.delete(id);
};

