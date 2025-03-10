import AppDataSource from "../../../pkg/db/mysql";
import { User } from "../../../entities/user";
import Redis from "ioredis";
import {Attendance} from "../../../entities/attendance";

const userRepository = AppDataSource.getRepository(User);
const redisKey = 'user';

export class UserCommand {
    async redisProfile(redisClient: Redis, user: User) {
        const key = `${redisKey}-profile:${user.id}`;
        const ttl = 86400;
        const data = JSON.stringify({
            username: user.username,
            email: user.email,
            full_name: user.full_name
        }); // ToDo: use entitites for profiles (user intheritance)

        await redisClient.set(key, data, "EX", ttl);
    }

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
