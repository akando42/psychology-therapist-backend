import * as express from 'express';
import {MySqlDatabase} from '../class/class.mysql-database';
import {CryptoFunctions} from '../class/class.crypto-functions'
import {ExpressServer,HTTPMethod} from '../class/class.server';
import { WebUtility } from "./web-utility-routes";
import { RoutesHandler } from "../class/class.routeshandler";
import { DataModel } from "../datamodels/datamodel";
import { SQLUtility } from "./sql-utility";
import { ImageUtility } from "./image-utility";
import { UsersUtility } from "./users-utility-routes";


var querystring = require('querystring');
var http = require('http');
const appConfig=require('../config/app.json');
var stripe = require('stripe')("sk_test_X2lXtPpWP8eZ14umWgBAXZwz");

export class StripePayments{

    private database:MySqlDatabase;
    private server:ExpressServer;

    constructor(server:ExpressServer, db:MySqlDatabase){
        this.database=db;
        this.server=server;
        var me:StripePayments=this;
        server.setRoute("/payment/confirm", (req:express.Request, res:express.Response)=>{
            me.displayPayScreen(req, res);
        }, HTTPMethod.GET);

        server.setRoute("/payment/charge", (req:express.Request, res:express.Response)=>{
            me.processCharge(req, res);
        }, HTTPMethod.POST);
        
        server.setRoute("/payment/chargeapi", (req:express.Request, res:express.Response)=>{
            me.processChargeAPI(req, res);
        }, HTTPMethod.POST);
    }

    private displayPayScreen(req:express.Request, res:express.Response){
        // let json={
        //     providerName:"Rahul Sinha",
        //     massageType:"Deep Tissue",
        //     massageLength:"90 mins",
        //     massageDate:"2018/12/2 10:34:00",
        //     paymentId:12,
        //     code:"Hello from the other side",
        //     mac:"My Mac ID",
        //     id:12,
        //     amount:30000
        // };
        // res.render("payment", json);
        // let b=true;
        // if(b)
        //     return;

        if(!req.query.code || !req.query.mac)
            return UsersUtility.sendErrorMessage(res, DataModel.userResponse.tokenError, "Something went wrong")

        //Adding to the body
        req.body.code=req.query.code;
        req.body.mac=req.query.mac;
        req.body.id=req.query.id;
        

        if(!UsersUtility.getParsedToken(req)){
            return UsersUtility.sendErrorMessage(res, DataModel.userResponse.tokenError, "The token is invalid")
        }
        if(!req.query.paymentId)
            return UsersUtility.sendErrorMessage(res, DataModel.userResponse.inputError, "The Payment ID not configured");
        if(!req.body.id)
            return UsersUtility.sendErrorMessage(res, DataModel.userResponse.idError, "The ID doesn't exists in the query");
        let id = parseInt(req.body.id);
        if(id === NaN)
            return UsersUtility.sendErrorMessage(res, DataModel.userResponse.inputError, "Invalid ID");

        let paymentId = req.query.paymentId;

        let payments=DataModel.tables.payments;
        let sessions=DataModel.tables.sessions;
        let providers=DataModel.tables.providers;
        let sql = "SELECT * \
            FROM "+payments.table+" natural join "+sessions.table+" natural join "+providers.table+" \
            WHERE "+payments.id+"="+paymentId;
        this.database.getQueryResults(sql, []).then(result=>{
            if(result.length==1){
                let out=result[0];
                let json={
                    providerName:out[providers.firstName]+" "+out[providers.lastName],
                    massageType:out[sessions.massageType],
                    massageLength:out[sessions.massageLength],
                    massageDate:out[sessions.dateTime],
                    paymentId:paymentId,
                    code:req.body.code,
                    mac:req.body.mac,
                    id:id,
                    amount:out[payments.amount]*100
                };
                res.render("payment", json);
            }else{
                return UsersUtility.sendErrorMessage(res, DataModel.userResponse.paymentError, "Something went wrong! Cant finf Payment ID");
            }
        }, error=>{
            return UsersUtility.sendErrorMessage(res, DataModel.userResponse.paymentError, "Something went wrong! "+error);
        }).catch(error=>{
            return UsersUtility.sendErrorMessage(res, DataModel.userResponse.paymentError, "Something went wrong! "+error);
        })        
    }

    private processCharge(req:express.Request, res:express.Response){
        var token = req.body.stripeToken;
        var amount = req.body.amount;
        let me=this;
        var charge = stripe.charges.create({
            amount : amount,
            currency : "usd",
            source : token
        },function(err,charge){
            if(err)
                res.end("Payment Declined! "+err.type);
            else{
                
                req.body.transactionId=charge.id
                console.log("Success! "+JSON.stringify(req.body));
                me.postCode(req.body, "/user/payments/complete", function(result){
                    console.log(JSON.stringify(result));
                    let body = JSON.parse(result);
                    if(body.error==false){
                        res.render("successPayment", {succes:true});
                    }else{
                        res.render("successPayment", {succes:false});
                    }
                })
            }
        });
    }
    private processChargeAPI(req:express.Request, res:express.Response){
        var token = req.body.stripeToken;
        var amount = req.body.amount;
        let me=this;
        var charge = stripe.charges.create({
            amount : amount,
            currency : "usd",
            source : token
        },function(err,charge){
            if(err)
                res.end("Payment Declined! "+err.type);
            else{
                
                req.body.transactionId=charge.id
                console.log("Success! "+JSON.stringify(req.body));
                me.postCode(req.body, "/user/payments/complete", function(result){
                    console.log(JSON.stringify(result));
                    let body = JSON.parse(result);
                    if(body.error==false){
                        UsersUtility.sendSuccess(res, [],"Successfull");
                    }else{
                        UsersUtility.sendErrorMessage(res, DataModel.userResponse.paymentError, "Payment Error");
                    }
                })
            }
        });
    }

    private postCode(data, path, callback) {
        // Build the post string from an object
        var post_data = querystring.stringify(data);

        // An object of options to indicate where to post to
        var post_options = {
            url:appConfig.hostName,
            port:appConfig.port,
            path: path,
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Length': Buffer.byteLength(post_data)
            }
        };

        // Set up the request
        var post_req = http.request(post_options, function(res) {
            let body="";
            res.setEncoding('utf8');
            res.on('data', function (chunk) {
                console.log('Response: ' + chunk);
                body+=chunk;
            });
            res.on('end', function(err){
                callback(body);
            })
        });
        // post the data
        post_req.write(post_data);
        post_req.end();
    }
}