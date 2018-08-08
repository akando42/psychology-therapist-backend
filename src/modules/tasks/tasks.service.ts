import { WriterReaderService } from "../../behavior/services/writer-reader-service";
import { TasksRepoInstance } from "./dao/repositories/accounts.repository";
import { ITask } from "../../models/task";

export class TasksService extends WriterReaderService<ITask> {
    constructor() {
        super(TasksRepoInstance);
    }


}

export const TasksServiceInstance: TasksService = new TasksService();