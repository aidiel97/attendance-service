import { Response } from 'express';

export class ApiResponse {
    static success(res: Response, data: any, message: string = "Success") {
        return res.status(200).json({
            status: true,
            data,
            message,
        });
    }

    static fail(res: Response, data: any = null, message: string = "Error", statusCode: number = 500) {
        return res.status(statusCode).json({
            status: false,
            data,
            message,
        });
    }
}
