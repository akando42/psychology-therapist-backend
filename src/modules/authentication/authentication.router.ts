import { Router, Request, Response } from "express";

import { HttpResponseCodes } from "../../enums/http-response-codes.enum";
import { AuthenticationImplModule } from "./core/authentication-impl.module";
import { AbstractAuthenticationModule } from "./core/abstract-authentication.module";
import { TODAuthenticationModule } from ".";

export class AuthenticationRouter {

    constructor() {
    }


    init(): Router {
        const router: Router = Router();
        router.post('/authentication/login/:role', (req, res) => this.authenticate(req, res));
        // router.post('/authentication/signup', (req, res) => this.signup(req, res));

        router.post('/authentication/signup/:invitation_token', (req, res) => this.signUpWithInvitation(req, res));

        router.post('/authentication/change-password', (req, res) => this.signup(req, res));

        router.get('/authentication/verify-email', (req, res) => this.verifyEmail(req, res));


        return router;

    }

    authenticate(req: Request, res: Response): void {
        TODAuthenticationModule.authenticate(req.body,req.params['role'])
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
        // TODAuthenticationModule.changePassword(req.body)
        //     .then((result: any) => {
        //         //sent the response.
        //         res.status(200).json(result);

        //     }).catch((err) => {
        //         //handler error propertly
        //         res.status(HttpResponseCodes.loginError).json(err)
        //         console.log(err)
        //     });
    }

    signup(req: Request, res: Response): void {
        TODAuthenticationModule.signup(req.body)
            .then((result: any) => {
                console.log(result);
                res.status(200).json(result);
            }).catch((err) => {
                //better erro handler here
                res.status(500).json(err)
            });
    }


    verifyEmail(req: Request, res: Response): void {
        TODAuthenticationModule.verifyEmail(req.query['hash'])
            .then((result: any) => {
                res.status(200).json(result);
            }).catch((err) => {
                console.log(err);
            });
    }

    signUpWithInvitation(req: Request, res: Response): void {
        TODAuthenticationModule.signUpWithInvitation(req.params['invitation_token'], req.body)
            .then((result: any) => {
                res.status(200).json(result);
            }).catch((err) => {
                res.status(400).json(err);
            });
    }

}


