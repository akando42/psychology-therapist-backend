import { Router, Response, Request } from "express";

import { selfResponsabilityMiddleware } from "../../../../middlewares/self-responsability";

import { cabinetComponent } from '../../'


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

    inviteToCabinet(req: Request, res: Response): void {

    }
}