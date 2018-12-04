import { AbstractRepository } from "../../../../core/repositories/repository.abstract";
import { INotification } from "../../../../models/notification";
import { NotificationsConverterInstance } from "../../converters/my-sql/notification.converter";
import { NotificationMySqlDAOInstance } from "../my-sql/notification-mysql.dao";
import { GetByQuery } from "../../../../query-spec/my-sql/get-by.query";




export class NotificationsRepository extends AbstractRepository<INotification>{
    constructor() {
        super(NotificationMySqlDAOInstance, NotificationsConverterInstance);
    }


    getUserUnreadNotifications(userID: string): Promise<INotification[]> {
        const query = 
        new GetByQuery({ NotificationRecipentID: userID, NotificationReadStatus: 0 }).toDBQuery('NOTIFICATIONS');
        console.log(query)
        return super.getAllBy(query);
    }

    getById(id: string): Promise<INotification> {
        return super.getBy(new GetByQuery({ NotificationID: id }).toDBQuery('NOTIFICATIONS'));
    }

}

export const NotificationsRepoInstance: NotificationsRepository = new NotificationsRepository();
