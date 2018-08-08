import { TaskMySqlDAO } from "../my-sql/task-mysql.dao";
import { AbstractRepository } from "../../../../behavior/repositories/repository.abstract";
import { GetBy } from "../queries/mysql/get-by";
import { TasksConverterInstance } from "../../converters/my-sql/account.converter";
import { ITask } from "../../../../models/task";




export class TasksRepository extends AbstractRepository<ITask>{
    constructor() {
        super(TaskMySqlDAO, TasksConverterInstance);
    }


}

export const TasksRepoInstance: TasksRepository = new TasksRepository();
