import { Application } from 'express';
import * as express from 'express';
import * as bodyParser from "body-parser";
import * as cors from 'cors';
import { AuthenticationRouterInstance } from './modules/authentication';
import { CabinetUserAuthRouter, CabinetUserAuthRouterInstance } from './modules/admin/sub-modules/cabinet-users/cabinet-user.router';


export class API {

    public express: Application;

    // public appContext: AppContext;
    constructor() {
        //create App contenxt
        // this.appContext = appContext;
        this.express = express();
        this.middleware();
        this.mountRoutes();
    }

    private middleware() {
        // this.express.use(cors('*'));
        this.express.use(bodyParser.json());
        // this.express.use(bodyParser.urlencoded({ extended: false }));

    }

    private mountRoutes(): void {

        this.express.use('/api/v1', AuthenticationRouterInstance.init());
        this.express.use('/api/v1', CabinetUserAuthRouterInstance.init());

    }




}

