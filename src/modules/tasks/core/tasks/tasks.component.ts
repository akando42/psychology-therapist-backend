import { ITask } from "../../../../models/task";
import { ITasksService } from "./i-tasks.service";
import { UsersProfileComponent } from "../../../users/core/user-profile/user-profile.component";



export class TasksComponent {
    constructor(
        private _taskService: ITasksService,
        private _userComponent: UsersProfileComponent) {

    }


    createTask(task: ITask): Promise<ITask> {
        return new Promise<ITask>(async (resolve, reject) => {
            try {
                //create task
                const taskCreated = await this._taskService.createTask(task);

                return resolve(taskCreated);
            } catch (error) {
                return reject(error);
            }
        });
    }

    assignTaskTo(assigneId: number, taskId: number): Promise<ITask> {
        return new Promise<ITask>(async (resolve, reject) => {
            try {
                //get user
                const user = await this._userComponent.getUserProfileById(assigneId);
                //assign
                const task = await this._taskService.assignTaskTo(assigneId, taskId);
                //notify probably but this may be on the notification module

                resolve(task);

            } catch (error) {
                return reject(error);
            }
        })
    }
}