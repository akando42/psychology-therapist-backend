import * as express from 'express';
import {MySqlDatabase} from '../class/class.mysql-database';
import {CryptoFunctions} from '../class/class.crypto-functions'
import {ExpressServer,HTTPMethod} from '../class/class.server';
import { UsersUtility } from "./users-utility-routes";
import { DataModel } from "../datamodels/datamodel";
import { SQLUtility } from "./sql-utility";

var nodemailer = require('nodemailer');
var appConfig=require('../config/app.json');

export class UserRoutes{
    private database:MySqlDatabase;
    private server:ExpressServer;
    private transporter;

    private randomPatternToVerify="!47218fah8y5&^%^$76T21358GUfutT6%$&68327Q5";
    

    constructor(server:ExpressServer, db:MySqlDatabase){
        this.server=server;
        this.database=db;  
        var me=this;

        this.transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        // service: 'gmail',
        auth: {
            user: 'rahul.test1908@gmail.com',
            pass: 'rahulkatest'
        }
        });

        server.setRoute("/user/login", (req:express.Request, res:express.Response)=>{
            me.loginUser(req, res);
        }, HTTPMethod.POST);
        server.setRoute("/user/register", (req:express.Request, res:express.Response)=>{
            me.registerUser(req, res);
        }, HTTPMethod.POST);
        server.setRoute("/user/verify", (req:express.Request, res:express.Response)=>{
            console.log("Hello")
            me.verifyEmail(req, res);
        }, HTTPMethod.GET);
    }

    private loginUser(req:express.Request, res:express.Response){
        if(!UsersUtility.getParsedToken(req)){
            return UsersUtility.sendErrorMessage(res, DataModel.responseStatus.tokenError, "The token is invalid")
        }

        let email = req.body.email;
        let password = req.body.password;

        if(!UsersUtility.validateStringFields(email, 1, 155)
            || !UsersUtility.validateStringFields(password, 8, 50)
            || !(password.match(/[A-Z]/) && password.match(/[a-z]/) && password.match(/[0-9]/) && password.match(/[^A-Za-z0-9]/))
            || !email.match(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)){
                UsersUtility.sendErrorMessage(res, DataModel.responseStatus.inputError, "Invalid Input");
            }
        
        // UsersUtility.sendSuccess(res, email, "Something");
        let users = DataModel.tables.users;
        var sql = SQLUtility.formSelect(["*"],
                users.table,
                [users.email],
                ["="],
                []);
        this.database.getQueryResults(sql, [email]).then(result=>{
            if(result.length==0){
                return UsersUtility.sendErrorMessage(res, DataModel.responseStatus.loginError, "Email ID is not registered");
            }
            var out = result[0];
            if(out[users.password] == password){
                if(out[users.status]==DataModel.accountStatus.waiting){
                    return UsersUtility.sendErrorMessage(res, DataModel.responseStatus.loginError, "The Email is not verified");
                }
                let json={
                    id:out[users.id],
                    fName:out[users.firstName],
                    lName:out[users.lastName],
                    image:out[users.image],
                    email:out[users.email]
                }
                return UsersUtility.sendSuccess(res, json, "Successfully logged in");
            }else{
                return UsersUtility.sendErrorMessage(res, DataModel.responseStatus.loginError, "The username and password dint match");
            }
        }, error=>{
            UsersUtility.sendErrorMessage(res, DataModel.responseStatus.loginError, error);
        }).catch(error=>{
            UsersUtility.sendErrorMessage(res, DataModel.responseStatus.loginError, error);
        })
        
    }

    private registerUser(req:express.Request, res:express.Response){
        if(!UsersUtility.getParsedToken(req)){
            return UsersUtility.sendErrorMessage(res, DataModel.responseStatus.tokenError, "The token is invalid")
        }

        let fname = req.body.firstName;
        let lname = req.body.lastName;
        let email = req.body.email;
        let password = req.body.password;
        let phone = req.body.phone;

        if(!UsersUtility.validateStringFields(email, 1, 155)
            || !UsersUtility.validateStringFields(password, 8, 50)
            || !UsersUtility.validateStringFields(fname, 1, 50)
            || !UsersUtility.validateStringFields(lname, 1, 50)
            || !UsersUtility.validateStringFields(phone, 1, 10)
            || !(password.match(/[A-Z]/) && password.match(/[a-z]/) && password.match(/[0-9]/) && password.match(/[^A-Za-z0-9]/))
            || !email.match(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
            || !phone.match(/^[0-9]+$/)){
                UsersUtility.sendErrorMessage(res, DataModel.responseStatus.inputError, "Invalid Input");
            }
        
        let users = DataModel.tables.users;
        
        let debug=false;
        if(req.body.debug){
            debug=true;
        }

        //TODO Change accepted to waiting
        this.database.insert(users.table,{
            [users.firstName]:fname,
            [users.lastName]:lname,
            [users.email]:email,
            [users.password]:password,
            [users.phone]:phone,
            [users.status]:debug?DataModel.accountStatus.accepted:DataModel.accountStatus.waiting,
        }).then(result=>{
            this.sendEmailConfirmation(email, fname, lname, res);
        }, error=>{
            if(debug)
                return this.sendEmailConfirmation(email, fname, lname, res);
            return UsersUtility.sendErrorMessage(res, DataModel.responseStatus.registerError, error);
        }).catch(error=>{
            return UsersUtility.sendErrorMessage(res, DataModel.responseStatus.registerError, "Server Error");
        })
        
    }
    private sendEmailConfirmation(email:string, fname:String, lname:String, res:express.Response){
        let link=appConfig.baseURL+"user/verify?key=";

        let encKey = CryptoFunctions.get256BitKey(["To", "Verify", "Email", this.randomPatternToVerify])
        //console.log("Token : "+token);
        let json={
            email:email,
            fname:fname,
            lname:lname
        };
        console.log("JSON : "+JSON.stringify(json));
        let key = encodeURIComponent(CryptoFunctions.aes256Encrypt(JSON.stringify(json), encKey));
        console.log("Key : "+key);

        let myStr="<H2>Verify Your Email Address</H2><H5>Massage on Demand</H5></br><H4>Hello "+fname+" "+lname+",</H4><p>Thanks for registering with us</p><p>Please Click <a href='"+link+key+"'>here</a> to verify you email Address</p>";
        var mailOptions = {
            from: 'rahul.test1908@gmail.com',
            to: email,
            subject: 'Verification Mail | Massage On Demand',
            html: myStr
        };
        this.transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
                return UsersUtility.sendErrorMessage(res, DataModel.responseStatus.registerError, "Server Error");
            } else {
                console.log('Email sent: ' + info.response);
                return UsersUtility.sendSuccess(res,[], "Successfully registered!! We have sent you a cofirmation mail!");
            }
        });

    }
    private verifyEmail(req:express.Request, res:express.Response){
        console.log("Reached here");
        let encKey = CryptoFunctions.get256BitKey(["To", "Verify", "Email", this.randomPatternToVerify])
        console.log("Encryption Key : "+encKey);
        let keyVal=req.query.key;

        if(!keyVal){
            return UsersUtility.sendErrorMessage(res, DataModel.responseStatus.registerError, "Sorry Couldn't verify your email");
        }
        let actVal = CryptoFunctions.aes256Decrypt(keyVal, encKey);
        console.log("actual Value : "+actVal);
        let json:{email:string, fname:string, lname:string} = JSON.parse(actVal)
        if(!json || !json.email || !json.fname || !json.lname)
            return UsersUtility.sendErrorMessage(res, DataModel.responseStatus.registerError, "Sorry Couldn't verify your email");
        

        var users=DataModel.tables.users;
        this.database.update(users.table, {
            [users.status]:DataModel.accountStatus.accepted
        }, {
            [users.email]:json.email,
            [users.firstName]:json.fname,
            [users.lastName]:json.lname
        }).then(result=>{
            if(result){
                return UsersUtility.sendSuccess(res, [], "Congratulations!! You email ID is verified. Please go to the login screen");
            }else{
                return UsersUtility.sendErrorMessage(res, DataModel.responseStatus.registerError, "The email Id in the token doesnt exists");
            }
        }, error=>{
            return UsersUtility.sendErrorMessage(res, DataModel.responseStatus.registerError, "Something went Wrong!! "+error);
        }).catch(error=>{
            return UsersUtility.sendErrorMessage(res, DataModel.responseStatus.registerError, "Server Error");
        })
    }
}