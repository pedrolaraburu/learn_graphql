import { PrismaClient } from '@prisma/client';
import UserService from '../../service/UserService';

const prisma = new PrismaClient();
const userService = new UserService();

export default {
    Query : {
        users: () => prisma.user.findMany(),
        user: async (_: any, { id }: any) => {
            const user = prisma.user.findUnique({ where: { id } });
            if (!user) {
                throw new Error('User not found');
            }
        },
    }, 
    Mutation: {
        createUser: (_: any, args: any) => {
            return userService.createUser(args);
        },
        updateUser: (_: any, args: any) => {
            return userService.updateUser(args);
        },
        deleteUser: (_: any, args: any) => {
            return userService.deleteUser(args);
        },
        login(_ : any, args: any) {
            return userService.login(args);
        }
    }
}