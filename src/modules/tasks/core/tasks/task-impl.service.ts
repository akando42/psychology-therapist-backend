import { ITasksService } from "./i-tasks.service";
import { ITask } from "../../../../models/task";
import { isNullOrUndefined } from "util";
import { ITasksRepository } from "../../dao/repositories/tasks.repository";
import { ComposeValidation, Validate } from "../../../../core/validations/validate.notation";
import { Required } from "../../../../core/validations/validation.function";



export class TaskImplService implements ITasksService {

    constructor(private _tasksRepository: ITasksRepository) { }

    @Validate([{ name: 'task', cb: Required, parameterIndex: 0 }])
    async createTask(task: ITask): Promise<ITask> {
        const taskCreated: ITask = await this._tasksRepository.createTask(task);
        return taskCreated;
    }

    updateTask(task: ITask): Promise<ITask> {
        throw new Error("Method not implemented.");
    }

    @Validate([
        { name: 'assignedId', cb: Required, parameterIndex: 0 },
        { name: 'taskId', cb: Required, parameterIndex: 1 }
    ])
    async assignTaskTo(assignedId: number, taskId: number): Promise<ITask> {
        const tasksExist = await this._tasksRepository.getTaskById(taskId);
        if (isNullOrUndefined(tasksExist)) {
            throw { message: 'task does not exist' };
        }
        //set new assigned
        tasksExist.assignedTo = assignedId;
        
        const updated = await this._tasksRepository.updateTask(tasksExist);
        return updated;
    }


}