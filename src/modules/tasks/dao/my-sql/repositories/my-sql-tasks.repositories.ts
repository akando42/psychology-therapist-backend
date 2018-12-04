import { ITasksRepository } from "../../repositories/tasks.repository";
import { ITask } from "../../../../../models/task";
import { ByNameRepository } from "../../../../../core/repositories/by-name-repository.notation";

const propsMatch = {}
@ByNameRepository('Task', {
    converterProps: propsMatch, primaryKey: 'TaskID', resourceName: 'Task'
})
export class MySqlTasksRepository implements ITasksRepository {
    
    updateTask(task: ITask): Promise<ITask> { return null; }

    createTask(task: ITask): Promise<ITask> {
        return null;
    }
    getAllBy(query: any): Promise<ITask[]> {
        return null;
    }
    getAllByAssignedId(assignedId: any): Promise<ITask[]> {
        return null;
    }

    getTaskById(taskId: number): Promise<ITask> { return null; }


}