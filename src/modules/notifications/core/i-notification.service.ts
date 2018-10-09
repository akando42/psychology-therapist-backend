import { INotification } from "../../../models/notification";


export interface INotificatinService {

    createNotification(noti: INotification): Promise<INotification>;

    markNotificationAsReaded(notiId: any): Promise<INotification>;
}