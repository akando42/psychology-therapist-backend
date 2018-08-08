import { WriterReaderService } from "../../behavior/services/writer-reader-service";
import { NotificationsRepoInstance } from "./dao/repositories/notifications.repository";
import { INotification } from "../../models/notification";

export class NotificationsService extends WriterReaderService<INotification> {
    constructor() {
        super(NotificationsRepoInstance);
    }


}

export const NotificationsServiceInstance: NotificationsService = new NotificationsService();