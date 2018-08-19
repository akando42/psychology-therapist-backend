import { IDualConverter } from "../../../../behavior/converters/converter.interface";
import { ITask } from "../../../../models/task";
import { ITaskMySql } from "../../dao/my-sql/models/my-sql/task-my-sql";


export class TaskConverter implements IDualConverter<ITask, ITaskMySql> {
    converDomainToDBModel(raw: ITask): ITaskMySql {
        if (!raw) { return null }
        return {
            TaskAssignedToID: raw.assignedTo.id,
            TaskReporterID: raw.reportTo.id,
            TaskID: raw.id,
            TaskDetails: raw.details,
            TaskCreationDate: raw.creationDate,
            TaskStatus: raw.status,
            TaskResolutionDate: raw.resolutionDate,
            TaskTitle: raw.title
        }
    }
    convertDBModelToDomain(raw: ITaskMySql): ITask {
        if (!raw) { return null }
        return {
            assignedTo: { id: raw.TaskAssignedToID, name: raw.TaskAssignedToFullName },
            creationDate: raw.TaskCreationDate,
            details: raw.TaskDetails,
            reportTo: { id: raw.TaskReporterID, name: raw.TaskReporterFullName },
            id: raw.TaskID,
            title: raw.TaskTitle,
            status: raw.TaskStatus,
            resolutionDate: raw.TaskResolutionDate
        }
    }
    converManyDomainToDBModel(raw: ITask[]): ITaskMySql[] {
        return raw.map((item) => this.converDomainToDBModel(item));
    }
    convertManyDBModelToDomain(raw: ITaskMySql[]): ITask[] {
        return raw.map((item) => this.convertDBModelToDomain(item));
    }

}

export const TasksConverterInstance: TaskConverter = new TaskConverter();