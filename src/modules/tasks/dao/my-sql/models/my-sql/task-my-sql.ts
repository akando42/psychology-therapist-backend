import { AccountStatusEnum } from "../../../../../../enums/account-stats.enum";
import { UsersRolEnum } from "../../../../../../enums/users-rol.enum";
import { GenderEnum } from "../../../../../../enums/gender.enum";
import { TaskStatusEnum } from "../../../../../../enums/task-status.enum";


export interface ITaskMySql {
    TaskID?: string;
    Status: TaskStatusEnum;
    Title?: string;
    CreatorID: string;
    AssignedTo?: string;
    CreationDate: number;
    ResolutionDate: number;
    Details: string;
    Comments: string;
    //why not?
}