import { ITask } from "../../../../models/task";



export class TasksComponent {
    constructor() {

    }

    assignTaskTo(assigneId: number, taskId: number): Promise<ITask> {
        return new Promise<ITask>(async (resolve, reject) => {
            try {
                //asignar

                
            } catch (error) {

            }
        })
    }
}