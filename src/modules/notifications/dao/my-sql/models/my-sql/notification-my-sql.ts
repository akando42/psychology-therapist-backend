import { NotificationTypeEnum } from "../../../../../../enums/notification-type.enum";

export interface INotificationMySql {
    NotificationReadStatus: boolean;
    NotificationTitle: string;
    NotificationContent: string;
    NotificationCreationDate: number;
    NotificationRecipentID: any;
    NotificationType?: NotificationTypeEnum;
    NotificationAction?: any;
}