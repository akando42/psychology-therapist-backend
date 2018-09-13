import { IComment } from "../../../../models/comments";


export interface ITasksCommentsService {

    createComment(comment: IComment): Promise<IComment>;

    getTasksComments(taskid: number): Promise<IComment[]>;
}