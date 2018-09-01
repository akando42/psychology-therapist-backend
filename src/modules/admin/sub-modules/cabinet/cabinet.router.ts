import { Router, Response, Request } from "express";
import { TokenValidationMiddleware } from "../../../../middlewares/token-validation.middleware";
import { IUser } from "../../../../models/user";
import { WRAbstractRouter } from "../../../../behavior/routers/w-r-abstract.router";
import { CabinetControllerInstance, CabinetController } from "./cabinet.controller";
import { selfResponsabilityMiddleware } from "../../../../middlewares/self-responsability";



export class CabinetAuthRouter {
    constructor(protected _cabinetController: CabinetController) {
        // super(_cabinetController);
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
        console.log(req.params)
        this._cabinetController.getCabinetUsers(req['userId'])
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
        this._cabinetController.requestActionToCabinetUser(req.params['member_id'], req.body)
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

export const CabinetAuthRouterInstance: CabinetAuthRouter =
    new CabinetAuthRouter(CabinetControllerInstance);