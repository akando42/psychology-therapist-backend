import { AccountStatusEnum } from "../../../../../enums/account-stats.enum";
import { UsersRolEnum } from "../../../../../enums/users-rol.enum";
import { GenderEnum } from "../../../../../enums/gender.enum";
import { TaskStatusEnum } from "../../../../../enums/task-status.enum";


export interface ITaskCommentMySql {
    TaskCommentID: string;
    TaskCommentAuthorID: string;
    TaskAuthorFullName?: string
    TaskCommentBody: string;
    TaskCommentDate: number;
}