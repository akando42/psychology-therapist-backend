import * as express from 'express';
import { Application } from "express";
import { AuthenticationRouterInstance } from './sub-modules/authentication';
import { TokenValidationMiddleware } from '../../middlewares/token-validation.middleware';
import { CabinetsRouter } from './sub-modules/cabinet/cabinet.router';


export class AdminRouter {

    public application: Application;

    constructor() {
        this.application = express();
    }

    public init(): Application {
        this._mounthRouter();
        return this.application;
    }

    private _mounthRouter(): void {
        this.application.use('/cabinet', TokenValidationMiddleware, new CabinetsRouter().init());
        this.application.use(AuthenticationRouterInstance.init());
        this.application.use('/*', (req, res) => {
            res.send('WHAT ARE YOU TRYING TO DO -.-')
        })

        //resources attached to one admin    
    }

}