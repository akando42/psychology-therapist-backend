import { TaskMySqlDAOInstance } from "../my-sql/task-mysql.dao";
import { AbstractRepository } from "../../../../behavior/repositories/repository.abstract";
import { GetBy } from "../queries/mysql/get-by";
import { TasksConverterInstance } from "../../converters/my-sql/tasks.converter";
import { UpdateQuery } from "../../../../query-spec/my-sql/update.query";
import { GetByQuery } from "../../../../query-spec/my-sql/get-by.query";
import { ITask } from "../../models/task";


function tasksCustomQueryGenerator(fieldsDictionay: any, query: any): string {
    let cq: string = 'select * from TASKS Where ';

    for (const key in query) {
        if (query.hasOwnProperty(key)) {
            const value = query[key];
            cq += `${fieldsDictionay[key]} = '${value}' `
        }
    }
    return cq;
}


export class TasksRepository extends AbstractRepository<ITask>{
    constructor() {
        super(TaskMySqlDAOInstance, TasksConverterInstance);
    }


    getAllBy(query: any): Promise<ITask[]> {
        const customQuery: string = tasksCustomQueryGenerator({
            'title': 'TaskTitle',
            'assignedTo': 'TaskAssignedToID'
        }, query);
        return super.getAllBy(customQuery);
    }

    update(id: string, data): Promise<boolean> {
        return super.update(new UpdateQuery({ TaskID: id }).toDBQuery('TASKS'), data);
    }


    getAllByAssignedID(query: any): Promise<ITask[]> {
        return super.getAllBy(
            new GetByQuery({ TaskUserAssignedID: query.assinedTo }).toDBQuery('TASKS'));

    }


}

export const TasksRepoInstance: TasksRepository = new TasksRepository();
