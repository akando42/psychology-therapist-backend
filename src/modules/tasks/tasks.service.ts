import { WriterReaderService } from "../../behavior/services/writer-reader-service";
import { TasksRepoInstance } from "./dao/repositories/tasks.repository";
import { ITask } from "./models/task";
import { GetByQuery } from "../../query-spec/my-sql/get-by.query";

export class TasksService extends WriterReaderService<ITask> {
    constructor() {
        super(TasksRepoInstance);
    }


    getById(taskID: string): Promise<ITask> {
        return TasksRepoInstance.getBy(new GetByQuery({ TaskID: taskID }).toDBQuery('TASKS'));
    }

}

export const TasksServiceInstance: TasksService = new TasksService();