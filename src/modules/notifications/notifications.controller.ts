import { NotificationsServiceInstance } from "./notifications.service";
import { WriteReadController } from "../../behavior/controllers/write-read.controller";
import { INotification } from "../../models/notification";




 class NotificationsController extends WriteReadController<INotification>{
    constructor() {
        super(NotificationsServiceInstance);
    }

    getUserNotifications(userID): Promise<INotification[]> {
        return NotificationsServiceInstance.getUserNotifications(userID);
    }
}

export const NotificationsControllerInstance: NotificationsController = new NotificationsController();