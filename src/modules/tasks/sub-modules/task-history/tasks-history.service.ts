
import { ITaskComment } from "../../models/task-comment";
import { WriterReaderService } from "../../../../behavior/services/writer-reader-service";
import { TasksHistoryRepositoryInstance } from "../../dao/repositories/tasks-history.repository";


export class TasksHistoryService extends WriterReaderService<ITaskComment> {
    constructor() {
        super(TasksHistoryRepositoryInstance);
    }

}

export const TasksHistoryServiceInstance: TasksHistoryService = new TasksHistoryService();