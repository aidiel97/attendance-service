import AppDataSource from "../../../pkg/db/mysql";
import { User } from "../../../entities/user";

const userRepository = AppDataSource.getRepository(User);

export class UserQuery {
    async mysqlFindOneById(id: string) {
        return userRepository.findOneBy({ id });
    };

    async mysqlFindOneByUsername(username: string) {
        return userRepository.findOneBy({ username, is_deleted: false });
    };

    async mysqlFind(filters?: Partial<User>) {
        return userRepository.find({
            where: {
                ...filters,
                is_deleted: false
            }
        });
    };
}
