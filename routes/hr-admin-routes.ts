import * as express from 'express';
import {MySqlDatabase} from '../class/class.mysql-database';
import {CryptoFunctions} from '../class/class.crypto-functions'
import {ExpressServer,HTTPMethod} from '../class/class.server';
import { RoutesHandler } from "../class/class.routeshandler";

import { WebUtility } from "./web-utility-routes";
import { DataModel } from "../datamodels/datamodel";
import { SQLUtility } from "./sql-utility";
import { EmailActivity } from "./email-activity";


export class HRAdminRoutes{
    private static database:MySqlDatabase;
    private server:ExpressServer;
    private encodingKey="akjh#&*^%^*$#(hgsjfa86t*^%*$Q21^$GFHG&^#@RG387gt";

    constructor(server:ExpressServer, db:MySqlDatabase){
        HRAdminRoutes.database=db;
        this.server=server;
        var me:HRAdminRoutes=this;
        
        server.setRoute("/admin/login", (req:express.Request, res:express.Response)=>{
            me.adminLogin(req, res);
        }, HTTPMethod.POST);

        server.setRoute("/admin/decode/email", (req:express.Request, res:express.Response)=>{
            me.decodeEmailVerification(req, res);
        }, HTTPMethod.POST);

        server.setRoute("/admin/add/:type", (req:express.Request, res:express.Response)=>{
            me.addAccount(req, res);
        }, HTTPMethod.POST);

        server.setRoute("/moderator/register", (req:express.Request, res:express.Response)=>{
            me.registerModerator(req, res);
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
            return WebUtility.sendErrorMessage(res, req, DataModel.webResponses.account_token_error, "The account_token is not valid");;
        }

        var email:string = String(req.body.email);
        var password:string = String(req.body.password);

        // console.log(email+" : "+password);
        if(!(WebUtility.validateStringFields(email, 6, 255)
            && WebUtility.validateStringFields(password, 8, 20))){
                return WebUtility.sendErrorMessage(res, req, DataModel.webResponses.inputError, "The input is invalid...");;
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
                    WebUtility.sendErrorMessage(res, req, DataModel.webResponses.loginError, "We cannot find any Admin with that name");
            }else{
                var out = result[0];
                if(out[myTable.password]!=pass){
                    WebUtility.sendErrorMessage(res, req, DataModel.webResponses.loginError, "The email ID and password doesnt match");
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
            WebUtility.sendErrorMessage(res, req, DataModel.webResponses.loginError, error);
            return false;
        }).catch(error=>{
            WebUtility.sendErrorMessage(res, req, DataModel.webResponses.serverError, "Server Error : "+error);
            return false;
        })
    }

    private preProcessToken(req:express.Request, res:express.Response){
        if(!WebUtility.getParsedToken(req)){
            WebUtility.sendErrorMessage(res, req, DataModel.webResponses.account_token_error, "The account_token is not valid");
            return undefined;
        }

        let session_token  = WebUtility.getParsedToken(req, req.body.session_token, 30);
        console.log("parsed Val 2: "+JSON.stringify(session_token));
        if(!session_token){
            WebUtility.sendErrorMessage(res, req, DataModel.webResponses.session_token_error, "The session_token is not valid");
            return undefined;
        }
        if(!(session_token["type"]==DataModel.userTypes.admin || session_token["type"]==DataModel.userTypes.moderator) || parseInt(session_token["adminId"])==NaN){
            WebUtility.sendErrorMessage(res, req, DataModel.webResponses.accessError, "You dint valid access rights");
            return undefined;
        }

        //let id=["adminId"];
        return session_token;
    }

    private decodeEmailVerification(req:express.Request, res:express.Response){
        var parsedVal  = WebUtility.getParsedToken(req)
        console.log("parsed Val : "+JSON.stringify(parsedVal));
        if(!parsedVal){
            return WebUtility.sendErrorMessage(res, req, DataModel.webResponses.account_token_error, "The account_token is not valid");;
        }

        let code = req.body.code;
        let email = req.body.email;
        if(!code || !email){
            return WebUtility.sendErrorMessage(res, req, DataModel.webResponses.inputError, "Invalid Input");
        }
        
        let myString=CryptoFunctions.aes256Decrypt(code, CryptoFunctions.get256BitKey([email, this.encodingKey]));
        let json:{
            email:string,
            firstName:string,
            lastName:string,
            type:string,
            id:Number
        }=JSON.parse(myString);

        if(!json){
            return WebUtility.sendErrorMessage(res, req, DataModel.webResponses.inputError, "The Code you sent is Invalid");
        }

        let tokenKey:string = WebUtility.getTokenKey(req);
        let date = Math.floor(new Date().getTime());
        
        let jsonToken={
            ip:WebUtility.getIPAddress(req),
            date:date,
            origin:req.get("origin"),
            adminId : json.id,
            type:json.type+"_temp",
            actualType:json.type
        }
        let register_token = CryptoFunctions.aes256Encrypt(JSON.stringify(jsonToken), tokenKey);

        let outputStr={
            email:json.email,
            firstName:json.firstName,
            lastName:json.lastName,
            type:json.type,
            register_token:register_token
        }
        WebUtility.sendSuccess(res, req, outputStr, "Successfully Parsed the email Inputs");
    }

    private addAccount(req:express.Request, res:express.Response){
        const { adminId, type}=this.preProcessToken(req, res);
        if(!adminId)
            return;

        let actionType = req.params.type;

        //let table=DataModel.tables.admin;
        let table:any;
        
        if(actionType==DataModel.userTypes.moderator){
            if(type!=DataModel.userTypes.admin)
                return WebUtility.sendErrorMessage(res, req, DataModel.webResponses.accessError, "You dont have a valid access level");
            table=DataModel.tables.admin;
        }else if(actionType==DataModel.userTypes.hr){
            table=DataModel.tables.hr;
        }else{
            return WebUtility.sendErrorMessage(res, req, DataModel.webResponses.inputError, "The URL parameter is invalid");
        }

        let firstName=req.body.firstName;
        let lastName=req.body.lastName;
        let email=req.body.email;
        let callback=req.body.callback_url;
        
        HRAdminRoutes.database.insert(table.table, {
            [table.firstName]:firstName,
            [table.lastName]:lastName,
            [table.email]:email,
        }).then(result=>{
            //TODO Send the invitation Email to the user
            this.sendInvitationWithCode(req, res, email, firstName, lastName, actionType, result, callback);
        }, error=>{
            return WebUtility.sendErrorMessage(res, req, DataModel.webResponses.hrError, "Something went wrong : "+error);
        }).catch(error=>{
            return WebUtility.sendErrorMessage(res, req, DataModel.webResponses.hrError, "Server Error: "+error);
        })
    }

    private registerModerator(req:express.Request, res:express.Response){
        if(!WebUtility.getParsedToken(req)){
            WebUtility.sendErrorMessage(res, req, DataModel.webResponses.account_token_error, "The account_token is not valid");
            return undefined;
        }

        let session_token  = WebUtility.getParsedToken(req, req.body.register_token, 30);
        console.log("parsed Val 2: "+JSON.stringify(session_token));
        if(!session_token){
            WebUtility.sendErrorMessage(res, req, DataModel.webResponses.session_token_error, "The session_token is not valid");
            return undefined;
        }
        if(!(session_token["type"]==DataModel.userTypes.moderator+"_temp" || session_token["actualType"]==DataModel.userTypes.moderator) || parseInt(session_token["adminId"])==NaN){
            WebUtility.sendErrorMessage(res, req, DataModel.webResponses.accessError, "You dint valid access rights");
            return undefined;
        }

        //let id=["adminId"];
        const { adminId, type, actualType}=session_token;
        if(actualType!=DataModel.userTypes.moderator){
            return WebUtility.sendErrorMessage(res, req, DataModel.webResponses.accessError, "Access Error!!");
        }

        let firstName=req.body.firstName;
        let lastName=req.body.lastName;
        let password=req.body.password;

        let table = DataModel.tables.admin;
        HRAdminRoutes.database.update(table.table, {
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
    private sendInvitationWithCode(req:express.Request, res:express.Response, email:string, firstName:string, lastName:string, type:string, id:number, callback:string){
        let json={
            email:email,
            firstName:firstName,
            lastName:lastName,
            type:type,
            id:id
        }

        let myActualString=JSON.stringify(json);

        let myEncodedString=CryptoFunctions.aes256Encrypt(myActualString, CryptoFunctions.get256BitKey([email, this.encodingKey]));
        let code = encodeURIComponent(myEncodedString);
        let url = callback+"?code="+code+"&email="+encodeURIComponent(email);

        let body="<H1>Welcome to Therapy On Demand</H1>\
                <h3>Invitation to join Therapy On Demand ("+type+")</h3>\
                <a href='"+url+"'>[Click this Link]</a>"
        
        EmailActivity.instance.sendEmail(email, "Welcome to Therapy on Demand!", body, function(err, info){
            if(err){
                return WebUtility.sendErrorMessage(res, req, DataModel.webResponses.emailError, "The Verification Email cant be send");
            }else{
                return WebUtility.sendSuccess(res, req, [], "Successfully sent the invitation to the user");
            }
        })
    }

    private blockAccount(req:express.Request, res:express.Response){
        const { adminId, type}=this.preProcessToken(req, res);
        if(!adminId)
            return;

        let actionType = req.params.type;
    }

    private unblockAccount(req:express.Request, res:express.Response){
        const { adminId, type}=this.preProcessToken(req, res);
        if(!adminId)
            return;

        let actionType = req.params.type;
        
    }

}