
import { ITaskComment } from "../../models/task-comment";
import { WriterReaderService } from "../../../../behavior/services/writer-reader-service";
import { TasksCommentsRepositoryInstance } from "../../dao/repositories/tasks-comments.repository";


export class TasksCommentsService extends WriterReaderService<ITaskComment> {
    constructor() {
        super(TasksCommentsRepositoryInstance);
    }

}

export const TasksCommentsServiceInstance: TasksCommentsService = new TasksCommentsService();