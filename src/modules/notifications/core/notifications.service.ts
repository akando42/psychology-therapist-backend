import { INotification } from "../../../models/notification";
import { INotificatinService } from "./i-notification.service";
import { Constructor } from "../../../core/repositories/repositoy.notation";

export class NotificationsService implements INotificatinService {


    constructor(private _notifiactionRepository) { }

    createNotification(noti: INotification): Promise<INotification> {
        throw new Error("Method not implemented.");
    }
    markNotificationAsReaded(notiId: any): Promise<INotification> {
        throw new Error("Method not implemented.");
    }

}

