import { AbstractDao } from "../../../../behavior/mysql/abstract.dao";
import { ITaskHistoryMySql } from "./models/my-sql/task-history-my-sql";

export class TaskHistoryMySqlDAO extends AbstractDao<ITaskHistoryMySql>{ }

export const TaskHistoryMySqlDAOInstance: TaskHistoryMySqlDAO = new TaskHistoryMySqlDAO();