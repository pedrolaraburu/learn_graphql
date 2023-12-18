import { PrismaClient } from "@prisma/client";
export default class UserService {
    prisma = new PrismaClient();

    public async createUser(args: { email: string; name: string; password: string; }) {
        const { email, name, password } = args;
        try {
            const newUser = await this.prisma.user.create({
                data: {
                    email,
                    name,
                    password,
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
    }
}