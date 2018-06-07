import * as express from 'express';
import {MySqlDatabase} from '../class/class.mysql-database';
import {CryptoFunctions} from '../class/class.crypto-functions'
import {ExpressServer,HTTPMethod} from '../class/class.server';
import { RoutesHandler } from "../class/class.routeshandler";

import { WebUtility } from "./web-utility-routes";
import { DataModel } from "../datamodels/datamodel";
import { SQLUtility } from "./sql-utility";


export class HRAdminRoutes{
    private static database:MySqlDatabase;
    private server:ExpressServer;

    constructor(server:ExpressServer, db:MySqlDatabase){
        HRAdminRoutes.database=db;
        this.server=server;
        var me:HRAdminRoutes=this;
        
        server.setRoute("/admin/login", (req:express.Request, res:express.Response)=>{
            me.adminLogin(req, res);
        }, HTTPMethod.POST);

        server.setRoute("/admin/add/:type", (req:express.Request, res:express.Response)=>{
            me.addAccount(req, res);
        }, HTTPMethod.POST);

        server.setRoute("/admin/block/:type", (req:express.Request, res:express.Response)=>{
            me.blockAccount(req, res);
        }, HTTPMethod.POST);

        server.setRoute("/admin/unblock/:type", (req:express.Request, res:express.Response)=>{
            me.unblockAccount(req, res);
        }, HTTPMethod.POST);
    }

    private adminLogin(req:express.Request, res:express.Response){

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
        
        this.verifyUser(email, password, req, res, true);
    }

    private verifyUser(email:string, pass:string, req:express.Request, res:express.Response, admin:boolean){
        //console.log(email+" : "+pass);
        let myTable;
        if(admin)
            myTable = DataModel.tables.admin;
        else
            myTable = DataModel.tables.hr;

        let sql = SQLUtility.formSelect(["*"],
                    myTable.table,
                    [myTable.email],
                    ["="],
                    []);
        console.log("My SQL : "+sql);
        HRAdminRoutes.database.getQueryResults(sql, [email]).then(result=>{
            console.log(JSON.stringify(result));
            if(result.length==0){
                if(admin)
                    return this.verifyUser(email, pass, req, res, false);
                else
                    WebUtility.sendErrorMessage(res, req, DataModel.providerResponse.loginError, "We cannot find any Admin with that name");
            }else{
                var out = result[0];
                if(out[myTable.password]!=pass){
                    WebUtility.sendErrorMessage(res, req, DataModel.providerResponse.loginError, "The email ID and password doesnt match");
                    return false;
                }
                var response = {
                    value:{
                        email : out[myTable.email],
                        name : out[myTable.firstName],
                        verification : out[myTable.accountStatus]=='Y'?true:false
                    }
                }

                let type="";
                if(admin){
                    if(out[DataModel.tables.admin.owner]==1){
                        type=DataModel.userTypes.admin;
                    }else{
                        type=DataModel.userTypes.moderator;
                    }
                    
                }else{
                    type=DataModel.userTypes.hr;
                }
                var tokenKey:string = WebUtility.getTokenKey(req);
                var date = Math.floor(new Date().getTime());
                var jsonStr={
                    ip:WebUtility.getIPAddress(req),
                    date:date,
                    origin:req.get("origin"),
                    adminId : out[myTable.id],
                    type:type
                }

                var cookieStr = CryptoFunctions.aes256Encrypt(JSON.stringify(jsonStr), tokenKey);
                response["session_token"] = cookieStr;
                //res.end(JSON.stringify(response));
                return WebUtility.sendSuccess(res, req, {
                    admin:true,
                    type:type,
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

    private preProcessToken(req:express.Request, res:express.Response){
        if(!WebUtility.getParsedToken(req)){
            WebUtility.sendErrorMessage(res, req, DataModel.providerResponse.account_token_error, "The account_token is not valid");
            return undefined;
        }

        let session_token  = WebUtility.getParsedToken(req, req.body.session_token, 30);
        console.log("parsed Val 2: "+JSON.stringify(session_token));
        if(!session_token){
            WebUtility.sendErrorMessage(res, req, DataModel.providerResponse.session_token_error, "The session_token is not valid");
            return undefined;
        }
        if(session_token["type"]!=DataModel.userTypes.admin || parseInt(session_token["adminId"])==NaN){
            WebUtility.sendErrorMessage(res, req, DataModel.providerResponse.session_token_error, "The session_token is not valid");
            return undefined;
        }

        let id=session_token["adminId"];
        return id
    }

    private autoGeneratePassword():string{
        //This is the random Function

        //var random =Math.floor(Math.random() * (max-min)) + +min;
        return undefined;
    }
    private addAccount(req:express.Request, res:express.Response){
        let adminId=this.preProcessToken(req, res);
        if(!adminId)
            return;

        let type = req.params.type;

        let table=DataModel.tables.admin;
        
        if(type=="admin"){
            
        }else if(type=="hr"){

        }else{
            return WebUtility.sendErrorMessage(res, req, DataModel.providerResponse.inputError, "The URL parameter is invalid");
        }

        let firstName=req.body.firstName;
        let lastName=req.body.lastName;
        let email=req.body.email;
        
        HRAdminRoutes.database.insert(table.table, {
            [table.firstName]:firstName,
            [table.lastName]:lastName,
            [table.email]:email,
        }).then(result=>{
            if(result){
                //TODO Send the invitation Email to the user
            }else{
                return WebUtility.sendErrorMessage(res, req, DataModel.providerResponse.hrError, "We cannot insert the details in the database");
            }
        }, error=>{
            return WebUtility.sendErrorMessage(res, req, DataModel.providerResponse.hrError, "Something went wrong : "+error);
        }).catch(error=>{
            return WebUtility.sendErrorMessage(res, req, DataModel.providerResponse.hrError, "Server Error: "+error);
        })
    }

    private blockAccount(req:express.Request, res:express.Response){
        let adminId=this.preProcessToken(req, res);
        if(!adminId)
            return;

        let type = req.params.type;
        
        if(type=="admin"){

        }else if(type=="hr"){
            
        }else{
            return WebUtility.sendErrorMessage(res, req, DataModel.providerResponse.inputError, "The URL parameter is invalid");
        }
    }

    private unblockAccount(req:express.Request, res:express.Response){
        let adminId=this.preProcessToken(req, res);
        if(!adminId)
            return;

        let type = req.params.type;
        
        if(type=="admin"){
            
        }else if(type=="hr"){
            
        }else{
            return WebUtility.sendErrorMessage(res, req, DataModel.providerResponse.inputError, "The URL parameter is invalid");
        }
    }

}