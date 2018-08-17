import { IDualConverter } from "../../../../behavior/converters/converter.interface";
import { ITask } from "../../../../models/task";
import { ITaskMySql } from "../../dao/my-sql/models/my-sql/task-my-sql";


export class TaskConverter implements IDualConverter<ITask, ITaskMySql> {
    converDomainToDBModel(raw: ITask): ITaskMySql {
        if (!raw) { return null }
        // return {
        //    }
    }
    convertDBModelToDomain(raw: ITaskMySql): ITask {
        if (!raw) { return null }
        // return {
        //     TaskStatus: raw.TaskStatus,
        //     email: raw.email,
        //     password: raw.password,
        //     TaskId: raw.TaskId,
        //     signUpDate: raw.signUpDate,
        //     userId: raw.userId
        // }
    }
    converManyDomainToDBModel(raw: ITask[]): ITaskMySql[] {
        return raw.map((item) => this.converDomainToDBModel(item));
    }
    convertManyDBModelToDomain(raw: ITaskMySql[]): ITask[] {
        return raw.map((item) => this.convertDBModelToDomain(item));
    }

}

export const TasksConverterInstance: TaskConverter = new TaskConverter();