import TaskService from '../../service/TaskService';

const taskService = new TaskService();

export default {
    Query : {
        getTasks: () => taskService.getTasks(),
        getTask: (_: null, args: { id: number; }) => {
            return taskService.getTask(args);
        },
        getTasksByUser: (_: null, args: { userId: number; }) => {
            return taskService.getTasksByUser(args);
        }
    },
    Mutation: {
        createTask: (_: null, args: {title: string, userId: number}) => {
            return taskService.createTask(args);
        },
        updateTask: (_: null, args: {id: number, title: string, completed: boolean}) => {
            return taskService.updateTask(args);
        },
        deleteTask: (_: null, args: {id: number}) => {
            return taskService.deleteTask(args);
        }
    }
}
