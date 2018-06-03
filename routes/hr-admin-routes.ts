import * as express from 'express';
import {MySqlDatabase} from '../class/class.mysql-database';
import {CryptoFunctions} from '../class/class.crypto-functions'
import {ExpressServer,HTTPMethod} from '../class/class.server';
import { RoutesHandler } from "../class/class.routeshandler";

import { WebUtility } from "./web-utility-routes";
import { DataModel } from "../datamodels/datamodel";
import { SQLUtility } from "./sql-utility";


export class HRAdminRoutes{
    private database:MySqlDatabase;
    private server:ExpressServer;

    constructor(server:ExpressServer, db:MySqlDatabase){
        this.database=db;
        this.server=server;
        var me:HRAdminRoutes=this;
        server.setRoute("/admin/login", (req:express.Request, res:express.Response)=>{
            
        }, HTTPMethod.POST);
    }

    private login(req:express.Request, res:express.Request){

    }

    private changePassword(req:express.Request, res:express.Request){

    }

    private addAccount(req:express.Request, res:express.Request){

    }

    private unlockAccount(req:express.Request, res:express.Request){

    }

    private deleteAccount(req:express.Request, res:express.Request){

    }

    private resetPassword(req:express.Request, res:express.Request){

    }
}