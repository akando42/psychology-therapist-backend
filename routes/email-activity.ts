import * as express from 'express';
import {MySqlDatabase} from '../class/class.mysql-database';
import {CryptoFunctions} from '../class/class.crypto-functions'
import {ExpressServer,HTTPMethod} from '../class/class.server';
import { UsersUtility } from "./users-utility-routes";
import { DataModel } from "../datamodels/datamodel";
import { SQLUtility } from "./sql-utility";
import { ImageUtility } from "./image-utility";

var nodemailer = require('nodemailer');

var api_key = '759a41ec453b708bcb16e0769be3e864-b892f62e-d75c1e60';
var domain = 'therapyondemand.xyz';
var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});

export class EmailActivity{
    private transporter;
    public static instance:EmailActivity;

    constructor(){
        EmailActivity.instance=this;
        
    }
    
    public sendEmail(email, subject, body, callback){
        // var mailOptions = {
        //     from: 'rsinha@therapyondemand.io',
        //     to: email,
        //     subject: subject,
        //     html: body
        // };
        // this.transporter.sendMail(mailOptions, callback);

        var data = {
            from: 'Therapy on Demand <postmaster@therapyondemand.xyz>',
            to: email,
            subject: subject,
            html: body
        };
        
        mailgun.messages().send(data, callback);

        
        //sgMail.send(mailOptions, callback);
    }
}