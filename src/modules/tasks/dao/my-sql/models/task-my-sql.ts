import { AccountStatusEnum } from "../../../../../enums/account-stats.enum";
import { UsersRolEnum } from "../../../../../enums/users-rol.enum";
import { GenderEnum } from "../../../../../enums/gender.enum";
import { TaskStatusEnum } from "../../../../../enums/task-status.enum";


export interface ITaskMySql {
    TaskID?: string;
    TaskStatus: TaskStatusEnum;
    TaskTitle?: string;
    TaskReporterID: string;
    TaskReporterFullName?: string;
    TaskAssignedToID?: string;
    TaskAssignedToFullName?: string;
    TaskCreationDate: number;
    TaskResolutionDate: number;
    TaskDetails: string;
}