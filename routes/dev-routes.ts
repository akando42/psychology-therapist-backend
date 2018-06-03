import * as express from 'express';
import {MySqlDatabase} from '../class/class.mysql-database';
import {CryptoFunctions} from '../class/class.crypto-functions'
import {ExpressServer,HTTPMethod} from '../class/class.server';
import { WebUtility } from "./web-utility-routes";
import {UsersUtility} from "./users-utility-routes";
import { RoutesHandler } from "../class/class.routeshandler";
import { DataModel } from "../datamodels/datamodel";
import { SQLUtility } from "./sql-utility";
import { ImageUtility } from "./image-utility";

export class DevelopmentRoutings{
    private database:MySqlDatabase;
    private server:ExpressServer;

    constructor(server:ExpressServer, db:MySqlDatabase){
        this.database=db;
        this.server=server;
        var me:DevelopmentRoutings=this;
        server.setRoute("/dev/test1", (req:express.Request, res:express.Response)=>{
            me.test1(req, res);
        }, HTTPMethod.POST);
    }

    private test1(req:express.Request, res:express.Response){
        let image = req.body.image;
        res.end(ImageUtility.uploadImage(image, DataModel.imageTypes.profileImage, 1, true));
    }
}