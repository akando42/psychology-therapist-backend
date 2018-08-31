import { WriterReaderService } from "../../behavior/services/writer-reader-service";
import { NotificationsRepoInstance } from "./dao/repositories/notifications.repository";
import { INotification } from "../../models/notification";

export class NotificationsService extends WriterReaderService<INotification> {
    constructor() {
        super(NotificationsRepoInstance);
    }

    getUserUnreadNotifications(userID: string): Promise<INotification[]> {

        return NotificationsRepoInstance.getUserUnreadNotifications(userID);
    }

    async markAsReaded(notificationID: string): Promise<boolean> {
        let modelStored: INotification = await this.getById(notificationID);
        //keep always id
        modelStored.readed = 1;
        //make comparatin and modify original.
        return NotificationsRepoInstance.update(notificationID, modelStored);
    }

    getById(notificatoinID: string): Promise<INotification> {
        return NotificationsRepoInstance.getById(notificatoinID);
    }

}

export const NotificationsServiceInstance: NotificationsService = new NotificationsService();