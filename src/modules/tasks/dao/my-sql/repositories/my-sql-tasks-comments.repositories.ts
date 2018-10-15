import { ITasksRepository } from "../../repositories/tasks.repository";
import { ITask } from "../../../../../models/task";
import { ByNameRepository } from "../../../../../core/repositories/by-name-repository.notation";
import { ITasksCommentsRepository } from "../../repositories/tasks-comments.repository";
import { ITaskComment } from "../../../../../models/task-comment";

const propsMatch = {}
@ByNameRepository('Task_History', {
    converterProps: propsMatch, primaryKey: 'TaskID', resourceName: 'Task'
})
export class MySqlTasksCommentsRepository implements ITasksCommentsRepository {

    createTaskComment(comment: ITaskComment): Promise<ITaskComment> { return null; }




}