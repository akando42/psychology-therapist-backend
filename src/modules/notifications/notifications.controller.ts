import { NotificationsServiceInstance } from "./notifications.service";
import { WriteReadController } from "../../behavior/controllers/write-read.controller";
import { INotification } from "../../models/notification";


class NotificationsController extends WriteReadController<INotification>{
    constructor() {
        super(NotificationsServiceInstance);
    }

    getUserUnreadNotifications(userID): Promise<INotification[]> {
        return NotificationsServiceInstance.getUserUnreadNotifications(userID);
    }

    markAsReaded(notificationID: string): Promise<boolean> {
        return NotificationsServiceInstance.markAsReaded(notificationID);
    }

}

export const NotificationsControllerInstance: NotificationsController = new NotificationsController();