process.env.NODE_ENV = 'production';
process.setMaxListeners(0);
import * as express from 'express';
import {ExpressServer,HTTPMethod} from './class/class.server';
import {RoutesHandler} from './class/class.routeshandler';
import {MySqlDatabase} from './class/class.mysql-database';
import {CryptoFunctions} from './class/class.crypto-functions';
import { ProvidersUtility } from "./routes/providers-utility-routes";
import { ProviderRoutes } from "./routes/provider-routes";
import { UsersUtility } from "./routes/users-utility-routes";
import { UserRoutes } from "./routes/user-routes";
import { DevelopmentRoutings } from "./routes/dev-routes";
import { ImageUtility } from "./routes/image-utility";
var path = require('path');

const appConfig=require('./config/app.json');
const dbConfig=require('./config/db.json');
const server:ExpressServer = new ExpressServer(appConfig);
const routesHandler:RoutesHandler = new RoutesHandler();
const database:MySqlDatabase=new MySqlDatabase(dbConfig.server,dbConfig.user,dbConfig.password,dbConfig.database,dbConfig.port);


/* Example routing */
server.setRoute('/', (req:express.Request, res:express.Response)=>
{
    RoutesHandler.respond(res,req,{},false,'The server is working!');
},HTTPMethod.GET);
server.server.use(express.static(path.join(__dirname, 'public')));

ImageUtility.setLocation(__dirname+"/public");

let dev = new DevelopmentRoutings(server, database);
let provicersUtility = new ProvidersUtility(server,database);
let providers = new ProviderRoutes(server,database);
let usersUtility = new UsersUtility(server,database);
let users = new UserRoutes(server, database);


/** Example database insert *****/
/* database.insert("TABLE",{colum1:value1,column2:value2}).then(result=>//do something with the result,error=> //handle the error).catch(error=>//handle the error) */

/** Example database update *****/
/* database.update("TABLE",{colum1:newvalue1,column2:newvalue2},{id:rowid}).then(result=>//do something with the result,error=> //handle the error).catch(error=>//handle the error) */

/** Example database query *****/
/* database.getQueryResults("SELECT * FROM TABLE WHERE COLUMN1=? AND COLUMN2=?",["value1","value2"]).then(result=>//do something with the result,error=> //handle the error).catch(error=>//handle the error) */














