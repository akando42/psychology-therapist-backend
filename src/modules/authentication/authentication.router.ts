import { Router, Request, Response } from "express";

import { HttpResponseCodes } from "../../enums/http-response-codes.enum";
import { AuthenticationModule } from "./core/authentication.component";

export class AuthenticationRouter {

    constructor(protected _authComponent: AuthenticationModule) {
    }


    init(): Router {
        const router: Router = Router();
        router.post('/authentication/login', (req, res) => this.authenticate(req, res));
        // router.post('/authentication/signup', (req, res) => this.signup(req, res));

        router.post('/authentication/signup/:invitation_token', (req, res) => this.signUpWithInvitation(req, res));

        router.post('/authentication/change-password', (req, res) => this.signup(req, res));

        router.get('/authentication/verify-email', (req, res) => this.verifyEmail(req, res));


        return router;

    }

    authenticate(req: Request, res: Response): void {
        this._authComponent.authenticate(req.body)
            .then((result: any) => {
                //sent the response.
                res.status(200).json(result);

            }).catch((err) => {
                //handler error propertly
                res.status(HttpResponseCodes.loginError).json(err)
                console.log(err)
            });
    }


    changePassword(req: Request, res: Response): void {
        this._authComponent.changePassword(req.body)
            .then((result: any) => {
                //sent the response.
                res.status(200).json(result);

            }).catch((err) => {
                //handler error propertly
                res.status(HttpResponseCodes.loginError).json(err)
                console.log(err)
            });
    }

    signup(req: Request, res: Response): void {
        this._authComponent.signup(req.body)
            .then((result: any) => {
                console.log(result);
                res.status(200).json(result);
            }).catch((err) => {
                //better erro handler here
                res.status(500).json(err)
            });
    }


    verifyEmail(req: Request, res: Response): void {
        this._authComponent.verifyEmail(req.query['email'], req.query['hash'])
            .then((result: any) => {
                res.status(200).json(result);
            }).catch((err) => {
                console.log(err);
            });
    }

    signUpWithInvitation(req: Request, res: Response): void {
        this._authComponent.signUpWithInvitation(req.query['invitation_token'], req.body)
            .then((result: any) => {
                res.status(200).json(result);
            }).catch((err) => {
                res.status(400).json(err);
            });
    }
}


