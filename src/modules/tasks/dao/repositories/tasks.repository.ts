import { ITask } from "../../../../models/task";


export interface ITasksRepository {


    createTask(task: ITask): Promise<ITask>;

    getAllBy(query: any): Promise<ITask[]>;

    getAllByAssignedId(assignedId: any): Promise<ITask[]>;


}

