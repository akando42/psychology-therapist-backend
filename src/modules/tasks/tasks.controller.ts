import { TasksServiceInstance } from "./tasks.service";
import { WriteReadController } from "../../behavior/controllers/write-read.controller";
import { ITask } from "../../models/task";




export class TasksController extends WriteReadController<ITask>{
    constructor() {
        super(TasksServiceInstance);
    }
}

export const TasksControllerInstance: TasksController = new TasksController();