import { Router, Request, Response } from "express";

import { AuthenticationController, AuthenticationControllerInstance } from "./authentication.controller";

export class AuthenticationRouter {

    constructor(protected _authController: AuthenticationController) {
    }


    init(): Router {
        const router: Router = Router();
        router.post('/authentication/login', (req, res) => this.authenticate(req, res));
        router.post('/authentication/signup', (req, res) => this.signup(req, res));

        return router;

    }

    authenticate(req: Request, res: Response): void {
        this._authController.authenticate(req.body)
            .then((result: any) => {
                //sent the response.
                res.status(200).json(result);

            }).catch((err) => {
                //handler error propertly
                console.log(err)
            });
    }

    signup(req: Request, res: Response): void {
        this._authController.signup(req.body)
            .then((result: any) => {
                res.status(200).json(result);
            }).catch((err) => {
                console.log(err);
            });
    }


}

export const AuthenticationRouterInstance: AuthenticationRouter =
    new AuthenticationRouter(AuthenticationControllerInstance)

