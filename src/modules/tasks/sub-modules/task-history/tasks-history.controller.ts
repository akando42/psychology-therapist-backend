import { WriteReadController } from "../../../../behavior/controllers/write-read.controller";
import { TasksHistoryServiceInstance, TasksHistoryService } from "./tasks-history.service";
import { ITaskHistory } from "../../models/task-history";
import { ITaskHistoryController } from "../../core/task-history-controller.interface";
import { TODResponse } from "../../../../dto/tod-response";
import { resolve } from "url";




export class TasksHistoryController implements ITaskHistoryController<TODResponse, ITaskHistory>{

    constructor(private _service: TasksHistoryService) {
    }


    search(query: any): Promise<TODResponse> {
        return new Promise<TODResponse>(async (resolve, reject) => {
            try {
                const result: TODResponse = {
                    message: 'search task history`s results',
                    payload: await this._service.getAllBy(query),
                    timestamp: new Date()
                };

                return resolve(result);
            } catch (error) {
                const result: TODResponse = {
                    message: 'error task history`s search',
                    timestamp: new Date(),
                    error: error
                };
                return reject(result);
            }
        });
    }

    addToHistory(history: ITaskHistory): Promise<TODResponse> {
        return new Promise<TODResponse>(async (resolve, reject) => {
            try {
                const created = await this._service.appendToHistory(history);

                const result: TODResponse = {
                    message: 'CREATING task history`s results',
                    payload: created,
                    timestamp: new Date()
                };

                return resolve(result);
            } catch (error) {

                const result: TODResponse = {
                    message: 'error CREATING task history',
                    timestamp: new Date(),
                    error: error
                };
                return reject(result);
            }
        })
    }

}

export const TasksHistoryControllerInstance: TasksHistoryController = new TasksHistoryController(TasksHistoryServiceInstance);