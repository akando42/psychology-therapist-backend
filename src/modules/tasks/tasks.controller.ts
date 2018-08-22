import { TasksServiceInstance } from "./tasks.service";
import { WriteReadController } from "../../behavior/controllers/write-read.controller";
import { ITask } from "./models/task";
import { resolve } from "path";
import { NotificationsServiceConection } from "./feight-clients/notifications.service";




export class TasksController extends WriteReadController<ITask>{
    constructor() {
        super(TasksServiceInstance);
    }

    getAllBy(query: any): Promise<ITask[]> {
        return super.getAllBy(query);
    }


    async create(task: ITask): Promise<string> {
        const taskCreatedId = await super.create(task);

        if (taskCreatedId) {
        }

        return resolve(taskCreatedId)

    }


}

export const TasksControllerInstance: TasksController = new TasksController();