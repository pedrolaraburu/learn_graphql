import { PrismaClient } from "@prisma/client";
import { GraphQLError } from "graphql";


export default class TaskService {
    prisma = new PrismaClient();


    public async getTasks() {
        const tasks = await this.prisma.task.findMany({
            include: {
                user: true, 
            }
        });
    
        if (tasks.length === 0) {
            throw new GraphQLError('No tasks found', {
                extensions: {
                    code: "NOT_FOUND",
                    http: { status: 404 }
                }
            });
        }
    
        return tasks;
    }
    
    public async getTask(args: { id: number; }) {
        const { id } = args;
        try {
            const task = await this.prisma.task.findUnique({ where: { id } });
            if (!task) {
                throw new GraphQLError('Task not found', {extensions: {code: "NOT_FOUND", http: {status: 404}}});
            }
            return task;
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(error.message);
            } else {
                throw new Error('An unknown error occurred');
            }
        }
    }

    public async getTasksByUser(args: { userId: number; }) {
        const { userId } = args;
        const tasks = await this.prisma.task.findMany({
            where: { userId },
            include: {
                user: true, 
            }
        });
        if (tasks.length === 0) {
            throw new GraphQLError('No tasks found', {
                extensions: {
                    code: "NOT_FOUND",
                    http: { status: 404 }
                }
            });
        }
        return tasks;
    }

    public async createTask(args: { title: string; userId: number; }) {
        const { title, userId } = args;
        try {
            const newTask = await this.prisma.task.create({
                data: {
                    title,
                    userId
                },
                include: {
                    user: true, 
                },
            });
            return newTask;
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(error.message);
            } else {
                throw new Error('An unknown error occurred');
            }
        }
    };

    public async updateTask(args: { id: number; title: string; completed: boolean}) {
        const { id, title, completed } = args;
        try {
            const updatedTask = await this.prisma.task.update({
                where: { id },
                data: {
                    title,
                    completed
                },
            });
            if(!updatedTask) {
                throw new GraphQLError('Task not found', {extensions: {code: "NOT_FOUND", http: {status: 404}}});
            }
            return updatedTask;
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(error.message);
            } else {
                throw new Error('An unknown error occurred');
            }
        }
    };

    public async deleteTask(args: { id: number; }) {
        const { id } = args;
        try {
            await this.prisma.task.delete({
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
    };
}