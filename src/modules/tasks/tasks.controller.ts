
import { TasksServiceInstance } from "./tasks.service";
import { ITask } from "./models/task";
import { NotificationsServiceConection } from "./feight-clients/notifications.service";
import { TODResponse } from "../../dto/tod-response";
import { ITasksController } from "./core/task-controller.interface";
import { WriteReadController } from "../../behavior/controllers/write-read.controller";
import { IWriteReadService } from "../../behavior/services/write-read-service.interface";





export class TasksController extends WriteReadController<ITask> implements ITasksController<TODResponse, ITask> {
    constructor(protected _service: IWriteReadService<ITask>) {
        super(_service);
    }

    getTasksByUserAssigned(userId: string): Promise<TODResponse> {
        return this.search({ assignedTo: userId });
    }

    search(query: any): Promise<TODResponse> {
        return new Promise<TODResponse>(async (resolve, reject) => {
            try {
                const result: TODResponse = {
                    message: 'search results',
                    payload: await this._service.getAllBy(query),
                    timestamp: new Date()
                }

                return resolve(result);
            } catch (error) {
                const result: TODResponse = {
                    message: 'error search',
                    timestamp: new Date(),
                    error: error
                }
                return reject(result);
            }
        });
    }

    createTaskAndNotify(task): Promise<TODResponse> {
        return new Promise<TODResponse>(async (resolve, reject) => {
            try {
                //create task
                const taskCreated: ITask = await super.create(task);
                //notify assigned user
                if (taskCreated) {
                    NotificationsServiceConection.createNotification({
                        content: `You have been asigned to ${task.title} task.`,
                        recipentID: task.assignedTo.id,
                        title: 'Task Assigned',
                        date: await new Date().getMilliseconds(),
                        readed: false
                    });
                }
                //response object
                const result: TODResponse = {
                    message: 'task succefully created',
                    payload: taskCreated,
                    timestamp: new Date()
                }
                return resolve(result);

            } catch (error) {
                reject({
                    message: 'Sorry! and error has occured trying to CREATE the task ',
                    timestamp: new Date(),
                    error: error
                });
            }
        });
    }

    assignTask(assignedUserID: string, taskID: string): Promise<TODResponse> {
        return new Promise<TODResponse>(async (resolve, reject) => {
            try {
                //get task
                let task = await TasksServiceInstance.getById(taskID);

                //notify that task has been removed
                if (task.assignedTo.id) {
                    NotificationsServiceConection.createNotification({
                        content: `You have been un-asigned from ${task.title} task.`,
                        recipentID: task.assignedTo.id,
                        title: 'Task Un-assigned',
                        date: await new Date().getMilliseconds(),
                        readed: false
                    })
                }

                //Change assigned and update.
                task.assignedTo.id = assignedUserID;
                const editResult: boolean = await TasksServiceInstance.update(taskID, task);

                //Notify the new assigned user about it.
                if (editResult) {
                    NotificationsServiceConection.createNotification({
                        content: `You have been asigned to ${task.title} task.`,
                        recipentID: task.assignedTo.id,
                        title: 'Task Assigned',
                        date: await new Date().getMilliseconds(),
                        readed: false
                    })
                }

                //response object
                const result: TODResponse = {
                    message: 'task succefully reasigned',
                    payload: editResult,
                    timestamp: new Date()
                }
                return resolve(result)

            } catch (error) {

                const result: TODResponse = {
                    message: 'Sorry! and error has occured trying to re-asign the task ',
                    timestamp: new Date(),
                    error: error
                }
                return reject(result)
            }
        })
    }

}


export const TasksControllerInstance: TasksController = new TasksController(TasksServiceInstance);