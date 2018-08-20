import { AbstractRepository } from "../../../../behavior/repositories/repository.abstract";
import { TasksConverterInstance } from "../../converters/my-sql/tasks.converter";
import { UpdateQuery } from "../../../../query-spec/my-sql/update.query";
import { ITaskHistory } from "../../models/task-History";
import { TaskHistoryMySqlDAOInstance } from "../my-sql/task-history-mysql.dao";




export class TasksHistoryRepository extends AbstractRepository<ITaskHistory>{
    constructor() {
        super(TaskHistoryMySqlDAOInstance, TasksConverterInstance);
    }

    update(id: string, data): Promise<boolean> {
        return super.update(new UpdateQuery({ TaskID: id }).toDBQuery('TASKSHistoryS'), data);
    }


}

export const TasksHistoryRepositoryInstance: TasksHistoryRepository = new TasksHistoryRepository();
