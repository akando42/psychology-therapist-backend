
import { WriterReaderService } from "../../../../behavior/services/writer-reader-service";
import { TasksHistoryRepositoryInstance } from "../../dao/repositories/tasks-history.repository";
import { ITaskHistory } from "../../models/task-history";


export class TasksHistoryService extends WriterReaderService<ITaskHistory> {
    constructor() {
        super(TasksHistoryRepositoryInstance);
    }

}

export const TasksHistoryServiceInstance: TasksHistoryService = new TasksHistoryService();