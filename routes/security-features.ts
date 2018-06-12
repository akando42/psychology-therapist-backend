import * as express from 'express';
import {MySqlDatabase} from '../class/class.mysql-database';
import {CryptoFunctions} from '../class/class.crypto-functions'
import {ExpressServer,HTTPMethod} from '../class/class.server';
import { RoutesHandler } from "../class/class.routeshandler";
import { DataModel } from "../datamodels/datamodel";
import { WebUtility } from "./web-utility-routes";
import { MyDatabase } from "../app";

export class SecurityFeatures{

    public static token_couter(req:express.Request, res:express.Response, next){
        let account_token = WebUtility.getParsedToken(req)
        if(account_token){
            let table = DataModel.tables.tokenTracker;
            let sql = "SELECT * \
                FROM "+table.table+"\
                WHERE "+table.ip+"='"+account_token.ip+"'";
            console.log("SQL : "+sql);
            MyDatabase.database.getQueryResults(sql, []).then(result=>{
                if(result.length>0){
                    let out=result[0]
                    //TODO Process different conditions and validate or invalidate the token
                    let curDateTime = new Date().toISOString().slice(0, 19).replace('T', ' ');
                    let lastDateTime:string = ""+out[table.lastApiCallTime];
                    let lastMin = lastDateTime.substring(lastDateTime.indexOf(':')+1, lastDateTime.lastIndexOf(':'));
                    let curMin = curDateTime.substring(curDateTime.indexOf(':')+1, curDateTime.lastIndexOf(':'));
                    
                    console.log("Minute Comparison : "+lastMin+" : "+curMin)
                    if(curMin==lastMin){
                        let totCalls:number=out[table.totalCallsInAMinute];
                        if(totCalls>30){
                            WebUtility.sendErrorMessage(res, req, DataModel.webResponses.totalAPICallsExceeded, "Please wait for a while before again calling the apis");
                        }else{
                            SecurityFeatures.updateTokenState(req, res,account_token, out, false, next);
                        }
                    }else{
                        SecurityFeatures.updateTokenState(req, res,account_token, out, true, next);
                    }
                }else{
                    SecurityFeatures.addTokenToDatabase(account_token, req.body.account_token);
                    next();
                }
            }, error=>{
                console.log("Its here 1");
                
                next();
            }).catch(error=>{
                console.log("Its here 2 : "+error);
                next();
            })            
        }else{
            console.log("Security : Couldn't find any account_token");
            next();
        }        
    }
    private static updateTokenState(req:express.Request, res:express.Response, account_token:{
            ip:string,
            date:number,
            origin:string
        }, out, reinit:Boolean, next){
            
        let table = DataModel.tables.tokenTracker;
        let dateTime = new Date().toISOString().slice(0, 19).replace('T', ' ');
        let updateJSON={};
        if(!reinit){
            updateJSON={
                [table.totalCallsInAMinute]:out[table.totalCallsInAMinute]+ 1,
                [table.currentApiCallTime]: dateTime
            }
        }else{
            updateJSON={
                [table.totalCallsInAMinute]:0,
                [table.lastApiCallTime]:dateTime,
                [table.currentApiCallTime]:dateTime,
                [table.currentApiCallTime]: dateTime
            }
        }
        MyDatabase.database.update(table.table,updateJSON, {
            [table.ip]:account_token["ip"]
        }).then(result=>{
            next();
        }, error=>{
            WebUtility.sendErrorMessage(res, req, DataModel.webResponses.account_token_error, "Token Error : "+error);
        }).catch(error=>{
            WebUtility.sendErrorMessage(res, req, DataModel.webResponses.account_token_error, "Token Error : "+error);
        })
    }
    public static addTokenToDatabase(account_token:{
            ip:string,
            date:number,
            origin:string
        }, encodedToken){

        let dateTime = new Date(account_token.date).toISOString().slice(0, 19).replace('T', ' ');
        let table = DataModel.tables.tokenTracker;
        MyDatabase.database.insert(table.table, {
            [table.code]:encodedToken,
            [table.ip]:account_token.ip,
            [table.tokenCreationTime]:dateTime,
        }, true).then(result=>{
            //Do Nothing
        }, error=>{
            //Do Nothing
        }).catch(error=>{
            //Do Nothing
        })
    }
}