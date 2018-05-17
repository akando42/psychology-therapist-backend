import * as express from 'express';
import {MySqlDatabase} from '../class/class.mysql-database';
import {CryptoFunctions} from '../class/class.crypto-functions'
import {ExpressServer,HTTPMethod} from '../class/class.server';
import {ProvidersUtility} from "./providers-utility-routes";
import { RoutesHandler } from "../class/class.routeshandler";
import { DataModel } from "../datamodels/datamodel";
import { SQLUtility } from "./sql-utility";

export class ProviderRoutes{

    private database:MySqlDatabase;
    private server:ExpressServer;

    constructor(server:ExpressServer, db:MySqlDatabase){
        this.database=db;
        this.server=server;
        var me:ProviderRoutes=this;
        server.setRoute("/provider/signup", (req:express.Request, res:express.Response)=>{
            me.signUp(req, res);
        }, HTTPMethod.POST);
        server.setRoute("/provider/login", (req:express.Request, res:express.Response)=>{
            me.login(req, res);
        }, HTTPMethod.POST);

        server.setRoute("/hr/get/:action", (req:express.Request, res:express.Response)=>{
            me.hrGetAction(req, res);
        }, HTTPMethod.POST);
        server.setRoute("/hr/action/:action", (req:express.Request, res:express.Response)=>{
            me.hrAction(req, res);
        }, HTTPMethod.POST);
    }

    private signUp(req:express.Request, res:express.Response):boolean{
        var parsedVal  = ProvidersUtility.getParsedToken(req)
        if(!parsedVal){
            ProvidersUtility.sendErrorMessage(res, req, DataModel.providerResponse.account_token_error, "The account_token is not valid.");
            return false;
        }
        console.log("Signup with proper account_token");
        var firstname:string = req.body.firstname;
        var lastname:string = req.body.lastname;
        //TODO Need to discuss on qualifications
        var qualifications:string = JSON.stringify(req.body.qualifications);
        var experience:string = req.body.experience;
        var resume:string = req.body.resume;
        var email:string = req.body.email;
        var phone:string = req.body.phone;
        var password:string = req.body.password;


        if(!(ProvidersUtility.validateStringFields(firstname, 2, 20, res, req)
            &&ProvidersUtility.validateStringFields(lastname, 2, 40, res, req)
            &&ProvidersUtility.validateStringFields(qualifications, 2, -1, res, req)
            &&ProvidersUtility.validateStringFields(experience, 10, -1, res, req)
            &&ProvidersUtility.validateStringFields(resume, 10, -1, res, req)
            &&ProvidersUtility.validateStringFields(email, 6, 255, res, req)
            &&ProvidersUtility.validateStringFields(phone, 6, 20, res, req)
            &&ProvidersUtility.validateStringFields(password, 8, 20, res, req))){
                return;
            }
        
        // /[0-9]+/.
        console.log("2");
        if(!phone.match(/^[0-9]+$/)
            || !(password.match(/[A-Z]/) && password.match(/[a-z]/) && password.match(/[0-9]/) && password.match(/[^A-Za-z0-9]/))
            || !email.match(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)){
            var response={
                status:400,
                description:"Invalid input, the parameters were not valid."
            };
            RoutesHandler.respond(res, req, response, true, response["description"],  response["status"]);
        }else{
            var providers = DataModel.tables.providers;
            this.database.insert(providers.table, {
                [providers.firstName]:firstname,
                [providers.lastName]:lastname,
                [providers.experience]:experience,
                [providers.qualifications]:qualifications,
                [providers.resume]:resume,
                [providers.email]:email,
                [providers.phone]:phone,
                [providers.password]:password,
            }).then(result=>{
                var response={
                    status:200,
                    description:"The provider has been registered successfuly and verification email has been sent."
                };
                RoutesHandler.respond(res, req, response, false, response["description"], response["status"]);
            }, error => {
                ProvidersUtility.sendErrorMessage(res, req, DataModel.providerResponse.registerError, "There is already a provider registered with the same email address.\n"+error);
                return;
            }).catch(error=>{
                ProvidersUtility.sendErrorMessage(res, req, DataModel.providerResponse.serverError, "Server Error");
                return;
            })
        }
        return true;
    }


