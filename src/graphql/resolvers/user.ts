import { PrismaClient } from '@prisma/client';
import UserService from '../../service/UserService';

const prisma = new PrismaClient();
const userService = new UserService();

export default {
    Query : {
        users: () => prisma.user.findMany(),
        user: (_: null, args: { id: number; }) => {
            return userService.getUserById(args);
        },
    }, 
    Mutation: {
        createUser: (_: null, args: {name: string, email: string, password: string}) => {
            return userService.createUser(args);
        },
        updateUser: (_: null, args: {id: number, name: string, email: string, password: string}) => {
            return userService.updateUser(args);
        },
        deleteUser: (_: null, args: {id: number}) => {
            return userService.deleteUser(args);
        },
        login(_ : null, args: {email: string, password: string}) {
            return userService.login(args);
        }
    }
}