import { INotification } from "../../../models/notification";
import { NotificationsControllerInstance } from "../../notifications/notifications.controller";

export class NotificationsService {

    static createNotification(notification: INotification): Promise<any> {
        return NotificationsControllerInstance.create(notification);
    }

}