    private login(req:express.Request, res:express.Response){
        var parsedVal  = ProvidersUtility.getParsedToken(req)
        console.log("parsed Val : "+JSON.stringify(parsedVal));
        if(!parsedVal){
            return ProvidersUtility.sendErrorMessage(res, req, DataModel.providerResponse.account_token_error, "The account_token is not valid");;
        }

        var email:string = String(req.body.email);
        var password:string = String(req.body.password);

        // console.log(email+" : "+password);
        if(!(ProvidersUtility.validateStringFields(email, 6, 255, res, req)
            && ProvidersUtility.validateStringFields(password, 8, 20, res, req))){
                return false;
            }
            
        console.log("My Email : "+email);
        if(email=="admin@therapy.coach"){
            if(password=="Massage@12345"){
                var date = Math.floor(new Date().getTime());

                var tokenKey:string = ProvidersUtility.getTokenKey(req);
                var jsonStr={
                    ip:ProvidersUtility.getIPAddress(req),
                    date:date,
                    origin:req.get("origin"),
                    providersId : -1,
                    type:"Admin"
                }
                var cookieStr = CryptoFunctions.aes256Encrypt(JSON.stringify(jsonStr), tokenKey);
                return ProvidersUtility.sendSuccess(res, req, {
                    admin:true,
                    message:"Its Admin Login",
                    session_token:cookieStr
                }, "Admin Logged in");
            }else{
                return ProvidersUtility.sendErrorMessage(res, req, DataModel.providerResponse.loginError, "Password is wrong");
            }
        }
        //TODO Do the actual login here
        this.verifyUser(email, password, req, res);

        return true;
    }

    private verifyUser(email:string, pass:string, req:express.Request, res:express.Response){
        //console.log(email+" : "+pass);
        let providers = DataModel.tables.providers;
        let sql = SQLUtility.formSelect([providers.email, providers.password, providers.phone, providers.status],
                    providers.table,
                    [providers.email],
                    ["="],
                    []);
        console.log("My SQL : "+sql);
        this.database.getQueryResults(sql, [email]).then(result=>{
            console.log(JSON.stringify(result));
            if(result.length==0){
                ProvidersUtility.sendErrorMessage(res, req, DataModel.providerResponse.loginError, "We cannot find any User registered with that email ID");
                return false;
            }else{
                var out = result[0];
                if(out[providers.password]!=pass){
                    ProvidersUtility.sendErrorMessage(res, req, DataModel.providerResponse.loginError, "The email ID and password doesnt match");
                    return false;
                }
                var response = {
                    value:{
                        email : out[providers.email],
                        name : out[providers.firstName],
                        verification : out[providers.status]=='Y'?true:false
                    }
                }
                var tokenKey:string = ProvidersUtility.getTokenKey(req);
                var date = Math.floor(new Date().getTime());
                var jsonStr={
                    ip:ProvidersUtility.getIPAddress(req),
                    date:date,
                    origin:req.get("origin"),
                    providersId : out[providers.id],
                    type:"Provider"
                }
                var cookieStr = CryptoFunctions.aes256Encrypt(JSON.stringify(jsonStr), tokenKey);
                response["session_token"] = cookieStr;
                //res.end(JSON.stringify(response));
                RoutesHandler.respond(res, req, response, false, "Successfully verified the user", response["status"])
                return true;
            }
        }, error=>{
            ProvidersUtility.sendErrorMessage(res, req, DataModel.providerResponse.loginError, error);
            return false;
        }).catch(error=>{
            ProvidersUtility.sendErrorMessage(res, req, DataModel.providerResponse.serverError, "Server Error : "+error);
            return false;
        })
    }

