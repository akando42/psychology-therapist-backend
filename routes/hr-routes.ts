import * as express from 'express';
import {MySqlDatabase} from '../class/class.mysql-database';
import {CryptoFunctions} from '../class/class.crypto-functions'
import {ExpressServer,HTTPMethod} from '../class/class.server';
import { RoutesHandler } from "../class/class.routeshandler";

import { WebUtility } from "./web-utility-routes";
import { DataModel } from "../datamodels/datamodel";
import { SQLUtility } from "./sql-utility";

export class HRRoutes{
    private static database:MySqlDatabase;
    private static server:ExpressServer;

    constructor(server:ExpressServer, db:MySqlDatabase){
        HRRoutes.database=db;
        HRRoutes.server=server;
        var me:HRRoutes=this;

        server.setRoute("/hr/register", (req:express.Request, res:express.Response)=>{
            me.registerHR(req, res);
        }, HTTPMethod.POST);

        server.setRoute("/hr/get/:action", (req:express.Request, res:express.Response)=>{
            me.hrGetAction(req, res);
        }, HTTPMethod.POST);
        server.setRoute("/hr/action/:action", (req:express.Request, res:express.Response)=>{
            me.hrAction(req, res);
        }, HTTPMethod.POST);
    }

    private registerHR(req:express.Request, res:express.Response){
        if(!WebUtility.getParsedToken(req)){
            WebUtility.sendErrorMessage(res, req, DataModel.webResponses.account_token_error, "The accountToken is not valid");
            return undefined;
        }

        let sessionToken  = WebUtility.getParsedToken(req, req.body.registerToken, 30);
        console.log("parsed Val 2: "+JSON.stringify(sessionToken));
        if(!sessionToken){
            WebUtility.sendErrorMessage(res, req, DataModel.webResponses.session_token_error, "The sessionToken is not valid");
            return undefined;
        }
        if(!(sessionToken["type"]==DataModel.userTypes.hr+"_temp" || sessionToken["actualType"]==DataModel.userTypes.hr) || parseInt(sessionToken["adminId"])==NaN){
            WebUtility.sendErrorMessage(res, req, DataModel.webResponses.accessError, "You dint valid access rights");
            return undefined;
        }

        //let id=["adminId"];
        const { adminId, type, actualType}=sessionToken;
        if(actualType!=DataModel.userTypes.hr){
            return WebUtility.sendErrorMessage(res, req, DataModel.webResponses.accessError, "Access Error!!");
        }

        let firstName=req.body.firstName;
        let lastName=req.body.lastName;
        let password=req.body.password;

        if(!(password.match(/[A-Z]/) && password.match(/[a-z]/) && password.match(/[0-9]/) && password.match(/[^A-Za-z0-9]/)))
            return WebUtility.sendErrorMessage(res, req, DataModel.webResponses.inputError, "Invalid input, Password should containg atleast 1 caps, 1 small letter, 1 numeric and 1 symbol");

        let table = DataModel.tables.hr;
        HRRoutes.database.update(table.table, {
            [table.firstName]:firstName,
            [table.lastName]:lastName,
            [table.password]:password,
            [table.accountStatus]:DataModel.accountStatus.accepted,
        }, {
            [table.id]:adminId
        }).then(result=>{
            if(result){
                return WebUtility.sendSuccess(res, req, [], "Successfully Registered");
            }else{
                return WebUtility.sendErrorMessage(res, req, DataModel.webResponses.registerError, "Could not update Table!!");
            }
        }, error=>{
            return WebUtility.sendErrorMessage(res, req, DataModel.webResponses.registerError, "Something went wrong : "+error);
        }).catch(error=>{
            return WebUtility.sendErrorMessage(res, req, DataModel.webResponses.registerError, "Something went wrong : "+error);
        })
    }

