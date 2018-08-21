import { AbstractRepository } from "../../../../behavior/repositories/repository.abstract";
import { TasksConverterInstance } from "../../converters/my-sql/tasks.converter";
import { UpdateQuery } from "../../../../query-spec/my-sql/update.query";
import { TaskHistoryMySqlDAOInstance } from "../my-sql/task-history-mysql.dao";
import { ITaskHistory } from "../../models/task-history";




export class TasksHistoryRepository extends AbstractRepository<ITaskHistory>{
    constructor() {
        super(TaskHistoryMySqlDAOInstance, TasksConverterInstance);
    }

    update(id: string, data): Promise<boolean> {
        return super.update(new UpdateQuery({ TaskID: id }).toDBQuery('TasksHistory'), data);


    }
}
export const TasksHistoryRepositoryInstance: TasksHistoryRepository = new TasksHistoryRepository()