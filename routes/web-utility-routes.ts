import * as express from 'express';
import { MySqlDatabase } from '../class/class.mysql-database';
import { CryptoFunctions } from '../class/class.crypto-functions'
import { ExpressServer, HTTPMethod } from '../class/class.server';
import { RoutesHandler } from "../class/class.routeshandler";
import { DataModel } from "../datamodels/datamodel";
import { SQLUtility } from "./sql-utility";
import { SecurityFeatures } from "./security-features";
import { MyApp } from "../app";
import { ImageUtility } from "./image-utility";

export class WebUtility {
    private database: MySqlDatabase;
    private server: ExpressServer;
    private static tokenRandText = "#4782q6hjnbb%6^&#&*!*bjhVU^&%^E^%$2jhrf**&$*Q(~)$*";

    constructor(server: ExpressServer, db: MySqlDatabase) {
        this.server = server;
        this.database = db;
        var me = this;

        server.setRoute("/token/web", (req: express.Request, res: express.Response) => {
            me.createToken(req, res);
        }, HTTPMethod.GET);
    }

    private createToken(req: express.Request, res: express.Response) {
        console.log("My Cookies : " + JSON.stringify(req.cookies));
        var ip: string = WebUtility.getIPAddress(req);
        console.log("My IP : " + ip + " - " + req.get("origin") + " : " + req.body.accountToken);
        var tokenKey = WebUtility.getTokenKey(req);
        console.log("0 : " + tokenKey + " - " + tokenKey.length);
        let accountToken = "";
        if (req.body.accountToken) {
            console.log("02");
            try {
                var tokenVal: string = CryptoFunctions.aes256Decrypt(req.body.accountToken, tokenKey);
                var parsedVal;
                try {
                    parsedVal = JSON.parse(tokenVal);
                } catch (error) {
                    parsedVal = undefined;
                }

                if (parsedVal) {
                    //if(parsedVal.ip!=ip || !parsedVal.date || parsedVal.origin!=req.get("origin"))
                    if (!WebUtility.validateParsedToken(parsedVal, req))
                        WebUtility.generateToken(ip, tokenKey, req.get("origin"), req, res).then(result => {
                            accountToken = result;
                            WebUtility.sendSuccess(res, req, { accountToken: accountToken }, "Successfully created the token")
                        });
                } else {
                    WebUtility.generateToken(ip, tokenKey, req.get("origin"), req, res).then(result => {
                        accountToken = result;
                        WebUtility.sendSuccess(res, req, { accountToken: accountToken }, "Successfully created the token")
                    });
                }
            } catch (error) {
                WebUtility.generateToken(ip, tokenKey, req.get("origin"), req, res).then(result => {
                    accountToken = result;
                    WebUtility.sendSuccess(res, req, { accountToken: accountToken }, "Successfully created the token")
                });
            }

        } else {
            console.log("01");
            //this.generateToken(ip, tokenKey, req.get("origin"), res);
            WebUtility.generateToken(ip, tokenKey, req.get("origin"), req, res).then(result => {
                accountToken = result;
                WebUtility.sendSuccess(res, req, { accountToken: accountToken }, "Successfully created the token")
            });
        }
    }

    public static getParsedToken(req: express.Request, token?: string, aliveTimeInMinutes?: number) {
        if (token === undefined)
            token = req.body.accountToken;
        try {
            var tokenVal: string = CryptoFunctions.aes256Decrypt(token, WebUtility.getTokenKey(req));
        } catch (error) {
            //UtilityRoutes.sendErrorMessage(res, req, 403, "The accountToken is not valid");
            return undefined;
        }
        try {
            var parsedVal = JSON.parse(tokenVal);
        } catch (error) {
            return undefined;
        }

        if (parsedVal) {
            console.log("Parsed Val : " + JSON.stringify(parsedVal));
            if (WebUtility.validateParsedToken(parsedVal, req, aliveTimeInMinutes)) {
                return parsedVal;
            } else {
                return undefined;
            }
        } else {
            return undefined;
        }
    }
    public static validateParsedToken(parsedVal: { ip: string, date: string, origin: string }, req: express.Request, aliveTime?: number): boolean {
        if (parsedVal.ip == WebUtility.getIPAddress(req)
            && parsedVal.date
            && parsedVal.origin == req.get("origin")) {

            if (aliveTime === undefined)
                return true;
            else {
                let timeDiff = Math.abs(parseInt(parsedVal.date) - Date.now()) / (1000 * 60.0)
                if (timeDiff < aliveTime)
                    return true;
                else
                    return false;
            }
        } else {
            return false;
        }
    }
    public static async generateToken(ip: string, key: string, origin: string, req: express.Request, res: express.Response): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            console.log("1");
            // let table = DataModel.tables.tokenTracker;
            // let sql = "SELECT * \
            //     FROM "+table.table+"\
            //     WHERE "+table.ip+"='"+WebUtility.getIPAddress(req)+"'";
            // console.log("SQL : "+sql);
            // MyDatabase.database.getQueryResults(sql, []).then(result=>{
            //     if(result.length>0){
            //         let out=result[0]
            //         //TODO Process different conditions and validate or invalidate the token
            //         let curDateTime = new Date().toISOString().slice(0, 19).replace('T', ' ');
            //         let lastDateTime:string = ""+out[table.tokenCreationTime];
            //         let lastMin = lastDateTime.substring(lastDateTime.indexOf(':')+1, lastDateTime.lastIndexOf(':'));
            //         let curMin = curDateTime.substring(curDateTime.indexOf(':')+1, curDateTime.lastIndexOf(':'));

