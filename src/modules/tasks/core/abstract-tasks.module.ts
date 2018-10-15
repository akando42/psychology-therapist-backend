import { ITask } from "../../../models/task";
import { TODResponse } from "../../../dto/tod-response";
import { TasksComponent } from "./tasks/tasks.component";



export abstract class AbstractTaskModule {

    constructor(
        protected _taskComponent: TasksComponent) {

    }

    abstract createTask(task: ITask): Promise<TODResponse>;

    abstract assignTaskTo(assignedId: number, taskid: number): Promise<TODResponse>;

    abstract getTasksComments(taskId): Promise<TODResponse>;

    // abstract 

}