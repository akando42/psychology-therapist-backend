import { WriteReadController } from "../../../../behavior/controllers/write-read.controller";
import { TasksHistoryServiceInstance } from "./tasks-history.service";
import { ITaskHistory } from "../../models/task-history";




export class TasksHistoryController extends WriteReadController<ITaskHistory>{
    constructor() {
        super(TasksHistoryServiceInstance);
    }

}

export const TasksHistoryControllerInstance: TasksHistoryController = new TasksHistoryController();