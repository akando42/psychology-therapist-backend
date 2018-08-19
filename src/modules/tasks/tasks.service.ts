import { WriterReaderService } from "../../behavior/services/writer-reader-service";
import { TasksRepoInstance } from "./dao/repositories/tasks.repository";
import { ITask } from "./models/task";

export class TasksService extends WriterReaderService<ITask> {
    constructor() {
        super(TasksRepoInstance);
    }

    getByUserAssigned(userId: string): Promise<ITask[]> {
        return TasksRepoInstance.getByUserAssigned(userId);
    }
}

export const TasksServiceInstance: TasksService = new TasksService();