import { AbstractRepository } from "../../../../behavior/repositories/repository.abstract";
import { TasksConverterInstance } from "../../converters/my-sql/tasks.converter";
import { UpdateQuery } from "../../../../query-spec/my-sql/update.query";
import { ITaskComment } from "../../models/task-comment";
import { TaskCommentMySqlDAOInstance } from "../my-sql/task-comments-mysql.dao";




export class TasksCommentsRepository extends AbstractRepository<ITaskComment>{
    constructor() {
        super(TaskCommentMySqlDAOInstance, TasksConverterInstance);
    }

    update(id: string, data): Promise<boolean> {
        return super.update(new UpdateQuery({ TaskID: id }).toDBQuery('TASKSCOMMENTS'), data);
    }


}

export const TasksCommentsRepositoryInstance: TasksCommentsRepository = new TasksCommentsRepository();
