process.env.NODE_ENV = 'production';
process.setMaxListeners(0);
import * as express from 'express';
import {ExpressServer,HTTPMethod} from './class/class.server';
import {RoutesHandler} from './class/class.routeshandler';
import {MySqlDatabase} from './class/class.mysql-database';
import {CryptoFunctions} from './class/class.crypto-functions';

import { WebUtility } from "./routes/web-utility-routes";
import { ProviderRoutes } from "./routes/provider-routes";
import { UsersUtility } from "./routes/users-utility-routes";
import { UserRoutes } from "./routes/user-routes";
import { DevelopmentRoutings } from "./routes/dev-routes";
import { ImageUtility } from "./routes/image-utility";
import { HRAdminRoutes } from "./routes/hr-admin-routes";
import { HRRoutes } from "./routes/hr-routes";
import { EmailActivity } from "./routes/email-activity";
import { SecurityFeatures } from "./routes/security-features";
import { StripePayments } from "./routes/payment-utility";

var path = require('path');

const appConfig=require('./config/app.json');
const dbConfig=require('./config/db.json');
const server:ExpressServer = new ExpressServer(appConfig);
const routesHandler:RoutesHandler = new RoutesHandler();
const database:MySqlDatabase=new MySqlDatabase(dbConfig.server,dbConfig.user,dbConfig.password,dbConfig.database,dbConfig.port);

export class MyDatabase{
    public static database:MySqlDatabase;
    constructor(){
        MyDatabase.database=database;
    }
}
new MyDatabase();
server.server.use(SecurityFeatures.token_couter)
server.server.set('views', path.join(__dirname, 'views'));
server.server.set('view engine', 'ejs');


/* Example routing */
server.setRoute('/', (req:express.Request, res:express.Response)=>
{
    RoutesHandler.respond(res,req,{},true,'We couldn\'t find that routing!!');
},HTTPMethod.GET);
server.server.use(express.static(path.join(__dirname, 'public')));

ImageUtility.setLocation(__dirname+"/public");

let stripePayment = new StripePayments(server, database);
let email = new EmailActivity();
let dev = new DevelopmentRoutings(server, database);
let webUtility = new WebUtility(server,database);
let providers = new ProviderRoutes(server,database);
let usersUtility = new UsersUtility(server,database);
let users = new UserRoutes(server, database);
let hrRoutes = new HRRoutes(server, database);
let hrAdminRoutes = new HRAdminRoutes(server, database);


/** Example database insert *****/
/* database.insert("TABLE",{colum1:value1,column2:value2}).then(result=>//do something with the result,error=> //handle the error).catch(error=>//handle the error) */

/** Example database update *****/
/* database.update("TABLE",{colum1:newvalue1,column2:newvalue2},{id:rowid}).then(result=>//do something with the result,error=> //handle the error).catch(error=>//handle the error) */

/** Example database query *****/
/* database.getQueryResults("SELECT * FROM TABLE WHERE COLUMN1=? AND COLUMN2=?",["value1","value2"]).then(result=>//do something with the result,error=> //handle the error).catch(error=>//handle the error) */











//Google APIs

// const fs = require('fs');
// const readline = require('readline');
// const {google} = require('googleapis');

// // If modifying these scopes, delete credentials.json.
// const SCOPES = ['https://www.googleapis.com/auth/gmail.readonly'];
// const TOKEN_PATH = 'config/credentials.json';

// // Load client secrets from a local file.
// fs.readFile('config/client_secret.json', (err, content) => {
//   if (err) return console.log('Error loading client secret file:', err);
//   // Authorize a client with credentials, then call the Google Sheets API.
//   authorize(JSON.parse(content), listLabels);
// });

// /**
//  * Create an OAuth2 client with the given credentials, and then execute the
//  * given callback function.
//  * @param {Object} credentials The authorization client credentials.
//  * @param {function} callback The callback to call with the authorized client.
//  */
// function authorize(credentials, callback) {
//   const {client_secret, client_id, redirect_uris} = credentials.web;
//   const oAuth2Client = new google.auth.OAuth2(
//       client_id, client_secret, redirect_uris[0]);

//   // Check if we have previously stored a token.
//   fs.readFile(TOKEN_PATH, (err, token) => {
//     if (err) return getNewToken(oAuth2Client, callback);
//     oAuth2Client.setCredentials(JSON.parse(token));
//     callback(oAuth2Client);
//   });
// }

// /**
//  * Get and store new token after prompting for user authorization, and then
//  * execute the given callback with the authorized OAuth2 client.
//  * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
//  * @param {getEventsCallback} callback The callback for the authorized client.
//  */
// function getNewToken(oAuth2Client, callback) {
//   const authUrl = oAuth2Client.generateAuthUrl({
//     access_type: 'offline',
//     scope: SCOPES,
//   });
//   console.log('Authorize this app by visiting this url:', authUrl);
//   const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout,
//   });
//   rl.question('Enter the code from that page here: ', (code) => {
//     rl.close();
//     oAuth2Client.getToken(code, (err, token) => {
//       if (err) return callback(err);
//       oAuth2Client.setCredentials(token);
//       // Store the token to disk for later program executions
//       fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
//         if (err) return console.error(err);
//         console.log('Token stored to', TOKEN_PATH);
//       });
//       callback(oAuth2Client);
//     });
//   });
// }

// /**
//  * Lists the labels in the user's account.
//  *
//  * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
//  */
// function listLabels(auth) {
//   const gmail = google.gmail({version: 'v1', auth});
//   gmail.users.labels.list({
//     userId: 'me',
//   }, (err, {data}) => {
//     if (err) return console.log('The API returned an error: ' + err);
//     const labels = data.labels;
//     if (labels.length) {
//       console.log('Initialized My Account');
//       labels.forEach((label) => {
//         //console.log(`- ${label.name}`);
//       });
//     } else {
//       console.log('No labels found.');
//     }
//   });
//   email.initTransporter(TOKEN_PATH);
// }
