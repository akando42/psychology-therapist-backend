import { TaskStatusEnum } from "../enums/task-status.enum";


export interface ITask {
    id?: string;
    status: TaskStatusEnum;
    title?: string;
    reportTo?: any;
    assignedTo?: any,
    creationDate?: number;
    resolutionDate?: number;
    details?: string;
    //why not?
    estimedTime: string;
}