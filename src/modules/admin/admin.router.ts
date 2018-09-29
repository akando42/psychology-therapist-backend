import { Router, Request, Response } from "express";
import { TODAdminModule } from ".";
import { TokenValidationMiddleware } from "../../middlewares/token-validation.middleware";
import { ICabinet } from "../../models/cabinet";
import { ICabinetInvitation } from "../../models/cabinet-invitation";



export class AdminRouter {
    constructor() { }

    init(): Router {
        let router = Router();

        router.get('/cabinets', TokenValidationMiddleware, this.getAdminCabinet.bind(this));
        router.post('/cabinets', TokenValidationMiddleware, this.createCabinet.bind(this));

        router.get('/cabinets/:cabinet_id/members/:role', TokenValidationMiddleware, this.getCabinetMembers.bind(this));

        router.get('/cabinets/:cabinet_id/invitations', TokenValidationMiddleware, this.getCabinetInvitations.bind(this));
        router.post('/cabinets/invitations', TokenValidationMiddleware, this.createCabinetInvitation.bind(this));
        return router;
    }

    createCabinet(req: Request, res: Response): void {
        let body = <ICabinet>req['body'];
        body.adminId = req['roleId'];
        TODAdminModule.createAdminCabinet(body)
            .then((result) => {
                res.status(200).json(result);
            }).catch((err) => {
                res.status(400).json(err);
            });
    }

    getAdminCabinet(req: Request, res: Response): void {
        TODAdminModule.getAdminCabinet(req['roleId'])
            .then((result) => {
                res.status(200).json(result);
            }).catch((err) => {
                res.status(400).json(err);
            });
    }

    getCabinetInvitations(req: Request, res: Response): void {
        TODAdminModule.getCabinetInvitations(req.params['cabinet_id'])
            .then((result) => {
                res.status(200).json(result);
            }).catch((err) => {
                res.status(400).json(err);
            });
    }

    createCabinetInvitation(req: Request, res: Response): void {
        const invitation: ICabinetInvitation = {
            email: req.body['email'],
            role: req.body['role'],
            inviterId: req['roleId']
        }

        TODAdminModule.createCabinetInvitation(invitation)
            .then((result) => {
                res.status(200).json(result);
            }).catch((err) => {
                res.status(400).json(err);
            });
    }


    getCabinetMembers(req: Request, res: Response): void {

        TODAdminModule.getCabinetMembers(req.params['cabinet_id'], req.params['role'])
            .then((result) => {
                res.status(200).json(result);
            }).catch((err) => {
                res.status(400).json(err);
            });
    }
}