import { Router, Request, Response } from "express";
import { TODAdminModule } from ".";
import { TokenValidationMiddleware } from "../../middlewares/token-validation.middleware";
import { ICabinet } from "../../models/cabinet";
import { ICabinetInvitation } from "../../models/cabinet-invitation";
import { UsersRolEnum } from "../../enums/users-rol.enum";

// require('')
// let chanel = chan()
export class AdminRouter {
    constructor() { }

    init(): Router {
        let router = Router();

        router.get('/admins', this.getSystemAdmins.bind(this));
        router.post('/admins', this.createAdminInvitation.bind(this));

        router.get('/cabinets', TokenValidationMiddleware, this.getAdminCabinet.bind(this));
        router.post('/cabinets', TokenValidationMiddleware, this.createCabinet.bind(this));

        router.get('/cabinets/:cabinet_id/members/:role', TokenValidationMiddleware, this.getCabinetMembersByRole.bind(this));


        router.get('/cabinets/:cabinet_id/invitations', TokenValidationMiddleware, this.getCabinetInvitations.bind(this));
        router.post('/cabinets/invitations', TokenValidationMiddleware, this.createCabinetInvitation.bind(this));
        router.delete('/cabinets/invitations/:invitation_id', TokenValidationMiddleware, this.cancelCabinetInvitation.bind(this));
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

    createAdminInvitation(req: Request, res: Response): void {
        let body = <any>req['body'];

        TODAdminModule.createAdminInvitation(body)
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

    getMembers(req: Request, res: Response): void {

        TODAdminModule.getCabinetMembersByRole(1, UsersRolEnum.hr)
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

    getSystemAdmins(req: Request, res: Response): void {
        TODAdminModule.getSystemADmins()
            .then((result) => {
                res.status(200).json(result);
            }).catch((err) => {
                console.log(err)
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

    getCabinetMembersByRole(req: Request, res: Response): void {
        TODAdminModule.getCabinetMembersByRole(req.params['cabinet_id'], req.params['role'])
            .then((result) => {
                res.status(200).json(result);
            }).catch((err) => {
                res.status(400).json(err);
            });
    }

    cancelCabinetInvitation(req: Request, res: Response): void {
        TODAdminModule.cancelInvitation(req.params['invitation_id'])
            .then((result) => {
                res.status(200).json(result);
            }).catch((err) => {
                res.status(400).json(err);
            });
    }
}