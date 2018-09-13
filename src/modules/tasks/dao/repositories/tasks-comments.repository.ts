import { AbstractRepository } from "../../../../behavior/repositories/repository.abstract";
import { ITaskComment } from "../../../../models/task-comment";
import { GenericDao } from "../../../../behavior/mysql/generic.dao";




export abstract class AbstractTasksCommentsRepository extends AbstractRepository<ITaskComment>{
    constructor() {
        super(new GenericDao('TASKS_COMMENTS'));
    }

    abstract updateTask(id: string, data): Promise<boolean>;


}

