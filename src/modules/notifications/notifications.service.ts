import { WriterReaderService } from "../../behavior/services/writer-reader-service";
import { NotificationsRepoInstance } from "./dao/repositories/notifications.repository";
import { INotification } from "../../models/notification";
import { GetByQuery } from "../../query-spec/my-sql/get-by.query";

export class NotificationsService extends WriterReaderService<INotification> {
    constructor() {
        super(NotificationsRepoInstance);
    }

    getUserNotifications(userID: string): Promise<INotification[]> {
        return NotificationsRepoInstance.getAllBy(new GetByQuery({ NotificationRecipentID: userID }).toDBQuery('NOTIFICATIONS'));
    }
}

export const NotificationsServiceInstance: NotificationsService = new NotificationsService();