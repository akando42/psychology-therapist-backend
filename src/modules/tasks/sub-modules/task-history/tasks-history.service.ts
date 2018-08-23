
import { WriterReaderService } from "../../../../behavior/services/writer-reader-service";
import { TasksHistoryRepositoryInstance, TasksHistoryRepository } from "../../dao/repositories/tasks-history.repository";
import { ITaskHistory } from "../../models/task-history";
import { resolve } from "url";


export class TasksHistoryService {
    constructor(private _repository: TasksHistoryRepository) {
    }

    appendToHistory(taskHistory: ITaskHistory): Promise<ITaskHistory> {
        return new Promise<ITaskHistory>(async (resolve, reject) => {
            try {
                const createResult = await this._repository.create(taskHistory)
                return resolve(createResult);
            } catch (error) {
                return reject(error);
            }
        });
    }

    getAllBy(query: any): Promise<ITaskHistory[]> {
        return new Promise<ITaskHistory[]>(async (resolve, reject) => {
            try {
                const histroyRecords: ITaskHistory[] = await this._repository.getAllBy(query);
                return resolve(histroyRecords);
            } catch (error) {
                return reject(error);
            }
        });
    }
}

export const TasksHistoryServiceInstance: TasksHistoryService = new TasksHistoryService(TasksHistoryRepositoryInstance);