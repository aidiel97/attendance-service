import { Request, Response } from 'express';
import { AttendanceUseCase } from "./use_case";
import { ApiResponse } from "../../pkg/api_response";

export class AttendanceHandler {

    static async ClockIn(req: Request, res: Response) {
        try {
            const result = await AttendanceUseCase.clockIn(req.body.usermetadata.id);
            return ApiResponse.success(res, result, "Status Received");
        } catch (error: any) {
            const errorMessage = error instanceof Error ? error.message : "Internal Server Error";
            return ApiResponse.fail(res, null, errorMessage, 500);
        }
    }

    static async CheckLastStatus(req: Request, res: Response) {
        try {
            const result = await AttendanceUseCase.checkLastStatus(req.body.usermetadata.id);
            return ApiResponse.success(res, result, "Status Received");
        } catch (error: any) {
            const errorMessage = error instanceof Error ? error.message : "Internal Server Error";
            return ApiResponse.fail(res, null, errorMessage, 500);
        }
    }
}

