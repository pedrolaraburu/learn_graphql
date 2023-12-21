import { sign, SignOptions, verify, decode } from 'jsonwebtoken';
import dotenv from "dotenv";
dotenv.config();

const jwtConfig: SignOptions = {
    expiresIn: "1d",
    algorithm: "HS256",
};

const SECRET = process.env.SECRET_KEY as string;

export default class JwtService {

    public generateToken(args: { id: number; email: string;}) {
        return sign(args, SECRET, jwtConfig);
    };

    public static async verifyToken(token: string) {
        return verify(token, SECRET, jwtConfig);
    };

    public decodeToken(token: string) {
        return decode(token);
    };

    public async getUserId(token: string) {
        const id = this.decodeToken(token);
        return id;
    }
}