    private hrGetAction(req:express.Request, res:express.Response){
        if(!ProvidersUtility.getParsedToken(req)){
            return ProvidersUtility.sendErrorMessage(res, req, DataModel.providerResponse.account_token_error, "The account_token is not valid");
        }

        let session_token  = ProvidersUtility.getParsedToken(req, req.body.session_token, 30);
        console.log("parsed Val : "+JSON.stringify(session_token));
        if(!session_token){
            return ProvidersUtility.sendErrorMessage(res, req, DataModel.providerResponse.session_token_error, "The session_token is not valid");
        }
        if(session_token["type"]!="Admin"){
            return ProvidersUtility.sendErrorMessage(res, req, DataModel.providerResponse.session_token_error, "The session_token is not valid");
        }

        let action = req.params.action;
        let providers = DataModel.tables.providers;
        let providersDocs = DataModel.tables.providersDoc;
        let sql = "SELECT * FROM "+providers.table+" WHERE "+providers.status+" = "
        if(action==="pending"){
            sql+=DataModel.accountStatus.phaseOneDocSubmitted;
        }else if(action==="active"){
            sql+=DataModel.accountStatus.accepted;
        }else if(action==="rejected"){
            sql+=DataModel.accountStatus.phaseOneRejected;
        }else{
            return ProvidersUtility.sendErrorMessage(res, req, DataModel.providerResponse.serverError, "The routing you specified doesnot exists");
        }
        this.database.getQueryResults(sql, []).then(result=>{
            let data={};
            let ids=[];
            for(var i in result){
                let out=result[i];
                let json={
                    firstName:out[providers.firstName],
                    lastName:out[providers.lastName],
                    email:out[providers.email],
                    phone:out[providers.phone],
                    image:out[providers.image],
                    experience:out[providers.experience],
                    qualifications:out[providers.qualifications],
                    resume:out[providers.resume],
                    status:out[providers.status],
                    docs:[]
                }
                data[out[providers.id]]=json
                ids.push(out[providers.id])
            }
            let sql="SELECT * FROM "+providersDocs.table+" WHERE "+providersDocs.providerID+" IN ("+ids.join(",")+")";
            this.database.getQueryResults(sql, []).then(result=>{
                for(var i in result){
                    let out=result[i];
                    data[out[providersDocs.providerID]].docs.push({
                        id:out[providersDocs.id],
                        docTitle:out[providersDocs.docTitle],
                        docContent:out[providersDocs.docContent]
                    })
                }

                return ProvidersUtility.sendSuccess(res, req, data, "Successfully fetched the datas");
            }, error=>{
                return ProvidersUtility.sendErrorMessage(res, req, DataModel.providerResponse.hrError, "Something went wrong : "+error);
            }).catch(error=>{
                return ProvidersUtility.sendErrorMessage(res, req, DataModel.providerResponse.serverError, "Server Error : "+error);
            })
        }, error=>{
            return ProvidersUtility.sendErrorMessage(res, req, DataModel.providerResponse.hrError, "Something went wrong : "+error);
        }).catch(error=>{
            return ProvidersUtility.sendErrorMessage(res, req, DataModel.providerResponse.serverError, "Server Error : "+error);
        })
    }

    private hrAction(req:express.Request, res:express.Response){
        if(!ProvidersUtility.getParsedToken(req)){
            return ProvidersUtility.sendErrorMessage(res, req, DataModel.providerResponse.account_token_error, "The account_token is not valid");
        }

        let session_token  = ProvidersUtility.getParsedToken(req, req.body.session_token, 30);
        console.log("parsed Val : "+JSON.stringify(session_token));
        if(!session_token){
            return ProvidersUtility.sendErrorMessage(res, req, DataModel.providerResponse.session_token_error, "The session_token is not valid");
        }
        if(session_token["type"]!="Admin"){
            return ProvidersUtility.sendErrorMessage(res, req, DataModel.providerResponse.session_token_error, "The session_token is not valid");
        }
        let action=req.params.action;
        let providerId=req.body.providerId;

        let providers = DataModel.tables.providers;
        let status:number;
        if(action==="accept"){
            status=DataModel.accountStatus.accepted;
        }else if(action==="reject"){
            status=DataModel.accountStatus.phaseOneRejected;
        }else{
            return ProvidersUtility.sendErrorMessage(res, req, DataModel.providerResponse.serverError, "The routing you specified doesnot exists");
        }
        
        this.database.update(providers.table,{
            [providers.status]:status
        }, {
            [providers.id]:providerId
        }).then(result=>{
            return ProvidersUtility.sendSuccess(res, req, [], "Successfully accepted/rejected the applications");
        }, error=>{
            return ProvidersUtility.sendErrorMessage(res, req, DataModel.providerResponse.hrActionError, "We couldnt find any provider with that ID");
        }).catch(error=>{
            return ProvidersUtility.sendErrorMessage(res, req, DataModel.providerResponse.serverError, "Server Error : "+error);
        })
    }
}