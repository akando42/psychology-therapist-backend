import { AbstractDao } from "../../../../behavior/mysql/abstract.dao";
import { ITaskCommentMySql } from "./models/my-sql/task-comment-my-sql";

export class TaskCommentMySqlDAO extends AbstractDao<ITaskCommentMySql>{ }

export const TaskCommentMySqlDAOInstance: TaskCommentMySqlDAO = new TaskCommentMySqlDAO();