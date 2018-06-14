import * as express from 'express';
import {MySqlDatabase} from '../class/class.mysql-database';
import {CryptoFunctions} from '../class/class.crypto-functions'
import {ExpressServer,HTTPMethod} from '../class/class.server';
import { WebUtility } from "./web-utility-routes";
import { RoutesHandler } from "../class/class.routeshandler";
import { DataModel } from "../datamodels/datamodel";
import { SQLUtility } from "./sql-utility";
import { ImageUtility } from "./image-utility";
import { UsersUtility } from "./users-utility-routes";

export class StripePayments{

    private database:MySqlDatabase;
    private server:ExpressServer;

    constructor(server:ExpressServer, db:MySqlDatabase){
        this.database=db;
        this.server=server;
        var me:StripePayments=this;
        server.setRoute("/payment/confirm", (req:express.Request, res:express.Response)=>{
            me.displayPayScreen(req, res);
        }, HTTPMethod.GET);

        server.setRoute("/payment/charge", (req:express.Request, res:express.Response)=>{
            me.processCharge(req, res);
        }, HTTPMethod.POST);
    }

    private displayPayScreen(req:express.Request, res:express.Response){
        res.render("payment", {paymentId:12, code:"Helloo From the other side", mac:"My Mac Address", id:23, amount:30000});
        let b=true;
        if(b)
            return;
        if(!req.query.code || !req.query.mac)
            return UsersUtility.sendErrorMessage(res, DataModel.userResponse.tokenError, "Something went wrong")

        //Adding to the body
        req.body.code=req.query.code;
        req.body.mac=req.query.mac;
        req.body.id=req.query.id;
        

        if(!UsersUtility.getParsedToken(req)){
            return UsersUtility.sendErrorMessage(res, DataModel.userResponse.tokenError, "The token is invalid")
        }
        if(!req.query.paymentId)
            return UsersUtility.sendErrorMessage(res, DataModel.userResponse.inputError, "The Payment ID not configured");
        if(!req.body.id)
            return UsersUtility.sendErrorMessage(res, DataModel.userResponse.idError, "The ID doesn't exists in the query");
        let id = parseInt(req.body.id);
        if(id === NaN)
            return UsersUtility.sendErrorMessage(res, DataModel.userResponse.inputError, "Invalid ID");

        let paymentId = req.query.paymentId;

        let payments=DataModel.tables.payments;
        let sessions=DataModel.tables.sessions;
        let providers=DataModel.tables.providers;
        let sql = "SELECT * \
            FROM "+payments.table+" natural join "+sessions.table+" natural join "+providers.table+" \
            WHERE "+payments.id+"="+paymentId;
        this.database.getQueryResults(sql, []).then(result=>{
            if(result.length==1){
                let out=result[0];
                let json={
                    providerName:out[providers.firstName]+" "+providers.lastName,
                    massageType:out[sessions.massageType],
                    massageLength:out[sessions.massageLength],
                    massageDate:out[sessions.dateTime],
                    paymentId:paymentId,
                    code:req.body.code,
                    mac:req.body.code,
                    id:id,
                    amount:out[payments.amount]*100
                };
                res.render("payment", json);
            }else{
                return UsersUtility.sendErrorMessage(res, DataModel.userResponse.paymentError, "Something went wrong! Cant finf Payment ID");
            }
        }, error=>{
            return UsersUtility.sendErrorMessage(res, DataModel.userResponse.paymentError, "Something went wrong! "+error);
        }).catch(error=>{
            return UsersUtility.sendErrorMessage(res, DataModel.userResponse.paymentError, "Something went wrong! "+error);
        })        
    }

    private processCharge(req:express.Request, res:express.Response){
        
        res.render("successPayment", {amount:5000});
    }
}