    private preProcessToken(req:express.Request, res:express.Response){
        if(!WebUtility.getParsedToken(req)){
            WebUtility.sendErrorMessage(res, req, DataModel.webResponses.account_token_error, "The accountToken is not valid");
            return undefined;
        }

        let sessionToken  = WebUtility.getParsedToken(req, req.body.sessionToken, 30);
        console.log("parsed Val 2: "+JSON.stringify(sessionToken));
        if(!sessionToken){
            WebUtility.sendErrorMessage(res, req, DataModel.webResponses.session_token_error, "The sessionToken is not valid");
            return undefined;
        }
        if(!(sessionToken["type"]==DataModel.userTypes.hr || 
                sessionToken["type"]==DataModel.userTypes.admin ||
                sessionToken["type"]==DataModel.userTypes.moderator) || parseInt(sessionToken["adminId"])==NaN){
            WebUtility.sendErrorMessage(res, req, DataModel.webResponses.session_token_error, "The sessionToken is not valid");
            return undefined;
        }

        let id=sessionToken["adminId"];
        return id
    }

    
    private hrGetAction(req:express.Request, res:express.Response){

        let hrId=this.preProcessToken(req, res);
        if(!hrId)
            return;

        let action = req.params.action;
        let providers = DataModel.tables.providers;
        let providersDocs = DataModel.tables.providersDoc;
        let sql = "SELECT * FROM "+providers.table+" WHERE "+providers.accountStatus+" = "
        if(action==="pending"){
            sql+=DataModel.accountStatus.phaseOneDocSubmitted;
        }else if(action==="active"){
            sql+=DataModel.accountStatus.accepted+" AND "+providers.hrAcceptanceID+"="+hrId;
        }else if(action==="rejected"){
            sql+=DataModel.accountStatus.phaseOneRejected+" AND "+providers.hrAcceptanceID+"="+hrId;
        }else{
            return WebUtility.sendErrorMessage(res, req, DataModel.webResponses.serverError, "The routing you specified doesnot exists");
        }
        HRRoutes.database.getQueryResults(sql, []).then(result=>{
            let data={};
            let ids=[-1];
            for(var i in result){
                let out=result[i];
                let json={
                    providerID:out[providers.id],
                    firstName:out[providers.firstName],
                    lastName:out[providers.lastName],
                    email:out[providers.email],
                    phone:out[providers.phone],
                    image:out[providers.image],
                    experience:out[providers.experience],
                    qualifications:out[providers.qualifications],
                    resume:out[providers.resume],
                    status:out[providers.accountStatus],
                    docs:[]
                }
                data[out[providers.id]]=json
                ids.push(out[providers.id])
            }
            let sql="SELECT * FROM "+providersDocs.table+" WHERE "+providersDocs.providerID+" IN ("+ids.join(",")+")";
            console.log(sql);
            
            HRRoutes.database.getQueryResults(sql, []).then(result=>{
                for(var i in result){
                    let out=result[i];
                    data[out[providersDocs.providerID]].docs.push({
                        id:out[providersDocs.id],
                        docTitle:out[providersDocs.docTitle],
                        docContent:out[providersDocs.docContent]
                    })
                }

                return WebUtility.sendSuccess(res, req, data, "Successfully fetched the datas");
            }, error=>{
                return WebUtility.sendErrorMessage(res, req, DataModel.webResponses.hrError, "Something went wrong : "+error);
            }).catch(error=>{
                return WebUtility.sendErrorMessage(res, req, DataModel.webResponses.serverError, "Server Error : "+error);
            })
        }, error=>{
            return WebUtility.sendErrorMessage(res, req, DataModel.webResponses.hrError, "Something went wrong : "+error);
        }).catch(error=>{
            return WebUtility.sendErrorMessage(res, req, DataModel.webResponses.serverError, "Server Error : "+error);
        })
    }

    private hrAction(req:express.Request, res:express.Response){
        let hrId=this.preProcessToken(req, res);
        if(!hrId)
            return;
        
        let action=req.params.action;
        let providerId=req.body.providerId;

        let providers = DataModel.tables.providers;
        let status:number;
        if(action==="accept"){
            status=DataModel.accountStatus.accepted;
        }else if(action==="reject"){
            status=DataModel.accountStatus.phaseOneRejected;
        }else{
            return WebUtility.sendErrorMessage(res, req, DataModel.webResponses.serverError, "The routing you specified doesnot exists");
        }
        
        HRRoutes.database.update(providers.table,{
            [providers.accountStatus]:status,
            [providers.hrAcceptanceID]:hrId
        }, {
            [providers.id]:providerId
        }).then(result=>{
            return WebUtility.sendSuccess(res, req, [], "Successfully accepted/rejected the applications");
        }, error=>{
            return WebUtility.sendErrorMessage(res, req, DataModel.webResponses.hrError, "Something went wrong : "+error);
        }).catch(error=>{
            return WebUtility.sendErrorMessage(res, req, DataModel.webResponses.serverError, "Server Error : "+error);
        })
    }


}