import { ITaskComment } from "../../models/task-comment";
import { WriteReadController } from "../../../../behavior/controllers/write-read.controller";
import { TasksCommentsServiceInstance } from "./tasks-comments.service";




export class TasksCommentsController extends WriteReadController<ITaskComment>{
    constructor() {
        super(TasksCommentsServiceInstance);
    }

}

export const TasksCommentsControllerInstance: TasksCommentsController = new TasksCommentsController();