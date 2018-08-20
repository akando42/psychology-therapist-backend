import { Router, Response, Request } from "express";
import { TokenValidationMiddleware } from "../../../../middlewares/token-validation.middleware";
import { IUser } from "../../../../models/user";
import { WRAbstractRouter } from "../../../../behavior/routers/w-r-abstract.router";
import { CabinetControllerInstance } from "./cabinet.controller";



export class CabinetAuthRouter extends WRAbstractRouter<IUser>{
    constructor(protected _authController: any) {
        super(_authController);
    }

    init(): Router {
        const router: Router = Router({ mergeParams: true });
        router.post(`/cabinet`, this.create.bind(this));

        router.get(`/cabinet/members`, this.getCabinetUsers.bind(this));

        return router;
    }

    getCabinetUsers(req: Request, res: Response): void {
        console.log(req.params)
        this._authController.getCabinetUsers(req.params['admin_id'])
            .then((result) => {
                //sent the response.
                res.status(200).json(result);

            })
            .catch((error) => {
                console.log(error);
            })
    }
}

export const CabinetAuthRouterInstance: CabinetAuthRouter =
    new CabinetAuthRouter(CabinetControllerInstance);