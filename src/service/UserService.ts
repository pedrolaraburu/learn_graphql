import { PrismaClient } from "@prisma/client";
import JwtService from "./JwtService";
import bcrypt from 'bcrypt';
export default class UserService {
    prisma = new PrismaClient();
    jwt = new JwtService();

    public async createUser(args: { email: string; name: string; password: string; }) {
        const { email, name, password } = args;
        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = await this.prisma.user.create({
                data: {
                    email,
                    name,
                    password: hashedPassword,
                },
            });
            return newUser;
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(error.message);
            } else {
                throw new Error('An unknown error occurred');
            }
        }
    };
    public async updateUser(args: { id: number; email: string; name: string; password: string; }) {
        const { id, email, name, password } = args;
        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            const updatedUser = await this.prisma.user.update({
                where: { id },
                data: {
                    email,
                    name,
                    password: hashedPassword,
                },
            });
            if(!updatedUser) {
                throw new Error('User not found');
            }
            return updatedUser;
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(error.message);
            } else {
                throw new Error('An unknown error occurred');
            }
        }
    };

    public async deleteUser(args: { id: number; }) {
        const { id } = args;
        try {
            await this.prisma.user.delete({
                where: { id },
            });
            return true; 
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(error.message);
            } else {
                throw new Error('An unknown error occurred');
            }
        }
    }
    
    public async login(args: { email: string; password: string }) {
        const { email, password } = args;
        try {
            const user = await this.prisma.user.findUnique({
                where: { email },
            });

            if (!user) {
                throw new Error('User not found');
            }

            const passwordMatch = await bcrypt.compare(password, user.password);

            if (!passwordMatch) {
                throw new Error('Invalid password');
            }

            const token = this.jwt.generateToken({ id: user.id, email: user.email });
            return token;
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(error.message);
            } else {
                throw new Error('An unknown error occurred');
            }
        }
    }
}