            //         console.log("Minute Comparison : "+lastMin+" : "+curMin)
            //         if(curMin==lastMin){
            //             let totCalls:number=out[table.totalCallsInAMinute];
            //             if(totCalls>30){
            //                 WebUtility.sendErrorMessage(res, req, DataModel.webResponses.totalAPICallsExceeded, "Please wait for a while before again calling the apis");
            //             }else{
            //                 SecurityFeatures.updateTokenState(req, res,accountToken, out, false, next);
            //             }
            //         }else{
            //             SecurityFeatures.updateTokenState(req, res,accountToken, out, true, next);
            //         }
            //     }else{
            //         SecurityFeatures.addTokenToDatabase(accountToken, req.body.accountToken);
            //         next();
            //     }
            // }, error=>{
            //     console.log("Its here 1");

            //     next();
            // }).catch(error=>{
            //     console.log("Its here 2 : "+error);
            //     next();
            // })
            var date = Math.floor(new Date().getTime());
            var jsonStr = {
                ip: ip,
                date: date,
                origin: origin
            }
            console.log("2");
            var encodedStr: string = CryptoFunctions.aes256Encrypt(JSON.stringify(jsonStr), key);
            console.log("3 : " + encodedStr);
            SecurityFeatures.addTokenToDatabase(jsonStr, encodedStr);
            //res.cookie("accountToken", cookieStr);
            resolve(encodedStr);
        });
    }
    public static async getUserType(email: string): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            //0:admin 1:sales 2:hr 3:provider 4:user 5:exit
            iterate(0);

            function iterate(index: number) {
                let table: any = DataModel.tables.admin;
                let sql = "SELECT " + table.userRole + " \
                        FROM "+ table.table + " \
                        WHERE "+ table.email + "=?";
                if (index == 0) {
                    //Do nothing. Its already initialized
                } else if (index == 1) {
                    //Providers
                    table = DataModel.tables.providers;
                    sql = "SELECT " + table.id + " \
                        FROM "+ table.table + " \
                        WHERE "+ table.email + "=?";
                } else if (index == 2) {
                    //Users
                    table = DataModel.tables.users;
                    sql = "SELECT " + table.id + " \
                        FROM "+ table.table + " \
                        WHERE "+ table.email + "=?";
                } else {
                    reject("Cannot find the User : " + email)
                }

                MyApp.database.getQueryResults(sql, [email]).then(result => {
                    if (result.length == 1) {
                        if (index == 0) {
                            console.log(JSON.stringify(result));

                            resolve(result[0][table.userRole]);
                        } else if (index == 1)
                            resolve(DataModel.userRoles.provider);
                        else if (index == 2)
                            resolve(DataModel.userRoles.user);
                    } else {
                        iterate(index + 1);
                    }
                }, error => {
                    iterate(index + 1);
                }).catch(error => {
                    iterate(index + 1);
                })
            }
        });
    }


    public static getIPAddress(req: express.Request): string {
        var ip: string = req.connection.remoteAddress ||
            req.socket.remoteAddress;
        return ip;
    }
    public static getTokenKey(req: express.Request): string {
        var ip: string = WebUtility.getIPAddress(req);
        var tokenKey = CryptoFunctions.get256BitKey([ip, req.get("origin"), WebUtility.tokenRandText]);
        return tokenKey;
    }

    //Returns true on valid string. False on invalid
    public static validateStringFields(value: string, min: number, max: number): boolean {
        if (value === undefined) {
            var response = {
                status: 400,
                description: "Invalid input, the login credentials are not valid."
            };
            return false;
        }
        if (value.length >= min && max == -1 ? true : value.length <= max) {
            return true;
        } else {
            var response = {
                status: 400,
                description: "Invalid input, the login credentials are not valid."
            };
            // res.status(400);
            // res.end(JSON.stringify(response));
            return false;
        }
    }
    public static validateEmail(email: string): boolean {
        if (!email.match(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/))
            return false;
        return true;
    }
    public static validatePassword(password: string): boolean {
        if (!(password.match(/[A-Z]/) && password.match(/[a-z]/) && password.match(/[0-9]/) && password.match(/[^A-Za-z0-9]/)))
            return false;
        return true;
    }
    public static validatePhoneNumber(phone: string): boolean {
        if (!phone.match(/^[0-9]+$/))
            return false;
        return true;
    }
    public static validateNumber(n: string): boolean {
        if (!n || parseInt(n) == NaN)
            return false;
        return true;
    }
    public static validateFloat(n: string): boolean {
        if (!n || parseFloat(n) == NaN)
            return false;
        return true;
    }

    public static sendErrorMessage(res: express.Response, req: express.Request, code: number, description: string) {
        RoutesHandler.respond(res, req, [], true, description, code);
    }
    public static sendSuccess(res: express.Response, req: express.Request, data: any, description: string) {
        RoutesHandler.respond(res, req, data, false, description, DataModel.webResponses.success);
    }


    public static checkTimeThreshold(time: string, req: express.Request): boolean {
        let d1 = new Date(time);
        let d2 = new Date(Date.now);
        let timeDifference = Math.abs(d1.getTime() - d2.getTime()) / (1000 * 60.0);

        if (timeDifference > 30)
            return true;
        return false;
    }

}