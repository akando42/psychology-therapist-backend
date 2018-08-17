import { TaskMySqlDAOInstance } from "../my-sql/task-mysql.dao";
import { AbstractRepository } from "../../../../behavior/repositories/repository.abstract";
import { GetBy } from "../queries/mysql/get-by";
import { TasksConverterInstance } from "../../converters/my-sql/tasks.converter";
import { ITask } from "../../../../models/task";
import { UpdateQuery } from "../../../../query-spec/my-sql/update.query";
import { GetByQuery } from "../../../../query-spec/my-sql/get-by.query";




export class TasksRepository extends AbstractRepository<ITask>{
    constructor() {
        super(TaskMySqlDAOInstance, TasksConverterInstance);
    }

    update(id: string, data): Promise<boolean> {
        return super.update(new UpdateQuery({ TaskID: id }).toDBQuery('TASKS'), data);
    }

    getByUserAssigned(userId: string): Promise<ITask[]> {
        return super.getAllBy(new GetByQuery({ TaskUserAssignedID: userId }).toDBQuery('TASKS'))
    }

}

export const TasksRepoInstance: TasksRepository = new TasksRepository();
