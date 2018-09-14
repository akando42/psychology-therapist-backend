import { ITask } from "../../../models/task";
import { TODResponse } from "../../../dto/tod-response";
import { TasksComponent } from "./tasks/tasks.component";
import { TasksCommentsComponent } from "./tasks-comments/tasks-comments.component";



export abstract class AbstractTaskModule {

    constructor(
        protected _taskComponent: TasksComponent,
        protected _tasksCommentsComponent: TasksCommentsComponent) {

    }

    abstract createTask(task: ITask): Promise<TODResponse>;

    abstract assignTaskTo(assignedId: number, taskid: number): Promise<TODResponse>;

    abstract getTasksComments(taskId): Promise<TODResponse>;

    // abstract 

}