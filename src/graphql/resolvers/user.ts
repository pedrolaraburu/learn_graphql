import { PrismaClient } from '@prisma/client';
import UserService from '../../service/UserService';

const prisma = new PrismaClient();
const userService = new UserService();

export default {
    Query : {
        users: () => prisma.user.findMany(),
        user: async (_: any, { id }: any) => {
            const userid = parseInt(id);
            prisma.user.findUnique({ where: { id: userid } })
        },
    }, 
    Mutation: {
        createUser: (_: any, args: any) => {
            return userService.createUser(args);
        }
    }
}