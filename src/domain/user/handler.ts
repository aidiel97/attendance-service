import { Request, Response } from 'express';
import { UserUseCase } from "./use_case";
import { RegisterDto } from "./dto/register";
import { LoginDto } from "./dto/login";
import { ApiResponse } from "../../pkg/api_response";

export class UserHandler {
    static async register(req: Request, res: Response) {
        try {
            const request: RegisterDto = {
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                full_name: req.body.full_name,
            };

            const result = await UserUseCase.register(request);
            return ApiResponse.success(res, result, "User registered");
        } catch (error: any) {
            const errorMessage = error instanceof Error ? error.message : "Internal Server Error";
            return ApiResponse.fail(res, null, errorMessage, 500);
        }
    }

    static async login(req: Request, res: Response) {
        try {
            const request: LoginDto = {
                username: req.body.username,
                password: req.body.password,
            };

            const result = await UserUseCase.login(request);
            return ApiResponse.success(res, result, "Login successful");
        } catch (error: any) {
            const errorMessage = error instanceof Error ? error.message : "Internal Server Error";
            return ApiResponse.fail(res, null, errorMessage, 500);
        }
    }

    static async getList(req: Request, res: Response) {
        try {
            const result = await UserUseCase.getList();
            return ApiResponse.success(res, result, "List user Provided");
        } catch (error: any) {
            const errorMessage = error instanceof Error ? error.message : "Internal Server Error";
            return ApiResponse.fail(res, null, errorMessage, 500);
        }
    }

    static async getProfile(req: Request, res: Response) {
        try {
            const result = await UserUseCase.getProfile(req.body.usermetadata.id);
            return ApiResponse.success(res, result, "Profile Data Provided");
        } catch (error: any) {
            const errorMessage = error instanceof Error ? error.message : "Internal Server Error";
            return ApiResponse.fail(res, null, errorMessage, 500);
        }
    }
}

