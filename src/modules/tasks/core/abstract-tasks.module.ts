import { ITask } from "../../../models/task";
import { TODResponse } from "../../../dto/tod-response";



export abstract class AbstractTaskModule {

    constructor() {

    }

    abstract createTask(task: ITask): Promise<TODResponse>;

    abstract assignTaskTo(assignedId: number, taskid: number): Promise<TODResponse>;


}