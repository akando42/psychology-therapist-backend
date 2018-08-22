

export interface ITasksController<T, K> {

    search(query: any): Promise<T>

    assignTask(assignedUserID: string, taskID: string): Promise<T>;
  
    createTaskAndNotify(task: K): Promise<T>;
}