import * as express from 'express';
import {MySqlDatabase} from '../class/class.mysql-database';
import {CryptoFunctions} from '../class/class.crypto-functions'
import {ExpressServer,HTTPMethod} from '../class/class.server';
import { RoutesHandler } from "../class/class.routeshandler";

import { WebUtility } from "./web-utility-routes";
import { DataModel } from "../datamodels/datamodel";
import { SQLUtility } from "./sql-utility";
import { EmailActivity } from "./email-activity";
import { UserRoutes } from "./user-routes";
import { MyApp } from "../app";
import { ImageUtility } from "./image-utility";


export class SaleRoutes{
    private server:ExpressServer;
    private encodingKey="akjh#&*^%^*$#(hgsjfa86t*^%*$Q21^$GFHG&^#@RG387gt";

    constructor(server:ExpressServer, db:MySqlDatabase){
        this.server=server;
        var me:SaleRoutes=this;

        server.setRoute("/sales/register", (req:express.Request, res:express.Response)=>{
            me.registerSales(req, res);
        }, HTTPMethod.POST);

        server.setRoute("/sales/set/profile", (req:express.Request, res:express.Response)=>{
            me.setProfile(req, res);
        }, HTTPMethod.POST);

    }

    private preProcessToken(req:express.Request, res:express.Response){
        if(!WebUtility.getParsedToken(req)){
            WebUtility.sendErrorMessage(res, req, DataModel.webResponses.account_token_error, "The accoun token is not valid.");
            return undefined;
        }

        let sessionToken  = WebUtility.getParsedToken(req, req.body.sessionToken, 30);
        console.log("parsed Val 2: "+JSON.stringify(sessionToken));
        if(!sessionToken){
            WebUtility.sendErrorMessage(res, req, DataModel.webResponses.session_token_error, "The session token is not valid. Please login again.");
            return undefined;
        }
        if(!(sessionToken["role"]==DataModel.userTypes.sales) || parseInt(sessionToken["adminId"])==NaN){
            WebUtility.sendErrorMessage(res, req, DataModel.webResponses.accessError, "You dont have valid access rights");
            return undefined;
        }

        //let id=["adminId"];
        return sessionToken;
    }

    private setProfile(req:express.Request, res:express.Response){
        const { adminId, role}=this.preProcessToken(req, res);
        if(!adminId)
            return;
        
        let sales=DataModel.tables.admin;
        
        WebUtility.adminSetProfile(req, res, sales, adminId);
    }

    private registerSales(req:express.Request, res:express.Response){
        if(!WebUtility.getParsedToken(req)){
            WebUtility.sendErrorMessage(res, req, DataModel.webResponses.account_token_error, "The account token is not valid.");
            return undefined;
        }

        let sessionToken  = WebUtility.getParsedToken(req, req.body.registerToken, 30);
        console.log("parsed Val 2: "+JSON.stringify(sessionToken));
        if(!sessionToken){
            WebUtility.sendErrorMessage(res, req, DataModel.webResponses.session_token_error, "The session token is not valid. Please Login again");
            return undefined;
        }
        if(!(sessionToken["role"]==DataModel.userTypes.sales+"_temp" || sessionToken["actualType"]==DataModel.userTypes.sales) || parseInt(sessionToken["adminId"])==NaN){
            WebUtility.sendErrorMessage(res, req, DataModel.webResponses.accessError, "You dont have valid access permissions");
            return undefined;
        }

        //let id=["adminId"];
        const { adminId, role, actualType}=sessionToken;
        if(actualType!=DataModel.userTypes.sales){
            return WebUtility.sendErrorMessage(res, req, DataModel.webResponses.accessError, "You dont have valid access permissions");
        }

        let firstName=req.body.firstName;
        let lastName=req.body.lastName;
        let password=req.body.password;
        
        if(!(password.match(/[A-Z]/) && password.match(/[a-z]/) && password.match(/[0-9]/) && password.match(/[^A-Za-z0-9]/)))
            return WebUtility.sendErrorMessage(res, req, DataModel.webResponses.inputError, "Invalid input, Password should contain atleast 1 caps, 1 small letter, 1 numeric and 1 symbol");

        let table = DataModel.tables.admin;
        MyApp.database.update(table.table, {
            [table.firstName]:firstName,
            [table.lastName]:lastName,
            [table.password]:password,
            [table.accountStatus]:DataModel.accountStatus.accepted,
        }, {
            [table.id]:adminId,
            [table.accountStatus]:DataModel.accountStatus.waiting,
        }).then(result=>{
            if(result){
                return WebUtility.sendSuccess(res, req, [], "Successfully Registered");
            }else{
                return WebUtility.sendErrorMessage(res, req, DataModel.webResponses.registerError, "The use might be already registered!!");
            }
        }, error=>{
            return WebUtility.sendErrorMessage(res, req, DataModel.webResponses.registerError, "Oops! Something went wrong.");
        }).catch(error=>{
            return WebUtility.sendErrorMessage(res, req, DataModel.webResponses.registerError, "Oops! Something went wrong on our server.");
        })
    }

    
}