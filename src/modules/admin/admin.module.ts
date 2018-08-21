import * as express from 'express';
import { Application } from "express";
import { AuthenticationRouterInstance } from './sub-modules/authentication';
import { CabinetAuthRouterInstance } from './sub-modules/cabinet/cabinet.router';
import { CabinetModule } from './sub-modules/cabinet/cabinet.module';


export class AdminModule {
    public application: Application;
    constructor() {

        this.application = express();


    }

    public init(): Application {
        this._mounthRouter();
        return this.application;
    }
    private _mounthRouter(): void {
        this.application.use('/cabinet', new CabinetModule().init());
        this.application.use(AuthenticationRouterInstance.init());
        this.application.use('/*', (req, res) => {
            res.send('WHAT ARE YOU TRYING TO DO -.-')
        })

        //resources attached to one admin    
    }

}