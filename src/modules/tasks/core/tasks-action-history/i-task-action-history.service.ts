import { ITaskHistory } from "../../../../models/task-history";



export interface ITaskActionHistory {

    /**
     * push a history to the current history list.
     * @param history 
     */
    pushToHistory(history: ITaskHistory): Promise<ITaskHistory>;
}