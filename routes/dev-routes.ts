import * as express from 'express';
import {MySqlDatabase} from '../class/class.mysql-database';
import {CryptoFunctions} from '../class/class.crypto-functions'
import {ExpressServer,HTTPMethod} from '../class/class.server';
import {UtilityRoutes} from "./utility-routes";
import { RoutesHandler } from "../class/class.routeshandler";
import { DataModel } from "../datamodels/datamodel";
import { SQLUtility } from "./sql-utility";

export class DevelopmentRoutings{
    private database:MySqlDatabase;
    private server:ExpressServer;

    constructor(server:ExpressServer, db:MySqlDatabase){
        this.database=db;
        this.server=server;
        var me:DevelopmentRoutings=this;
        server.setRoute("/dev/test1", (req:express.Request, res:express.Response)=>{
            me.test1(req, res);
        }, HTTPMethod.GET);
    }

    private test1(req:express.Request, res:express.Response){
        
    }
}