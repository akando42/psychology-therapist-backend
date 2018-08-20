import { ITaskComment } from "../../models/task-comment";
import { WriteReadController } from "../../../../behavior/controllers/write-read.controller";
import { TasksHistoryServiceInstance } from "./tasks-history.service";




export class TasksHistoryController extends WriteReadController<ITaskComment>{
    constructor() {
        super(TasksHistoryServiceInstance);
    }

}

export const TasksHistoryControllerInstance: TasksHistoryController = new TasksHistoryController();