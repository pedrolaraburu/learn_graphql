import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt';
import { generateToken } from "./JwtService";
import { GraphQLError } from "graphql";

export default class UserService {
    prisma = new PrismaClient();

    public async getUserById(args: { id: number; }) {
        const { id } = args;
        try {
            const user = await this.prisma.user.findUnique({
                where: { id },
            });
            if (!user) {
                throw new GraphQLError('User not found', {extensions: {code: "NOT_FOUND", http: {status: 404}}});
            }
            return user;
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(error.message);
            } else {
                throw new Error('An unknown error occurred');
            }
        }
    }

    public async createUser(args: { email: string; name: string; password: string; }) {
        const { email, name, password } = args;
        try {
            const user = await this.prisma.user.findUnique({
                where: { email },
            });
            if (user) {
                throw new GraphQLError('Email already registered', {extensions: {code: "ALREADY_EXISTS", http: {status: 409}}});
            }
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
            const user = await this.prisma.user.findUnique({
                where: { id },
            });
            if (!user) {
                throw new GraphQLError('User not found', {extensions: {code: "NOT_FOUND", http: {status: 404}}});
            }
            if (password) {
                const hashedPassword = await bcrypt.hash(password, 10);
                const updatedUser = await this.prisma.user.update({
                    where: { id },
                    data: {
                        email,
                        name,
                        password: hashedPassword,
                    },
                });
                return updatedUser;
            }
            const updatedUser = await this.prisma.user.update({
                where: { id },
                data: {
                    email,
                    name
                },
            });
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
            const user = await this.prisma.user.findUnique({
                where: { id },
            });
            if (!user) {
                throw new GraphQLError('User not found', {extensions: {code: "NOT_FOUND", http: {status: 404}}});
            }
            await this.prisma.user.delete({
                where: { id },
            });
            return {message: 'User deleted successfully'}; 
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
                throw new GraphQLError('User not found', {extensions: {code: "NOT_FOUND", http: {status: 404}}});
            }

            const passwordMatch = await bcrypt.compare(password, user.password);

            if (!passwordMatch) {
                throw new GraphQLError('Invalid password or email', {extensions: {code: "INVALID_CREDENTIALS", http: {status: 401}}});
            }

            const token = generateToken({ id: user.id, email: user.email });
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

