import { TasksServiceInstance } from "./tasks.service";
import { WriteReadController } from "../../behavior/controllers/write-read.controller";
import { ITask } from "./models/task";




export class TasksController extends WriteReadController<ITask>{
    constructor() {
        super(TasksServiceInstance);
    }


    getByUserAssigned(userId: string): Promise<ITask[]> {
        return TasksServiceInstance.getByUserAssigned(userId);
    }
}

export const TasksControllerInstance: TasksController = new TasksController();