import { AbstractRepository } from "../../../../behavior/repositories/repository.abstract";
import { TasksConverterInstance } from "../../converters/my-sql/tasks.converter";
import { UpdateQuery } from "../../../../query-spec/my-sql/update.query";
import { TaskHistoryMySqlDAOInstance } from "../my-sql/task-history-mysql.dao";
import { ITaskHistory } from "../../models/task-history";



function tasksCustomQueryGenerator(fieldsDictionay: any, query: any): string {
    let cq: string = 'select * from TASKS_HISTORY Where ';

    for (const key in query) {
        if (query.hasOwnProperty(key)) {
            const value = query[key];
            cq += `${fieldsDictionay[key]} = '${value}' `
        }
    }
    return cq;
}

export class TasksHistoryRepository extends AbstractRepository<ITaskHistory>{
    constructor() {
        super(TaskHistoryMySqlDAOInstance, TasksConverterInstance);
    }



    getAllBy(query: any): Promise<ITaskHistory[]> {
        const customQuery: string = tasksCustomQueryGenerator({
            'task_id': 'TaskID'
        }, query);
        return super.getAllBy(customQuery);
    }

}
export const TasksHistoryRepositoryInstance: TasksHistoryRepository = new TasksHistoryRepository()