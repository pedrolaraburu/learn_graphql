import { sign, SignOptions, verify, decode } from 'jsonwebtoken';
import dotenv from "dotenv";
dotenv.config();

const jwtConfig: SignOptions = {
    expiresIn: "1d",
    algorithm: "HS256",
};

const SECRET = process.env.SECRET_KEY as string;

export const generateToken = (args: { id: number; email: string;}) => {
    return sign(args, SECRET, jwtConfig);
};

export const verifyToken = async (token: string) => {
    return verify(token, SECRET, jwtConfig);
};

export const decodeToken = (token: string) => {
    return decode(token);
};

export const getUserId = async (token: string) => {
    const id = decodeToken(token);
    return id;
};
