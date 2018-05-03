import * as express from 'express';
import {MySqlDatabase} from '../class/class.mysql-database';
import {CryptoFunctions} from '../class/class.crypto-functions'
import {ExpressServer,HTTPMethod} from '../class/class.server';
import { UsersUtility } from "./users-utility-routes";
import { DataModel } from "../datamodels/datamodel";
import { SQLUtility } from "./sql-utility";

export class UserRoutes{
    private database:MySqlDatabase;
    private server:ExpressServer;

    constructor(server:ExpressServer, db:MySqlDatabase){
        this.server=server;
        this.database=db;  

        var me=this;

        server.setRoute("/user/login", (req:express.Request, res:express.Response)=>{
            me.loginUser(req, res);
        }, HTTPMethod.POST);
    }

    private loginUser(req:express.Request, res:express.Response){
        if(!UsersUtility.getParsedToken(req)){
            return UsersUtility.sendErrorMessage(res, DataModel.responseStatus.tokenError, "The token is invalid")
        }

        let email = req.body.email;
        let password = req.body.password;

        if(!UsersUtility.validateStringFields(email, 1, 255)
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
}