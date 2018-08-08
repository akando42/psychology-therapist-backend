import { TaskStatusEnum } from "../enums/task-status.enum";
import { IComment } from "./comments";


export interface ITask {
    id?: string;
    status: TaskStatusEnum;
    title?: string;
    creator: { name: string };
    assignedTo?: {
        name: string,
        id: string
    };

    creationDate: number;
    resolutionDate: number;
    details: string;

    comments: IComment[]
    //why not?
    estimedTime: string;

}