import * as express from 'express';
import {MySqlDatabase} from '../class/class.mysql-database';
import {CryptoFunctions} from '../class/class.crypto-functions'
import {ExpressServer,HTTPMethod} from '../class/class.server';
import { RoutesHandler } from "../class/class.routeshandler";
import { DataModel } from "../datamodels/datamodel";
import { SQLUtility } from "./sql-utility";


export class UsersUtility {

    private database:MySqlDatabase;
    private server:ExpressServer;
    public static myPackageName="com.idarts.massage.app";
    private static tokenRandText="bigsBH$^#Q*%&*YVUGAFGIY^$*Q&#TY*H(&hg8yHFAUihgdsyug&*$Q(&";

    constructor(server:ExpressServer, db:MySqlDatabase){
        this.server=server;
        this.database=db;    
        var me=this;

        server.setRoute("/token/users", (req:express.Request, res:express.Response)=>{
            me.createToken(req, res);
        }, HTTPMethod.POST);
    }

    private createToken(req:express.Request, res:express.Response){
        if(!req.body.mac || !req.body.origin)
            return UsersUtility.sendErrorMessage(res,  DataModel.userResponse.tokenError, "The Request is invalid");

        let mac = req.body.mac;
        let origin = this.decodeOrigin(req.body.origin, mac);

        let token = UsersUtility.getTokenKey(req);
        var date = Math.floor(new Date().getTime());
        let json={
            mac:mac,
            origin:origin,
            date:date
        }

        let encrypted = CryptoFunctions.aes256Encrypt(JSON.stringify(json), token);

        let output={
            code:encrypted
        }
        
        //return RoutesHandler.respond(res, req, output, false, "Successful fetching token", DataModel.responseStatus.success);
        return UsersUtility.sendSuccess(res, output, "Successful fetching token");
    }
    public static createEncryptedID(req:express.Request, id:string):string{
        if(!req.body.code)
            return undefined;
        
        let token = UsersUtility.getCodedTokenKey(req);
        var date = Math.floor(new Date().getTime());
        let json={
            id:id,
            date:date
        }

        let encrypted = CryptoFunctions.aes256Encrypt(JSON.stringify(json), token);

        return encrypted;
    }
    public static decryptId(req:express.Request):number{
        if(!req.body.code || !req.body.id)
            return undefined;
        let myCode=req.body.id;
        try {
            var tokenVal:string = CryptoFunctions.aes256Decrypt(myCode, UsersUtility.getCodedTokenKey(req));
        } catch (error) {
            return undefined;
        }
        var parsedVal = JSON.parse(tokenVal);
        if(parsedVal){
            console.log("Parsed Val : "+JSON.stringify(parsedVal));
            if(!parsedVal.id)
                return undefined;
            if(parseInt(parsedVal.id)===NaN)
                return undefined;
            return parseInt(parsedVal.id);
        }else{
            return undefined;
        }
    }
    public static getParsedToken(req:express.Request, aliveTime?:number):{mac:string, origin:string, date:string}{
        if(!req.body.code || !req.body.mac)
            return undefined;
        let myCode=req.body.code;
        try {
            var tokenVal:string = CryptoFunctions.aes256Decrypt(myCode, UsersUtility.getTokenKey(req));
        } catch (error) {
            return undefined;
        }
        var parsedVal = JSON.parse(tokenVal);
        if(parsedVal){
            console.log("Parsed Val : "+JSON.stringify(parsedVal));
            if(UsersUtility.validateParsedToken(parsedVal, req, aliveTime)){
                return parsedVal;
            }else{
                console.log("Its invalidated");
                return undefined;
            }
        }else{
            return undefined;
        }
    }
    public static validateParsedToken(parsedVal:{mac:string, origin:string, date:string}, req:express.Request, aliveTime?:number):boolean{
        if(parsedVal.mac== req.body.mac
            && parsedVal.date 
            && parsedVal.origin==UsersUtility.myPackageName){
            
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

    private decodeOrigin(str:string, mac:string):string{
        //TODO Write code to decode the origin
        return str;
    }

    public static validateStringFields(value:string, min:number, max:number):boolean{
        if(value===undefined){
            return false;
        }
        if(value.length>=min && max==-1?true:value.length<=max){
            return true;
        }else{
            return false;
        }
    }

    public static getTokenKey(req:express.Request):string{
        let mac = req.body.mac;
        var tokenKey = CryptoFunctions.get256BitKey([mac, UsersUtility.tokenRandText]);
        return tokenKey;
    }
    public static getCodedTokenKey(req:express.Request):string{
        let code = req.body.code;
        var tokenKey = CryptoFunctions.get256BitKey([code, UsersUtility.tokenRandText]);
        return tokenKey;
    }

    public static sendErrorMessage(res:express.Response, code:number, description:string){
        var json=[];
        // res.status(code);
        // res.end(JSON.stringify(json));
        RoutesHandler.respond(res, undefined, json, true, description, code);
    }
    public static sendSuccess(res:express.Response, data:any, description:string){        
        RoutesHandler.respond(res, undefined, data, false, description, DataModel.userResponse.success);
    }
}