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

        server.setRoute("/admin/login", (req:express.Request, res:express.Response)=>{
            me.hrLogin(req, res);
        }, HTTPMethod.POST);

        server.setRoute("/hr/get/:action", (req:express.Request, res:express.Response)=>{
            me.hrGetAction(req, res);
        }, HTTPMethod.POST);
        server.setRoute("/hr/action/:action", (req:express.Request, res:express.Response)=>{
            me.hrAction(req, res);
        }, HTTPMethod.POST);
    }

    private hrLogin(req:express.Request, res:express.Response){
        var parsedVal  = WebUtility.getParsedToken(req)
        console.log("parsed Val : "+JSON.stringify(parsedVal));
        if(!parsedVal){
            return WebUtility.sendErrorMessage(res, req, DataModel.providerResponse.account_token_error, "The account_token is not valid");;
        }

        var email:string = String(req.body.email);
        var password:string = String(req.body.password);

        // console.log(email+" : "+password);
        if(!(WebUtility.validateStringFields(email, 6, 255)
            && WebUtility.validateStringFields(password, 8, 20))){
                return WebUtility.sendErrorMessage(res, req, DataModel.providerResponse.inputError, "The input is invalid...");;
            }
        
        this.verifyAdmin(email, password, req, res);
    }

    private verifyAdmin(email:string, pass:string, req:express.Request, res:express.Response){
        //console.log(email+" : "+pass);
        let admin = DataModel.tables.admin;
        let sql = SQLUtility.formSelect(["*"],
                    admin.table,
                    [admin.email],
                    ["="],
                    []);
        console.log("My SQL : "+sql);
        HRRoutes.database.getQueryResults(sql, [email]).then(result=>{
            console.log(JSON.stringify(result));
            if(result.length==0){
                return this.verifyHR(email, pass, req, res);
            }else{
                var out = result[0];
                if(out[admin.password]!=pass){
                    WebUtility.sendErrorMessage(res, req, DataModel.providerResponse.loginError, "The email ID and password doesnt match");
                    return false;
                }
                var response = {
                    value:{
                        email : out[admin.email],
                        name : out[admin.firstName],
                        verification : out[admin.accountStatus]=='Y'?true:false
                    }
                }
                var tokenKey:string = WebUtility.getTokenKey(req);
                var date = Math.floor(new Date().getTime());
                var jsonStr={
                    ip:WebUtility.getIPAddress(req),
                    date:date,
                    origin:req.get("origin"),
                    hrId : out[admin.id],
                    type:DataModel.userTypes.admin
                }

                var cookieStr = CryptoFunctions.aes256Encrypt(JSON.stringify(jsonStr), tokenKey);
                response["session_token"] = cookieStr;
                //res.end(JSON.stringify(response));
                return WebUtility.sendSuccess(res, req, {
                    admin:true,
                    type:DataModel.userTypes.admin,
                    message:"Logged in as an Admin",
                    session_token:cookieStr
                }, "Admin Logged in!");
            }
        }, error=>{
            WebUtility.sendErrorMessage(res, req, DataModel.providerResponse.loginError, error);
            return false;
        }).catch(error=>{
            WebUtility.sendErrorMessage(res, req, DataModel.providerResponse.serverError, "Server Error : "+error);
            return false;
        })
    }

    private verifyHR(email:string, pass:string, req:express.Request, res:express.Response){
        //console.log(email+" : "+pass);
        let hr = DataModel.tables.hr;
        let sql = SQLUtility.formSelect(["*"],
                    hr.table,
                    [hr.email],
                    ["="],
                    []);
        console.log("My SQL : "+sql);
        HRRoutes.database.getQueryResults(sql, [email]).then(result=>{
            console.log(JSON.stringify(result));
            if(result.length==0){
                WebUtility.sendErrorMessage(res, req, DataModel.providerResponse.loginError, "We cannot find any User registered with that email ID");
                return false;
            }else{
                var out = result[0];
                if(out[hr.password]!=pass){
                    WebUtility.sendErrorMessage(res, req, DataModel.providerResponse.loginError, "The email ID and password doesnt match");
                    return false;
                }
                var response = {
                    value:{
                        email : out[hr.email],
                        name : out[hr.firstName],
                        verification : out[hr.accountStatus]=='Y'?true:false
                    }
                }
                var tokenKey:string = WebUtility.getTokenKey(req);
                var date = Math.floor(new Date().getTime());
                var jsonStr={
                    ip:WebUtility.getIPAddress(req),
                    date:date,
                    origin:req.get("origin"),
                    hrId : out[hr.id],
                    type:DataModel.userTypes.hr
                }

                var cookieStr = CryptoFunctions.aes256Encrypt(JSON.stringify(jsonStr), tokenKey);
                response["session_token"] = cookieStr;
                //res.end(JSON.stringify(response));
                return WebUtility.sendSuccess(res, req, {
                    admin:true,
                    type:DataModel.userTypes.hr,
                    message:"Logged in as an HR",
                    session_token:cookieStr
                }, "HR logged in!");
            }
        }, error=>{
            WebUtility.sendErrorMessage(res, req, DataModel.providerResponse.loginError, error);
            return false;
        }).catch(error=>{
            WebUtility.sendErrorMessage(res, req, DataModel.providerResponse.serverError, "Server Error : "+error);
            return false;
        })
    }

    private hrGetAction(req:express.Request, res:express.Response){

        if(!WebUtility.getParsedToken(req)){
            return WebUtility.sendErrorMessage(res, req, DataModel.providerResponse.account_token_error, "The account_token is not valid");
        }

        let session_token  = WebUtility.getParsedToken(req, req.body.session_token, 30);
        console.log("parsed Val 2: "+JSON.stringify(session_token));
        if(!session_token){
            return WebUtility.sendErrorMessage(res, req, DataModel.providerResponse.session_token_error, "The session_token is not valid");
        }
        if(session_token["type"]!=DataModel.userTypes.hr || parseInt(session_token["hrId"])==NaN){
            return WebUtility.sendErrorMessage(res, req, DataModel.providerResponse.session_token_error, "The session_token is not valid");
        }

        let hrId=session_token["hrId"];

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
            return WebUtility.sendErrorMessage(res, req, DataModel.providerResponse.serverError, "The routing you specified doesnot exists");
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
                return WebUtility.sendErrorMessage(res, req, DataModel.providerResponse.hrError, "Something went wrong : "+error);
            }).catch(error=>{
                return WebUtility.sendErrorMessage(res, req, DataModel.providerResponse.serverError, "Server Error : "+error);
            })
        }, error=>{
            return WebUtility.sendErrorMessage(res, req, DataModel.providerResponse.hrError, "Something went wrong : "+error);
        }).catch(error=>{
            return WebUtility.sendErrorMessage(res, req, DataModel.providerResponse.serverError, "Server Error : "+error);
        })
    }

    private hrAction(req:express.Request, res:express.Response){
        if(!WebUtility.getParsedToken(req)){
            return WebUtility.sendErrorMessage(res, req, DataModel.providerResponse.account_token_error, "The account_token is not valid");
        }

        let session_token  = WebUtility.getParsedToken(req, req.body.session_token, 30);
        console.log("parsed Val : "+JSON.stringify(session_token));
        if(!session_token){
            return WebUtility.sendErrorMessage(res, req, DataModel.providerResponse.session_token_error, "The session_token is not valid");
        }
        if(session_token["type"]!=DataModel.userTypes.hr || parseInt(session_token["hrId"])==NaN){
            return WebUtility.sendErrorMessage(res, req, DataModel.providerResponse.session_token_error, "The session_token is not valid");
        }

        let hrId=session_token["hrId"];

        let action=req.params.action;
        let providerId=req.body.providerId;

        let providers = DataModel.tables.providers;
        let status:number;
        if(action==="accept"){
            status=DataModel.accountStatus.accepted;
        }else if(action==="reject"){
            status=DataModel.accountStatus.phaseOneRejected;
        }else{
            return WebUtility.sendErrorMessage(res, req, DataModel.providerResponse.serverError, "The routing you specified doesnot exists");
        }
        
        HRRoutes.database.update(providers.table,{
            [providers.accountStatus]:status,
            [providers.hrAcceptanceID]:hrId
        }, {
            [providers.id]:providerId
        }).then(result=>{
            return WebUtility.sendSuccess(res, req, [], "Successfully accepted/rejected the applications");
        }, error=>{
            return WebUtility.sendErrorMessage(res, req, DataModel.providerResponse.hrError, "Something went wrong : "+error);
        }).catch(error=>{
            return WebUtility.sendErrorMessage(res, req, DataModel.providerResponse.serverError, "Server Error : "+error);
        })
    }


}