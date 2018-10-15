import { ITasksHistoryRepository } from "../../repositories/tasks-history.repository";
import { ITaskHistory } from "../../../../../models/task-history";


export class MySqlTasksHistoryRepository implements ITasksHistoryRepository {

    createHistoryRecord(history: ITaskHistory): Promise<ITaskHistory> {
        throw new Error("Method not implemented.");
    }
    getAllByTaskId(query: any): Promise<ITaskHistory[]> {
        throw new Error("Method not implemented.");
    }


}