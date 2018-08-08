import { NotificationsServiceInstance } from "./notifications.service";
import { WriteReadController } from "../../behavior/controllers/write-read.controller";
import { INotification } from "../../models/notification";




export class NotificationsController extends WriteReadController<INotification>{
    constructor() {
        super(NotificationsServiceInstance);
    }
}

export const NotificationsControllerInstance: NotificationsController = new NotificationsController();