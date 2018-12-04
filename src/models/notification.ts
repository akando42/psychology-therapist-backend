import { NotificationTypeEnum } from "../enums/notification-type.enum";


export interface INotification {
    readed: any;
    title: string;
    content: string;
    date: number;
    recipentID: any;
    action?: any;
    type?: NotificationTypeEnum
}