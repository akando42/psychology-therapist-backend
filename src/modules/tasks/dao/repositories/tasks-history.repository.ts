import { AbstractRepository } from "../../../../behavior/repositories/repository.abstract";
import { ITaskHistory } from "../../../../models/task-history";
import { GenericDao } from "../../../../behavior/mysql/generic.dao";
import { MySqlTasksHistoryConverter } from "../../converters/my-sql/my-sql-tasks-history.converter";



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

export abstract class AbstractTasksHistoryRepository extends AbstractRepository<ITaskHistory>{
    constructor() {
        super(new GenericDao(), new MySqlTasksHistoryConverter());
    }



    getAllBy(query: any): Promise<ITaskHistory[]> {
        const customQuery: string = tasksCustomQueryGenerator({
            'task_id': 'TaskID'
        }, query);
        return super.getAllBy(customQuery);
    }

}