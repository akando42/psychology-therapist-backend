import { TaskMySqlDAO } from "../my-sql/task-mysql.dao";
import { AbstractRepository } from "../../../../behavior/repositories/repository.abstract";
import { GetBy } from "../queries/mysql/get-by";
import { TasksConverterInstance } from "../../converters/my-sql/account.converter";
import { ITask } from "../../../../models/task";
import { UpdateQuery } from "../../../../query-spec/my-sql/update.query";




export class TasksRepository extends AbstractRepository<ITask>{
    constructor() {
        super(TaskMySqlDAO, TasksConverterInstance);
    }

    update(id: string, data): Promise<boolean> {
        return super.update(new UpdateQuery({ TaskID: id }).toDBQuery('TASKS'), data);
    }

}

export const TasksRepoInstance: TasksRepository = new TasksRepository();
