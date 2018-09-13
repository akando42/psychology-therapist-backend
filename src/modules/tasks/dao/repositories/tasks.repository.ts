import { AbstractRepository } from "../../../../behavior/repositories/repository.abstract";
import { MySqlTaskConverter } from "../../converters/my-sql/my-sql-tasks.converter";
import { UpdateQuery } from "../../../../query-spec/my-sql/update.query";
import { GetByQuery } from "../../../../query-spec/my-sql/get-by.query";
import { GenericDao } from "../../../../behavior/mysql/generic.dao";
import { ITask } from "../../../../models/task";


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


export abstract class AbstractTasksRepository extends AbstractRepository<ITask>{
    constructor() {
        super(new GenericDao(), new MySqlTaskConverter());
    }

    createTask(task: ITask): Promise<ITask> {
        return super.create(task);
    }

    getAllBy(query: any): Promise<ITask[]> {
        const customQuery: string = tasksCustomQueryGenerator({
            'title': 'TaskTitle',
            'assignedTo': 'TaskAssignedToID'
        }, query);
        return super.getAllBy(customQuery);
    }

    // (id: string, data): Promise<boolean> {
    //     return super.update(new UpdateQuery({ TaskID: id }).toDBQuery('TASKS'), data);
    // }


    getAllByAssignedID(query: any): Promise<ITask[]> {
        return super.getAllBy(
            new GetByQuery({ TaskUserAssignedID: query.assinedTo }).toDBQuery('TASKS'));

    }


}

