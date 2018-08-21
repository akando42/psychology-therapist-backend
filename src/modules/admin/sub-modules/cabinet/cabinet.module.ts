import * as express from 'express';
import { Application } from "express";
import { CabinetAuthRouterInstance } from './cabinet.router';

export class CabinetModule {
    public application: Application;
    constructor() {

        this.application = express();


    }

    public init(): Application {
        this._mounthRouter();
        return this.application;
    }
    private _mounthRouter(): void {
        this.application.use(CabinetAuthRouterInstance.init());
        this.application.use('/*', (req, res) => {
            res.send('WHAT ARE YOU TRYING TO DO with cabinet -.-')
        })

        //resources attached to one admin    
    }

}