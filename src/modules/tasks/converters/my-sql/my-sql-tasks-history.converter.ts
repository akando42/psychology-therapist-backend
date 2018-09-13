import { IDualConverter } from "../../../../behavior/converters/converter.interface";
import { ITask } from "../../../../models/task";
import { ITaskMySql } from "../../dao/my-sql/models/task-my-sql";
import { ITaskHistory } from "../../../../models/task-history";
import { ITaskHistoryMySql } from "../../dao/my-sql/models/task-history-my-sql";


export class MySqlTasksHistoryConverter implements IDualConverter<ITaskHistory, ITaskHistoryMySql> {
    converDomainToDBModel(raw: ITaskHistory): ITaskHistoryMySql {
        if (!raw) { return null }
        return {
            TaskHistoryAction: raw.historyAction,
            TaskHistoryID: raw.id,
            TaskHistoryDate: raw.date
        }
    }
    convertDBModelToDomain(raw: ITaskHistoryMySql): ITaskHistory {
        if (!raw) { return null }
        return {
            date: raw.TaskHistoryDate,
            historyAction: raw.TaskHistoryAction,
            id: raw.TaskHistoryID
        }
    }

    converManyDomainToDBModel(raw: ITaskHistory[]): ITaskHistoryMySql[] {
        return raw.map((item) => this.converDomainToDBModel(item));
    }

    convertManyDBModelToDomain(raw: ITaskHistoryMySql[]): ITaskHistory[] {
        return raw.map((item) => this.convertDBModelToDomain(item));
    }

}
