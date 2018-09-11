import { Router, Response, Request } from "express";

import { selfResponsabilityMiddleware } from "../../../../middlewares/self-responsability";

import { cabinetComponent } from '../../'
import { TODAuthenticationModule } from "../../../authentication";


export class CabinetsRouter {
    constructor() {
    }

    init(): Router {
        const router: Router = Router({ mergeParams: true });

        router.post(`/members`, this.inviteToCabinet.bind(this));

        router.get(`/members`, this.getCabinetUsers.bind(this));

        router.post(`/members/:member_id/action-request`,
            selfResponsabilityMiddleware('emitterId'), this.requestActionToCabinetUser.bind(this))

        return router;
    }

    getCabinetUsers(req: Request, res: Response): void {

        cabinetComponent.getCabinetMemberByAdminID(req['userId'])
            .then((result) => {
                //sent the response.
                res.status(200).json(result);

            })
            .catch((error) => {
                console.log(error);
                res.status(400).json(error)
            })
    }

    requestActionToCabinetUser(req: Request, res: Response): void {
        cabinetComponent.requestActionToCabinetUser(req.params['member_id'], req.body)
            .then((result) => {
                //sent the response.
                res.status(200).json(result);

            })
            .catch((error) => {
                console.log(error);
                res.status(400).json(error)
            })
    }

    async inviteToCabinet(req: Request, res: Response): any {
        try {
            const { body } = req;
            const invitation = {
                email: body.email,
                inviterId: req['userId'],
                role: body.role
            };

            const result = await TODAuthenticationModule.inviteUser(invitation);

            res.status(200).json(result);


        } catch (error) {
            res.status(400).json(error)

        }

    }
}