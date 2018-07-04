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
import { EmailActivity } from "./email-activity";

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
        secure: false,
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


        server.setRoute("/dev/testmail", (req:express.Request, res:express.Response)=>{
            me.testEmail(req, res);
        }, HTTPMethod.GET);

        server.setRoute("/dev/emailcheck", (req:express.Request, res:express.Response)=>{
            WebUtility.getTypeOfEmail(req.query.email).then(result=>{
                res.end(result);
            }, error=>{
                res.end(error);
            })
        }, HTTPMethod.GET);
    }

    private test1(req:express.Request, res:express.Response){
        console.log(JSON.stringify(req.query));
        res.send(JSON.stringify(req.query))
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
            to: 'newearthllc@gmail.com, rsinha@therapyondemand.io',
            subject: 'NewEarth Redirect Mails | '+name,
            html: myStr
        };
        // this.transporter.sendMail(mailOptions, function(error, info){
        //     if (error) {
        //         console.log(error);
        //         //return UsersUtility.sendErrorMessage(res, DataModel.userResponse.emailError, "Server Error : "+error);
        //         res.redirect("http://www.newearthva.com/contactus.html");
        //     } else {
        //         console.log('Email sent: ' + info.response);
        //         //return UsersUtility.sendSuccess(res,[], "Successfully registered!! We have sent you a cofirmation mail!");
        //         res.redirect("http://www.newearthva.com");
        //     }
        // });

        EmailActivity.instance.sendEmail(mailOptions.to, mailOptions.subject, mailOptions.html, function(error, info){
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
    private testEmail(req:express.Request, res:express.Response){
        console.log(JSON.stringify(req.body));
        EmailActivity.instance.sendEmail("rahul.sinha1908@gmail.com, rsinha@therapyondemand.io", "Test Email", "The Email Provider is working", function(error, info){
            if (error) {
                console.log(error);
                return UsersUtility.sendErrorMessage(res, DataModel.userResponse.emailError, "Server Error : "+error);
            } else {
                console.log('Email sent: ' + info.response);
                return UsersUtility.sendSuccess(res,[], "Successfully registered!! We have sent you a cofirmation mail!");
            }
        });
    }
}