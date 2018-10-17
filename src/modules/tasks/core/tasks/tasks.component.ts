import { ITask } from "../../../../models/task";
import { ITasksService } from "./i-tasks.service";
import { UsersProfileComponent } from "../../../users/core/user-profile/user-profile.component";
import { ITasksCommentsService } from "../tasks-comments/i-tasks-comments.service";
import { ITasksHistoryRepository } from "../../dao/repositories/tasks-history.repository";
import { ITasksHistory } from "../tasks-action-history/i-task-action-history.service";
import { IUserProfileService } from "../../../users/core/user-profile/user-profile.service.interface";



export class TasksComponent {
    constructor(
        private _taskService: ITasksService,
        private _taskCommentsService: ITasksCommentsService,
        private _usersService: IUserProfileService) {

    }

    async  createTask(task: ITask): Promise<ITask> {
        try {
            //create task
            const taskCreated = await this._taskService.createTask(task);

            return taskCreated;
        } catch (error) {
            return error;
        }

    }

    async assignTaskTo(assigneId: number, taskId: number): Promise<ITask> {
        try {
            //get user
            const user = await this._usersService.getUserById(assigneId);
            //assign
            const task = await this._taskService.assignTaskTo(assigneId, taskId);
            //notify probably but this may be on the notification module
            return task;

        } catch (error) {
            return error;
        }
    }
}