import { Router, Request, Response } from "express";

import { AuthenticationController, AuthenticationControllerInstance } from "./authentication.controller";
import { HttpResponseCodes } from "../../enums/http-response-codes.enum";

export class AuthenticationRouter {

    constructor(protected _authController: AuthenticationController) {
    }


    init(): Router {
        const router: Router = Router();
        router.post('/authentication/login', (req, res) => this.authenticate(req, res));
        router.post('/authentication/signup', (req, res) => this.signup(req, res));
        router.post('/authentication/change-password', (req, res) => this.signup(req, res));

        router.get('/authentication/verify-email', (req, res) => this.verifyEmail(req, res));


        return router;

    }

    authenticate(req: Request, res: Response): void {
        this._authController.authenticate(req.body)
            .then((result: any) => {
                //sent the response.
                res.status(200).json(result);

            }).catch((err) => {
                //handler error propertly
                res.status(HttpResponseCodes.loginError).json(err)
                console.log(err)
            });
    }

    
    // changePassword(req: Request, res: Response): void {
    //     this._authController.(req.body)
    //         .then((result: any) => {
    //             //sent the response.
    //             res.status(200).json(result);

    //         }).catch((err) => {
    //             //handler error propertly
    //             res.status(HttpResponseCodes.loginError).json(err)
    //             console.log(err)
    //         });
    // }

    signup(req: Request, res: Response): void {
        this._authController.signup(req.body)
            .then((result: any) => {
                console.log(result);
                res.status(200).json(result);
            }).catch((err) => {
                //better erro handler here
                res.status(500).json(err)
            });
    }


    verifyEmail(req: Request, res: Response): void {
        this._authController.verifyEmail(req.query['email'], req.query['hash'])
            .then((result: any) => {
                res.status(200).json(result);
            }).catch((err) => {
                console.log(err);
            });
    }
}

export const AuthenticationRouterInstance: AuthenticationRouter =
    new AuthenticationRouter(AuthenticationControllerInstance)

