import { AbstractRepository } from "../../../../core/repositories/repository.abstract";
import { ITaskComment } from "../../../../models/task-comment";
import { GenericDao } from "../../../../core/mysql/generic.dao";




export abstract class AbstractTasksCommentsRepository extends AbstractRepository<ITaskComment>{
    constructor() {
        super(new GenericDao('TASKS_COMMENTS'));
    }

    abstract updateTask(id: string, data): Promise<boolean>;


}

