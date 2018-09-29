import { ITasksService } from "./i-tasks.service";
import { ITask } from "../../../../models/task";
import { isNullOrUndefined } from "util";
import { AbstractTasksRepository } from "../../dao/repositories/tasks.repository";



export class TaskImplService implements ITasksService {

    constructor(private _tasksRepository: AbstractTasksRepository) { }

    async createTask(task: ITask): Promise<ITask> {
        if (isNullOrUndefined(task)) {
            throw { message: 'no task provided' };
        }

        const taskCreated: ITask = await this._tasksRepository.createTask(task);
        return taskCreated;
    }
    updateTask(task: ITask): Promise<ITask> {
        throw new Error("Method not implemented.");
    }
    assignTaskTo(assignedId: number, taskId: number): Promise<ITask> {
        throw new Error("Method not implemented.");
    }


}