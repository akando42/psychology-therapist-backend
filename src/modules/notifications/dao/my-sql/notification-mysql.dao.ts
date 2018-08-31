import { INotificationMySql } from "./models/my-sql/notification-my-sql";
import { AbstractDao } from "../../../../behavior/mysql/abstract.dao";

export class NotificationMySqlDAO extends AbstractDao<INotificationMySql>{ 
    constructor(){super('NOTIFICATIONS')}
}

export const NotificationMySqlDAOInstance: NotificationMySqlDAO = new NotificationMySqlDAO();