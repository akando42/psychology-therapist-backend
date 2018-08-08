import { ITaskMySql } from "./models/my-sql/task-my-sql";
import { AbstractDao } from "../../../../behavior/mysql/abstract.dao";

export class TaskMySqlDAO extends AbstractDao<ITaskMySql>{ }

export const TaskMySqlDAOInstance: TaskMySqlDAO = new TaskMySqlDAO();