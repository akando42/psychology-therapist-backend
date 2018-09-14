import { AbstractTaskModule } from "./abstract-tasks.module";
import { ITask } from "../../../models/task";
import { TODResponse } from "../../../dto/tod-response";
import { TasksComponent } from "./tasks/tasks.component";
import { TasksCommentsComponent } from "./tasks-comments/tasks-comments.component";


export class TODTasksModule extends AbstractTaskModule {
    constructor(
        _tasksComponent: TasksComponent,
        _tasksCommentsComponent: TasksCommentsComponent
    ) {
        super(
            _tasksComponent,
            _tasksCommentsComponent)
    }

    getTasksComments(taskId: any): Promise<TODResponse> {
        throw new Error("Method not implemented.");
    }

    createTask(task: ITask): Promise<TODResponse> {
        throw new Error("Method not implemented.");
    }
    assignTaskTo(assignedId: number, taskid: number): Promise<TODResponse> {
        throw new Error("Method not implemented.");
    }



}