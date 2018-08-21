import { IDualConverter } from "../../../../behavior/converters/converter.interface";
import { INotificationMySql } from "../../dao/my-sql/models/my-sql/notification-my-sql";
import { INotification } from "../../../../models/notification";


export class NotificationConverter implements IDualConverter<INotification, INotificationMySql> {
    converDomainToDBModel(raw: INotification): INotificationMySql {
        if (!raw) { return null }
        return {
            NotificationContent: raw.content,
            NotificationCreationDate: raw.date,
            NotificationReadStatus: raw.readed,
            NotificationTitle: raw.title,
            NotificationRecipentID: raw.recipentID
        }
    }
    convertDBModelToDomain(raw: INotificationMySql): INotification {
        if (!raw) { return null }
        return {
            content: raw.NotificationContent,
            date: raw.NotificationCreationDate,
            readed: raw.NotificationReadStatus,
            title: raw.NotificationTitle,
            recipentID: raw.NotificationRecipentID
        }
    }
    converManyDomainToDBModel(raw: INotification[]): INotificationMySql[] {
        return raw.map((item) => this.converDomainToDBModel(item));
    }
    convertManyDBModelToDomain(raw: INotificationMySql[]): INotification[] {
        return raw.map((item) => this.convertDBModelToDomain(item));
    }

}

export const NotificationsConverterInstance: NotificationConverter = new NotificationConverter();