import * as express from 'express';
import {MySqlDatabase} from '../class/class.mysql-database';
import {CryptoFunctions} from '../class/class.crypto-functions'
import {ExpressServer,HTTPMethod} from '../class/class.server';
import { RoutesHandler } from "../class/class.routeshandler";
import { DataModel } from "../datamodels/datamodel";
import { SQLUtility } from "./sql-utility";

export class ProvidersUtility{
    private database:MySqlDatabase;
    private server:ExpressServer;
    private static tokenRandText = "#4782q6hjnbb%6^&#&*!*bjhVU^&%^E^%$2jhrf**&$*Q(~)$*";

    constructor(server:ExpressServer, db:MySqlDatabase){
        this.server=server;
        this.database=db;    
        var me=this;

        server.setRoute("/token/providers", (req:express.Request, res:express.Response)=>{
            me.createToken(req, res);
        }, HTTPMethod.GET);
    }

    private createToken(req:express.Request, res:express.Response){
        console.log("My Cookies : "+JSON.stringify(req.cookies));
        var ip:string = ProvidersUtility.getIPAddress(req);
        console.log("My IP : "+ip+" - "+req.get("origin")+" : "+req.body.account_token);
        var tokenKey = ProvidersUtility.getTokenKey(req);
        console.log("0 : "+tokenKey+" - "+tokenKey.length);
        let account_token="";
        if(req.body.account_token){
            console.log("02");
            try {
                var tokenVal:string = CryptoFunctions.aes256Decrypt(req.body.account_token, tokenKey);
                var parsedVal = JSON.parse(tokenVal);
                if(parsedVal){
                    //if(parsedVal.ip!=ip || !parsedVal.date || parsedVal.origin!=req.get("origin"))
                    if(!ProvidersUtility.validateParsedToken(parsedVal, req))
                        account_token=ProvidersUtility.generateToken(ip, tokenKey, req.get("origin"), res);
                }else{
                    account_token=ProvidersUtility.generateToken(ip, tokenKey, req.get("origin"), res);
                }
            } catch (error) {
                account_token=ProvidersUtility.generateToken(ip, tokenKey, req.get("origin"), res);
            }
            
        }else{
            console.log("01");
            //this.generateToken(ip, tokenKey, req.get("origin"), res);
            try {
                account_token=ProvidersUtility.generateToken(ip, tokenKey, req.get("origin"), res);
            } catch (error) {
                console.log("Message : "+error);
            }
            console.log("03");
        }
        var response={
            account_token:account_token
        }
        //res.status(200);
        //res.end(JSON.stringify(response));
        RoutesHandler.respond(res, req, response, false, "Successfully created the token", 200);
        
    }

    public static getParsedToken(req:express.Request, token?:string, aliveTime?:number):{ip:string, date:string, origin:string}{
        if(token===undefined)
            token=req.body.account_token;
        try {
            var tokenVal:string = CryptoFunctions.aes256Decrypt(token, ProvidersUtility.getTokenKey(req));
        } catch (error) {
            //UtilityRoutes.sendErrorMessage(res, req, 403, "The account_token is not valid");
            return undefined;
        }
        var parsedVal = JSON.parse(tokenVal);
        if(parsedVal){
            console.log("Parsed Val : "+JSON.stringify(parsedVal));
            if(ProvidersUtility.validateParsedToken(parsedVal, req, aliveTime)){
                return parsedVal;
            }else{
                return undefined;
            }
        }else{
            return undefined;
        }
    }
    public static validateParsedToken(parsedVal:{ip:string, date:string, origin:string}, req:express.Request, aliveTime?:number):boolean{
        if(parsedVal.ip==ProvidersUtility.getIPAddress(req) 
            && parsedVal.date 
            && parsedVal.origin==req.get("origin")){
            
            if(aliveTime===undefined)
                return true;
            else{
                let timeDiff = Math.abs(parseInt(parsedVal.date)- Date.now())/(1000*60.0)
                if(timeDiff<aliveTime)
                    return true;
                else
                    return false;
            }
        }else{
            return false;
        }
    }
    public static generateToken(ip:string, key:string, origin:string, res:express.Response):string{
        console.log("1");
        var date = Math.floor(new Date().getTime());
        var jsonStr={
            ip:ip,
            date:date,
            origin:origin
        }
        console.log("2");
        var cookieStr:string = CryptoFunctions.aes256Encrypt(JSON.stringify(jsonStr), key);
        console.log("3 : "+cookieStr);
        //res.cookie("account_token", cookieStr);
        return cookieStr;
    }

    public static getIPAddress(req:express.Request):string{
        var ip:string = req.connection.remoteAddress || 
            req.socket.remoteAddress;
        return ip;
    }
    public static getTokenKey(req:express.Request):string{
        var ip:string = ProvidersUtility.getIPAddress(req);
        var tokenKey = CryptoFunctions.get256BitKey([ip, req.get("origin"), ProvidersUtility.tokenRandText]);
        return tokenKey;
    }

    //Returns true on valid string. False on invalid
    public static validateStringFields(value:string, min:number, max:number, res:express.Response, req:express.Request):boolean{
        if(value===undefined){
            var response = {
                status:400,
                description:"Invalid input, the login credentials are not valid."
            };
            RoutesHandler.respond(res, req,response, true, response["description"], 400);
            return false;
        }
        if(value.length>=min && max==-1?true:value.length<=max){
            return true;
        }else{
            var response = {
                status:400,
                description:"Invalid input, the login credentials are not valid."
            };
            // res.status(400);
            // res.end(JSON.stringify(response));
            RoutesHandler.respond(res, req,response, true, response["description"], 400);
            return false;
        }
    }
    public static sendErrorMessage(res:express.Response, req:express.Request, code:number, description:string){
        RoutesHandler.respond(res, req, [], true, description, code);
    }
    public static sendSuccess(res:express.Response, req:express.Request, data:any, description:string){
        RoutesHandler.respond(res, req, data, false, description, DataModel.providerResponse.success);
    }


    public static checkTimeThreshold(time:string, req:express.Request):boolean{
        let d1=new Date(time);
        let d2=new Date(Date.now);
        let timeDifference = Math.abs(d1.getTime() - d2.getTime())/(1000*60.0);

        if(timeDifference>30)
            return true;
        return false;        
    }
}