import { TaskStatusEnum } from "../../../enums/task-status.enum";


export interface ITask {
    id?: string;
    status: TaskStatusEnum;
    title?: string;
    reportTo?:
    { name?: string, id?: string };
    assignedTo?: {
        name?: string,
        id?: string
    };
    creationDate?: number;
    resolutionDate?: number;
    details?: string;
    //why not?
    estimedTime: string;
}