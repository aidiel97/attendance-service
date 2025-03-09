import AppDataSource from "../../../pkg/db/mysql";
import { User } from "../../../entities/user";

const userRepository = AppDataSource.getRepository(User);

export class UserCommand {
    async mysqlCreate(userData: Partial<User>) {
        const user = userRepository.create(userData);
        return userRepository.save(user);
    }

    async mysqlEdit(id: string, userData: Partial<User>) {
        await userRepository.update(id, userData);
        return userRepository.findOneBy({ id });
    }

    async mysqlRemove(id: string) {
        return userRepository.delete(id);
    }
}
