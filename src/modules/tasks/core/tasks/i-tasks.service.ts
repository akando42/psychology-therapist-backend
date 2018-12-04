import { ITask } from "../../../../models/task";



export interface ITasksService {

    createTask(task: ITask): Promise<ITask>;

    updateTask(task: ITask): Promise<ITask>;

    assignTaskTo(assignedId: number, taskId: number): Promise<ITask>;

}