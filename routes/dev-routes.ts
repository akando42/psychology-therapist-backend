import * as express from 'express';
import {MySqlDatabase} from '../class/class.mysql-database';
import {CryptoFunctions} from '../class/class.crypto-functions'
import {ExpressServer,HTTPMethod} from '../class/class.server';
import { WebUtility } from "./web-utility-routes";
import {UsersUtility} from "./users-utility-routes";
import { RoutesHandler } from "../class/class.routeshandler";
import { DataModel } from "../datamodels/datamodel";
import { SQLUtility } from "./sql-utility";
import { ImageUtility } from "./image-utility";

var nodemailer = require('nodemailer');

export class DevelopmentRoutings{
    private database:MySqlDatabase;
    private server:ExpressServer;
    private transporter;

    constructor(server:ExpressServer, db:MySqlDatabase){
        this.database=db;
        this.server=server;

        this.transporter = nodemailer.createTransport({
        host: 'mail.dreamhost.com',
        //port: 993,
        secure: true,
        // service: 'gmail',
        auth: {
            user: 'help@newearthva.com',
            pass: 'ZdmyQrXc'
        }
        });

        var me:DevelopmentRoutings=this;
        server.setRoute("/dev/test1", (req:express.Request, res:express.Response)=>{
            me.test1(req, res);
        }, HTTPMethod.GET);

        server.setRoute("/dev/newearth", (req:express.Request, res:express.Response)=>{
            me.newEarthVer(req, res);
        }, HTTPMethod.POST);
    }

    private test1(req:express.Request, res:express.Response){
        let myStr="<H2>Verify Your Email Address</H2><H5>Massage on Demand</H5></br><H4>Hello Rahul Sinha,</H4><p>Thanks for registering with us</p><p>Please Click <a href=''>here</a> to verify you email Address</p>";
        var mailOptions = {
            from: 'help@newearthva.com',
            to: 'rahul.sinha1908@gmail.com',
            subject: 'Verification Mail | Massage On Demand',
            html: myStr
        };
        this.transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
                return UsersUtility.sendErrorMessage(res, DataModel.userResponse.emailError, "Server Error : "+error);
            } else {
                console.log('Email sent: ' + info.response);
                return UsersUtility.sendSuccess(res,[], "Successfully registered!! We have sent you a cofirmation mail!");
            }
        });
    }
    private newEarthVer(req:express.Request, res:express.Response){
        console.log(JSON.stringify(req.body));
        let name = req.body["Name"];
        let email = req.body["Email"];
        let phone = req.body["Phone"];
        let address = req.body["Address"];
        let message = req.body["Message"];
        let myStr="<H2>Email : "+email+"</H2><H5>Phone : "+phone+"</H5><H5>Address : "+address+"</H5><br><p>Messsage : "+message+"</p>";
        var mailOptions = {
            from: 'help@newearthva.com',
            to: 'newearthllc@gmail.com',
            subject: 'NewEarth Redirect Mails | '+name,
            html: myStr
        };
        this.transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
                //return UsersUtility.sendErrorMessage(res, DataModel.userResponse.emailError, "Server Error : "+error);
                res.redirect("http://www.newearthva.com/contactus.html");
            } else {
                console.log('Email sent: ' + info.response);
                //return UsersUtility.sendSuccess(res,[], "Successfully registered!! We have sent you a cofirmation mail!");
                res.redirect("http://www.newearthva.com");
            }
        });
    }
}