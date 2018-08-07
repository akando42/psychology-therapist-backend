import { Router, Request, Response } from "express";
import * as express from 'express';

import { AuthenticationControllerInstance } from "./authentication.controller";

export class AuthenticationRouter {

    constructor() {
    }


    init(): Router {
        const router: Router = Router();
        router.post('/authentication/login', (req, res) => this.authenticate(req, res));
        router.post('/authentication/signup', (req, res) => this.signup(req, res));

        this._logger.log('router mounted!');
        return router;
    }

    authenticate(req: Request, res: Response): void {
        AuthenticationControllerInstance.authenticate(req.body)
            .then((result: any) => {
                //sent the response.
                res.status(200).json(result);

            }).catch((err) => {
                //handler error propertly
                console.log(err)
            });
    }

    signup(req: Request, res: Response): void {
        AuthenticationControllerInstance.signup(req, res)
            .then((result: any) => {
                res.status(200).json(result);
            }).catch((err) => {
                console.log(err);
            });
    }


}

export const AuthenticationRouterInstance: AuthenticationRouter = new AuthenticationRouter();

