import jwt from "jsonwebtoken";
import { Config } from "../config/config";

const getToken = (headers: any) => {
    if (headers && headers.authorization && headers.authorization.includes('Bearer')) {
        const parted = headers.authorization.split(' ');
        if (parted.length === 2) {
            return parted[1];
        }
    }
    return undefined;
};

export class Jwt {
    static generateToken(payload: any): string {
        const secretKey = Config.jwtSecretKey;
        const signOptions: jwt.SignOptions = {
            algorithm: "HS256",
            audience: "97b33193-43ff-4e58-9124-b3a9b9f72c34",
            issuer: Config.issuer,
            expiresIn: "1h",
        };

        return jwt.sign(payload, secretKey, signOptions);
    }

    static verifyToken(req: any, res: any, next: any): void {
        const token = getToken(req.headers);
        if (!token) {
            return res.status(401).json({ error: "No token provided" });
        }

        try {
            const decoded = jwt.verify(token, Config.jwtSecretKey, {
                algorithms: ["HS256"],
                audience: "97b33193-43ff-4e58-9124-b3a9b9f72c34",
                issuer: Config.issuer,
            });

            req.body.usermetadata = decoded;

            next();
        } catch (error) {
            console.log(error)
            return res.status(401).json({ error: "Invalid or expired token" });
        }
    }
}
