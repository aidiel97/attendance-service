import AppDataSource from "../../../pkg/db/mysql";
import { User } from "../../../entities/user";
import Redis from "ioredis";
import {Attendance} from "../../../entities/attendance";

const userRepository = AppDataSource.getRepository(User);
const redisKey = 'user';

export class UserQuery {
    async getProfileRedis(redisClient: Redis, id: string): Promise<Attendance | null> {
        const data = await redisClient.get(`${redisKey}-profile:${id}`);
        return data ? JSON.parse(data) : null;
    }

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
