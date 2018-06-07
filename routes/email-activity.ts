import * as express from 'express';
import {MySqlDatabase} from '../class/class.mysql-database';
import {CryptoFunctions} from '../class/class.crypto-functions'
import {ExpressServer,HTTPMethod} from '../class/class.server';
import { UsersUtility } from "./users-utility-routes";
import { DataModel } from "../datamodels/datamodel";
import { SQLUtility } from "./sql-utility";
import { ImageUtility } from "./image-utility";

var nodemailer = require('nodemailer');
var appConfig=require('../config/app.json');

export class EmailActivity{
    private transporter;
    public static instance:EmailActivity;

    constructor(){
        this.transporter = nodemailer.createTransport({
        host: 'mail.dreamhost.com',
        //port: 465,
        secure: false,
        // service: 'gmail',
        auth: {
            user: 'noreply@therapyondemand.xyz',
            pass: 'R!jL5pSQ'
        }
        });

        EmailActivity.instance=this;
    }

    public sendEmail(email, subject, body, callback){
        var mailOptions = {
            from: 'noreply@therapyondemand.xyz',
            to: email,
            subject: subject,
            html: body
        };
        this.transporter.sendMail(mailOptions, callback);
    }
}