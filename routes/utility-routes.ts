import * as express from 'express';
import {MySqlDatabase} from '../class/class.mysql-database';
import {CryptoFunctions} from '../class/class.crypto-functions'
import {ExpressServer,HTTPMethod} from '../class/class.server';
import { RoutesHandler } from "../class/class.routeshandler";
import { DataModel } from "../datamodels/datamodel";
import { SQLUtility } from "./sql-utility";

export class UtilityRoutes{
    private database:MySqlDatabase;
    private server:ExpressServer;

    constructor(server:ExpressServer, db:MySqlDatabase){
        this.server=server;
        this.database=db;    
        var me=this;

        server.setRoute("/token", (req:express.Request, res:express.Response)=>{
            me.createToken(req, res);
        }, HTTPMethod.GET);
    }

    private createToken(req:express.Request, res:express.Response){
        console.log("My Cookies : "+JSON.stringify(req.cookies));
        var ip:string = UtilityRoutes.getIPAddress(req);
        console.log("My IP : "+ip+" - "+req.get("origin")+" : "+req.cookies.account_token);
        var tokenKey = UtilityRoutes.getTokenKey(req);
        console.log("0 : "+tokenKey+" - "+tokenKey.length);
        if(req.cookies.account_token){
            console.log("02");
            try {
                var tokenVal:string = CryptoFunctions.aes256Decrypt(req.cookies.account_token, tokenKey);
                var parsedVal = JSON.parse(tokenVal);
                if(parsedVal){
                    //if(parsedVal.ip!=ip || !parsedVal.date || parsedVal.origin!=req.get("origin"))
                    if(!UtilityRoutes.validateParsedToken(parsedVal, req))
                        UtilityRoutes.generateToken(ip, tokenKey, req.get("origin"), res);
                }else{
                    UtilityRoutes.generateToken(ip, tokenKey, req.get("origin"), res);
                }
            } catch (error) {
                UtilityRoutes.generateToken(ip, tokenKey, req.get("origin"), res);
            }
            
        }else{
            console.log("01");
            //this.generateToken(ip, tokenKey, req.get("origin"), res);
            try {
                UtilityRoutes.generateToken(ip, tokenKey, req.get("origin"), res);
            } catch (error) {
                console.log("Message : "+error);
            }
            console.log("03");
        }
        var response={
            status:200
        }
        //res.status(200);
        //res.end(JSON.stringify(response));
        RoutesHandler.respond(res, req, response, false, "Successfully created the token", 200);
        
    }

    public static getParsedToken(req:express.Request, aliveTime?:number, token?:string):{ip:string, date:string, origin:string}{
        if(token===undefined)
            token=req.cookies.account_token;
        try {
            var tokenVal:string = CryptoFunctions.aes256Decrypt(token, UtilityRoutes.getTokenKey(req));
        } catch (error) {
            //UtilityRoutes.sendErrorMessage(res, req, 403, "The account_token is not valid");
            return undefined;
        }
        var parsedVal = JSON.parse(tokenVal);
        if(parsedVal){
            console.log("Parsed Val : "+JSON.stringify(parsedVal));
            if(UtilityRoutes.validateParsedToken(parsedVal, req, aliveTime)){
                return parsedVal;
            }else{
                return undefined;
            }
        }else{
            return undefined;
        }
    }
    public static validateParsedToken(parsedVal:{ip:string, date:string, origin:string}, req:express.Request, aliveTime?:number):boolean{
        if(parsedVal.ip==UtilityRoutes.getIPAddress(req) 
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
    public static generateToken(ip:string, key:string, origin:string, res:express.Response){
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
        res.cookie("account_token", cookieStr);
    }

    public static getIPAddress(req:express.Request):string{
        var ip:string = req.connection.remoteAddress || 
            req.socket.remoteAddress;
        return ip;
    }
    public static getTokenKey(req:express.Request):string{
        var ip:string = UtilityRoutes.getIPAddress(req);
        var tokenKey = CryptoFunctions.get256BitKey([ip, req.get("origin"), "Random Text Here to fill up 32 bits"]);
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
        var json={
            status:code,
            description:description
        };
        // res.status(code);
        // res.end(JSON.stringify(json));
        RoutesHandler.respond(res, req, json, true, json["description"], code);
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