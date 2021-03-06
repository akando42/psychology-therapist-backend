import { Router, Request, Response } from "express";
import { NotificationsControllerInstance } from "./notifications.controller";
import { INotification } from "../../models/notification";
import { TokenValidationMiddleware } from "../../middlewares/token-validation.middleware";




export class NotificationsRouter {
    constructor() { }

    init(): Router {
        let router = Router({ mergeParams: true });

        router.get('/notifications', TokenValidationMiddleware, this.getUserUnreadNotifications.bind(this));
        
        //notification are created only by the system.
        // router.post('/notifications', this.createNotification.bind(this));

        router.post('/notifications/:id/read', this.markAsReaded.bind(this));

        return router;
    }

    markAsReaded(req: Request, res: Response): void {
        const userId = req['userId'] || '1';

        NotificationsControllerInstance.markAsReaded(userId)
            .then((marked: boolean) => {
                res.status(200).json({ payload: marked });
            })
            .catch((err) => {
                res.status(500).json(err);
            });
    }

    getUserUnreadNotifications(req: Request, res: Response): void {
        const userId = req['userId'];

        NotificationsControllerInstance.getUserUnreadNotifications(userId)
            .then((nots: INotification[]) => {
                res.status(200).json({ payload: nots });
            })
            .catch((err) => {
                res.status(500).json(err);
            });
    }

    createNotification(req: Request, res: Response): void {
        NotificationsControllerInstance.create(req.body)
            .then((id: any) => {
                res.status(200).json({ resource_id: id });
            })
            .catch((err) => {
                res.status(500).json(err);
            });
    }

}

export const NotificationsRouterInstance: NotificationsRouter = new NotificationsRouter();