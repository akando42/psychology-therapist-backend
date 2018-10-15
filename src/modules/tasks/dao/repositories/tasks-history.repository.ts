import { AbstractRepository } from "../../../../core/repositories/repository.abstract";
import { ITaskHistory } from "../../../../models/task-history";
import { GenericDao } from "../../../../core/mysql/generic.dao";




export interface ITasksHistoryRepository {

    createHistoryRecord(history: ITaskHistory): Promise<ITaskHistory>;

    getAllByTaskId(query: any): Promise<ITaskHistory[]>;



}