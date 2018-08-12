import { AuthenticationController } from "../../../authentication/authentication.controller";
import { Router, Response, Request } from "express";
import { TokenValidationMiddleware } from "../../../../middlewares/token-validation.middleware";
import { IWriteReadController } from "../../../../behavior/controllers/write-read-controller.interface";
import { IUser } from "../../../../models/user";
import { WRAbstractRouter } from "../../../../behavior/routers/w-r-abstract.router";
import { CabinetControllerInstance } from "./cabinet.controller";



export class CabinetAuthRouter extends WRAbstractRouter<IUser>{
    constructor(protected _authController: any) {
        super(_authController);
    }

    init(): Router {
        const router: Router = Router();
        router.post(`/cabinet-users`, TokenValidationMiddleware, this.create.bind(this));

        router.get(`/cabinet/users`, TokenValidationMiddleware, this.getAll.bind(this));

        return router;
    }

    getCabinetUsers(req: Request, res: Response): void {

        this._authController.getCabinetUsers(req['userId'])
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