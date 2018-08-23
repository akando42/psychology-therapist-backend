

export interface ITaskHistoryController<T, K> {

    search(query: any): Promise<T>

    addToHistory(history: K): Promise<T>
}