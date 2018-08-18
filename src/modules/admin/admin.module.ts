import * as express from 'express';
import { Application } from "express";
import { AuthenticationRouterInstance } from './sub-modules/authentication';
import { CabinetAuthRouterInstance } from './sub-modules/cabinet/cabinet.router';


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
        this.application.use('/', (req, res) => {
            res.send('NO WAY')
        })
        this.application.use('authentication', AuthenticationRouterInstance.init());
        this.application.use('cabinet', CabinetAuthRouterInstance.init());
    }

}