import * as express from 'express';
import {MySqlDatabase} from '../class/class.mysql-database';
import {CryptoFunctions} from '../class/class.crypto-functions'
import {ExpressServer,HTTPMethod} from '../class/class.server';
import { UsersUtility } from "./users-utility-routes";
import { DataModel } from "../datamodels/datamodel";
import { SQLUtility } from "./sql-utility";

var nodemailer = require('nodemailer');

export class UserRoutes{
    private database:MySqlDatabase;
    private server:ExpressServer;
    private transporter;

    constructor(server:ExpressServer, db:MySqlDatabase){
        this.server=server;
        this.database=db;  

        var me=this;

        this.transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'youremail@gmail.com',
            pass: 'yourpassword'
        }
        });

        server.setRoute("/user/login", (req:express.Request, res:express.Response)=>{
            me.loginUser(req, res);
        }, HTTPMethod.POST);
        server.setRoute("/user/register", (req:express.Request, res:express.Response)=>{
            me.loginUser(req, res);
        }, HTTPMethod.POST);
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
        this.database.insert(users.table,{
            [users.firstName]:fname,
            [users.lastName]:lname,
            [users.email]:email,
            [users.password]:password,
            [users.phone]:phone,
            [users.status]:DataModel.accountStatus.waiting,
        }).then(result=>{

        }, error=>{
            return UsersUtility.sendErrorMessage(res, DataModel.responseStatus.registerError, "Something went wrong!!");
        }).catch(error=>{
            return UsersUtility.sendErrorMessage(res, DataModel.responseStatus.registerError, "Server Error");
        })
        
    }
}