import {RegisterDto} from "./dto/register";
import {LoginDto} from "./dto/login";
import {DateTime} from "../../pkg/datetime/datetime";
import {UserCommand} from "./repository/command";
import {UserQuery} from "./repository/query";
import {Jwt} from "../../pkg/authentication/jwt";

const userCommand = new UserCommand();
const userQuery = new UserQuery();

export class UserUseCase {
    static async register(registerDto: RegisterDto) {
        const now = DateTime.nowUTC7();

        return userCommand.mysqlCreate({
            username: registerDto.username,
            email: registerDto.email,
            password: registerDto.password,
            full_name: registerDto.full_name,
            is_deleted: false,
            created_at: now,
            updated_at: now,
        })
    }

    static async login(loginDto: LoginDto) {
        const now = DateTime.nowUTC7();
        const user = await userQuery.mysqlFindOneByUsername(loginDto.username)
        if (!user) {
            throw new Error("User not found");
        }
        if (user.password != loginDto.password) {
            throw new Error("Invalid password");
        }

        return Jwt.generateToken({
            id: user.id,
            username: user.username
        });
    }

    static async getList() {
        const response = []
        const userData = await userQuery.mysqlFind();
        for (const user of userData) {
            response.push({
                id: user.id,
                username: user.username,
                email: user.email,
                fullName: user.full_name
            })
        }

        return response;
    }
}
