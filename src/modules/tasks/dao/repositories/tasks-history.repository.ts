import { AbstractRepository } from "../../../../core/repositories/repository.abstract";
import { ITaskHistory } from "../../../../models/task-history";
import { GenericDao } from "../../../../core/mysql/generic.dao";




export interface ITasksHistoryRepository {

    getAllBy(query: any): Promise<ITaskHistory[]>;



}