import * as express from 'express';
import {MySqlDatabase} from '../class/class.mysql-database';
import {CryptoFunctions} from '../class/class.crypto-functions'
import {ExpressServer,HTTPMethod} from '../class/class.server';
import {UtilityRoutes} from "./utility-routes";
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
    }

    private signUp(req:express.Request, res:express.Response):boolean{
        var parsedVal  = UtilityRoutes.getParsedToken(req)
        if(!parsedVal){
            UtilityRoutes.sendErrorMessage(res, req, 403, "The account_token is not valid.");
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


        if(!(UtilityRoutes.validateStringFields(firstname, 2, 20, res, req)
            &&UtilityRoutes.validateStringFields(lastname, 2, 40, res, req)
            &&UtilityRoutes.validateStringFields(qualifications, 2, -1, res, req)
            &&UtilityRoutes.validateStringFields(experience, 10, -1, res, req)
            &&UtilityRoutes.validateStringFields(resume, 10, -1, res, req)
            &&UtilityRoutes.validateStringFields(email, 6, 255, res, req)
            &&UtilityRoutes.validateStringFields(phone, 6, 20, res, req)
            &&UtilityRoutes.validateStringFields(password, 8, 20, res, req))){
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
                [providers.emailID]:email,
                [providers.emailID]:phone,
                [providers.emailID]:password,
                [providers.experience]:experience,
                [providers.qualifications]:qualifications
            }).then(result=>{
                var response={
                    status:200,
                    description:"The provider has been registered successfuly and verification email has been sent."
                };
                RoutesHandler.respond(res, req, response, false, response["description"], response["status"]);
            }, error => {
                UtilityRoutes.sendErrorMessage(res, req, 409, "There is already a provider registered with the same email address.\n"+error);
                return;
            }).catch(error=>{
                UtilityRoutes.sendErrorMessage(res, req, 500, "Server Error");
                return;
            })
        }
        return true;
    }


    private login(req:express.Request, res:express.Response):boolean{
        //Check Token
        //Set cookie account_token
        console.log("Login Route");
        if(!req.cookies.account_token){
            UtilityRoutes.sendErrorMessage(res, req, 403, "The account_token is not valid");
            return false;
        }else{
            var parsedVal  = UtilityRoutes.getParsedToken(req)
            console.log("parsed Val : "+JSON.stringify(parsedVal));
            if(!parsedVal){
                UtilityRoutes.sendErrorMessage(res, req, 403, "The account_toekn is not valid");
                    return false;
            }
        }

        var email:string = String(req.body.email);
        var password:string = String(req.body.password);

        // console.log(email+" : "+password);
        if(!(UtilityRoutes.validateStringFields(email, 6, 255, res, req)
            && UtilityRoutes.validateStringFields(password, 8, 20, res, req))){
                return false;
            }
            
        //TODO Do the actual login here
        this.verifyUser(email, password, req, res);

        return true;
    }

    private verifyUser(email:string, pass:string, req:express.Request, res:express.Response){
        //console.log(email+" : "+pass);
        let providers = DataModel.tables.providers;
        let sql = SQLUtility.formSelect([providers.emailID, providers.password, providers.phone, providers.twoStepsVerification],
                    providers.table,
                    [providers.emailID],
                    ["="],
                    []);
        console.log("My SQL : "+sql);
        this.database.getQueryResults(sql, [email]).then(result=>{
            console.log(JSON.stringify(result));
            if(result.length==0){
                UtilityRoutes.sendErrorMessage(res, req, 400, "We cannot find any User registered with that email ID");
                return false;
            }else{
                var out = result[0];
                if(out['Password']!=pass){
                    UtilityRoutes.sendErrorMessage(res, req, 400, "The email ID and password doesnt match");
                    return false;
                }
                var response = {
                    status:200,
                    value:{
                        email : out['EmailID'],
                        name : out['Phone'],
                        verification : out['TwoStepVerification']=='Y'?true:false
                    }
                }
                var tokenKey:string = UtilityRoutes.getTokenKey(req);
                var date = Math.floor(new Date().getTime());
                var jsonStr={
                    ip:UtilityRoutes.getIPAddress(req),
                    date:date,
                    origin:req.get("origin")
                }
                var cookieStr = CryptoFunctions.aes256Encrypt(JSON.stringify(jsonStr), tokenKey);
                res.cookie("session_token", cookieStr, {maxAge:1800000});
                //res.end(JSON.stringify(response));
                RoutesHandler.respond(res, req, response, false, "Successfully verified the user", response["status"])
                return true;
            }
        }, error=>{
            UtilityRoutes.sendErrorMessage(res, req, 400, error);
            return false;
        }).catch(error=>{
            UtilityRoutes.sendErrorMessage(res, req, 400, error);
            return false;
        })
    }
}