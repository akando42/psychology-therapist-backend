

export interface ITasksController<T, K> {

    getTasksByUserAssigned(userId: string): Promise<T>;

    search(query: any): Promise<T>

    assignTask(assignedUserID: string, taskID: string): Promise<T>;

    createTaskAndNotify(task: K): Promise<T>;
}