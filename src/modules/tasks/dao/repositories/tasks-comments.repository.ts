import { AbstractRepository } from "../../../../core/repositories/repository.abstract";
import { ITaskComment } from "../../../../models/task-comment";
import { GenericDao } from "../../../../core/mysql/generic.dao";




export interface ITasksCommentsRepository {

    createTaskComment(comment: ITaskComment): Promise<ITaskComment>;

}

