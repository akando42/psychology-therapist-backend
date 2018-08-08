import { AbstractRepository } from "../../../../behavior/repositories/repository.abstract";
import { INotification } from "../../../../models/notification";
import { NotificationsConverterInstance } from "../../converters/my-sql/notification.converter";
import { NotificationMySqlDAO } from "../my-sql/notification-mysql.dao";




export class NotificationsRepository extends AbstractRepository<INotification>{
    constructor() {
        super(NotificationMySqlDAO, NotificationsConverterInstance);
    }


}

export const NotificationsRepoInstance: NotificationsRepository = new NotificationsRepository();
