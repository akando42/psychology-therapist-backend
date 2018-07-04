import * as express from 'express';
import {MySqlDatabase} from '../class/class.mysql-database';
import {CryptoFunctions} from '../class/class.crypto-functions'
import {ExpressServer,HTTPMethod} from '../class/class.server';
import { RoutesHandler } from "../class/class.routeshandler";

import { WebUtility } from "./web-utility-routes";
import { DataModel } from "../datamodels/datamodel";
import { SQLUtility } from "./sql-utility";
import { EmailActivity } from "./email-activity";
import { UserRoutes } from "./user-routes";
import { MyApp } from "../app";
import { MyApp } from "../app";


export class HRAdminRoutes{
    private server:ExpressServer;
    private encodingKey="akjh#&*^%^*$#(hgsjfa86t*^%*$Q21^$GFHG&^#@RG387gt";

    constructor(server:ExpressServer, db:MySqlDatabase){
        this.server=server;
        var me:HRAdminRoutes=this;
        
        server.setRoute("/admin/login", (req:express.Request, res:express.Response)=>{
            me.adminLogin(req, res);
        }, HTTPMethod.POST);

        server.setRoute("/admin/decode/email", (req:express.Request, res:express.Response)=>{
            me.decodeEmailVerification(req, res);
        }, HTTPMethod.POST);

        server.setRoute("/admin/add/:type", (req:express.Request, res:express.Response)=>{
            me.addAccount(req, res);
        }, HTTPMethod.POST);

        server.setRoute("/admin/block", (req:express.Request, res:express.Response)=>{
            me.blockAccount(req, res);
        }, HTTPMethod.POST);

        server.setRoute("/admin/unblock", (req:express.Request, res:express.Response)=>{
            me.unblockAccount(req, res);
        }, HTTPMethod.POST);

        
        //-------Password reset functions
        server.setRoute("/reset/password", (req:express.Request, res:express.Response)=>{
            me.resetWebPassword(req, res);
        }, HTTPMethod.POST);
        server.setRoute("/set/password", (req:express.Request, res:express.Response)=>{
            me.setNewWebPassword(req, res);
        }, HTTPMethod.POST);
    }

    private adminLogin(req:express.Request, res:express.Response){

        var parsedVal  = WebUtility.getParsedToken(req)
        console.log("parsed Val : "+JSON.stringify(parsedVal));
        if(!parsedVal){
            return WebUtility.sendErrorMessage(res, req, DataModel.webResponses.account_token_error, "The account token is invalid.");;
        }

        var email:string = String(req.body.email);
        var password:string = String(req.body.password);

        // console.log(email+" : "+password);
        if(!(WebUtility.validateStringFields(email, 6, 255)
            && WebUtility.validateStringFields(password, 8, 20))){
                return WebUtility.sendErrorMessage(res, req, DataModel.webResponses.inputError, "Make sure that the input fields are valid");
            }
        
        this.verifyUser(email, password, req, res, true);
    }

    private verifyUser(email:string, pass:string, req:express.Request, res:express.Response, admin:boolean){
        //console.log(email+" : "+pass);
        let myTable;
        if(admin)
            myTable = DataModel.tables.admin;
        else
            myTable = DataModel.tables.hr;

        let sql = SQLUtility.formSelect(["*"],
                    myTable.table,
                    [myTable.email],
                    ["="],
                    []);
        console.log("My SQL : "+sql);
        MyApp.database.getQueryResults(sql, [email]).then(result=>{
            console.log(JSON.stringify(result));
            if(result.length==0){
                if(admin)
                    return this.verifyUser(email, pass, req, res, false);
                else
                    WebUtility.sendErrorMessage(res, req, DataModel.webResponses.loginError, "We cannot find any Admin with that name");
            }else{
                var out = result[0];
                if(out[myTable.password]!=pass){
                    WebUtility.sendErrorMessage(res, req, DataModel.webResponses.loginError, "The email ID and password doesnt match");
                    return false;
                }
                var response = {
                    value:{
                        email : out[myTable.email],
                        name : out[myTable.firstName],
                        verification : out[myTable.accountStatus]=='Y'?true:false
                    }
                }

                let type="";
                if(admin){
                    if(out[DataModel.tables.admin.owner]==1){
                        type=DataModel.userTypes.admin;
                    }else{
                        type=DataModel.userTypes.sales;
                    }
                    
                }else{
                    type=DataModel.userTypes.hr;
                }
                var tokenKey:string = WebUtility.getTokenKey(req);
                var date = Math.floor(new Date().getTime());
                var jsonStr={
                    ip:WebUtility.getIPAddress(req),
                    date:date,
                    origin:req.get("origin"),
                    adminId : out[myTable.id],
                    type:type
                }

                var cookieStr = CryptoFunctions.aes256Encrypt(JSON.stringify(jsonStr), tokenKey);
                response["sessionToken"] = cookieStr;
                //res.end(JSON.stringify(response));
                return WebUtility.sendSuccess(res, req, {
                    admin:true,
                    type:type,
                    message:"Logged in as an Admin",
                    sessionToken:cookieStr
                }, "Admin Logged in!");
            }
        }, error=>{
            console.log(error);
            WebUtility.sendErrorMessage(res, req, DataModel.webResponses.loginError, "Oops! Something went wrong.");
            return false;
        }).catch(error=>{
            console.log(error);
            WebUtility.sendErrorMessage(res, req, DataModel.webResponses.serverError, "Oops! Something went wrong on our server.");
            return false;
        })
    }

    private preProcessToken(req:express.Request, res:express.Response){
        if(!WebUtility.getParsedToken(req)){
            WebUtility.sendErrorMessage(res, req, DataModel.webResponses.account_token_error, "The accoun token is not valid.");
            return undefined;
        }

        let sessionToken  = WebUtility.getParsedToken(req, req.body.sessionToken, 30);
        console.log("parsed Val 2: "+JSON.stringify(sessionToken));
        if(!sessionToken){
            WebUtility.sendErrorMessage(res, req, DataModel.webResponses.session_token_error, "The session token is not valid. Please login again.");
            return undefined;
        }
        if(!(sessionToken["type"]==DataModel.userTypes.admin || sessionToken["type"]==DataModel.userTypes.sales) || parseInt(sessionToken["adminId"])==NaN){
            WebUtility.sendErrorMessage(res, req, DataModel.webResponses.accessError, "You dont have valid access rights");
            return undefined;
        }

        //let id=["adminId"];
        return sessionToken;
    }

    private decodeEmailVerification(req:express.Request, res:express.Response){
        var parsedVal  = WebUtility.getParsedToken(req)
        console.log("parsed Val : "+JSON.stringify(parsedVal));
        if(!parsedVal){
            return WebUtility.sendErrorMessage(res, req, DataModel.webResponses.account_token_error, "The account token is not valid");;
        }

        let code = req.body.code;
        let email = req.body.email;
        if(!code || !email){
            return WebUtility.sendErrorMessage(res, req, DataModel.webResponses.inputError, "Please check the inputs");
        }
        
        let myString=CryptoFunctions.aes256Decrypt(code, CryptoFunctions.get256BitKey([email, this.encodingKey]));
        let json:{
            email:string,
            firstName:string,
            lastName:string,
            type:string,
            id:Number
        }=JSON.parse(myString);

        if(!json){
            return WebUtility.sendErrorMessage(res, req, DataModel.webResponses.inputError, "Opps! Something went wrong. Please check email verification code");
        }

        let tokenKey:string = WebUtility.getTokenKey(req);
        let date = Math.floor(new Date().getTime());
        
        let jsonToken={
            ip:WebUtility.getIPAddress(req),
            date:date,
            origin:req.get("origin"),
            adminId : json.id,
            type:json.type+"_temp",
            actualType:json.type
        }
        let registerToken = CryptoFunctions.aes256Encrypt(JSON.stringify(jsonToken), tokenKey);

        let outputStr={
            email:json.email,
            firstName:json.firstName,
            lastName:json.lastName,
            type:json.type,
            registerToken:registerToken
        }
        WebUtility.sendSuccess(res, req, outputStr, "Successfully Parsed the email Inputs");
    }

    private addAccount(req:express.Request, res:express.Response){
        const { adminId, type}=this.preProcessToken(req, res);
        if(!adminId)
            return;

        let actionType = req.params.type;

        //let table=DataModel.tables.admin;
        let table:any;
        //let table=DataModel.tables.admin;
        if(actionType==DataModel.userTypes.sales){
            if(type!=DataModel.userTypes.admin)
                return WebUtility.sendErrorMessage(res, req, DataModel.webResponses.accessError, "You dont have a valid access permissions");
            table=DataModel.tables.admin;
        }else if(actionType==DataModel.userTypes.hr){
            table=DataModel.tables.hr;
        }else{
            return WebUtility.sendErrorMessage(res, req, DataModel.webResponses.inputError, "The URL parameter is invalid");
        }

        let firstName=req.body.firstName;
        let lastName=req.body.lastName;
        let email=req.body.email;
        let callback=req.body.callbackUrl;
        
        let insertJson={
            [table.firstName]:firstName,
            [table.lastName]:lastName,
            [table.email]:email,
        };
        if(actionType==DataModel.userTypes.hr)
            insertJson[table.adminCreatedRefID]=adminId;
        MyApp.database.insert(table.table, insertJson).then(result=>{
            //TODO Send the invitation Email to the user
            this.sendInvitationWithCode(req, res, table, email, firstName, lastName, actionType, result, callback);
        }, error=>{
            return WebUtility.sendErrorMessage(res, req, DataModel.webResponses.hrError, "Oops! Something went wrong.");
        }).catch(error=>{
            return WebUtility.sendErrorMessage(res, req, DataModel.webResponses.hrError, "Oops! Something went wrong on our server.");
        })
    }

    private sendInvitationWithCode(req:express.Request, res:express.Response, table:any, email:string, firstName:string, lastName:string, type:string, id:number, callback:string){
        let json={
            email:email,
            firstName:firstName,
            lastName:lastName,
            type:type,
            id:id
        }

        let myActualString=JSON.stringify(json);

        let myEncodedString=CryptoFunctions.aes256Encrypt(myActualString, CryptoFunctions.get256BitKey([email, this.encodingKey]));
        let code = encodeURIComponent(myEncodedString);
        let url = callback+"?code="+code+"&email="+encodeURIComponent(email);

        let body="<H1>Welcome to Therapy On Demand</H1>\
                <h3>Invitation to join Therapy On Demand ("+type+")</h3>\
                <a href='"+url+"'>[Click this Link]</a>"
        
        EmailActivity.instance.sendEmail(email, "Welcome to Therapy on Demand!", body, function(err, info){
            if(err){
                MyApp.database.delete(table.table, {
                    [table.email]:email
                }).then(result=>{},error=>{})
                return WebUtility.sendErrorMessage(res, req, DataModel.webResponses.emailError, "The Verification Email cant be sent");
            }else{
                return WebUtility.sendSuccess(res, req, [], "Successfully sent the invitation to the user");
            }
        })
    }

    private blockAccount(req:express.Request, res:express.Response){
        const { adminId, type}=this.preProcessToken(req, res);
        if(!adminId)
            return;

        let email = req.body.email;
        WebUtility.getTypeOfEmail(email).then(result=>{
            afterCheckingType(result);
        }, error=>{
            WebUtility.sendErrorMessage(res, req, DataModel.webResponses.inputError, "We cannot find that email ID");
        }).catch(error=>{
            WebUtility.sendErrorMessage(res, req, DataModel.webResponses.adminActionError, "Oops! Something went wrong.");
        })

        function afterCheckingType(actionType:string){
            let table:any=DataModel.tables.admin;
            if(actionType==DataModel.userTypes.sales){
                if(type!=DataModel.userTypes.admin)
                    return WebUtility.sendErrorMessage(res, req, DataModel.webResponses.accessError, "You dont have a valid access level");
                table=DataModel.tables.admin;
            }else if(actionType==DataModel.userTypes.hr){
                table=DataModel.tables.hr;
            }else{
                return WebUtility.sendErrorMessage(res, req, DataModel.webResponses.inputError, "The URL parameter is invalid");
            }

            
            //TODO Do the implementation to change the account status to the one for the blocked account
            MyApp.database.update(table.table, {
                [table.accountStatus]:DataModel.accountStatus.blocked
            },{
                [table.email]:email
            }).then(result=>{
                if(result){
                    return WebUtility.sendSuccess(res, req, [], "Successfully updated the details");
                }else{
                    return WebUtility.sendErrorMessage(res, req, DataModel.webResponses.adminActionError, "Woops! Nothing changed in our system");
                }
            }, error=>{
                return WebUtility.sendErrorMessage(res, req, DataModel.webResponses.adminActionError, "Oops! Something went wrong.");
            }).catch(error=>{
                return WebUtility.sendErrorMessage(res, req, DataModel.webResponses.adminActionError, "Oops! Something went wrong on our server.");
            })
        }
    }

    private unblockAccount(req:express.Request, res:express.Response){
        const { adminId, type}=this.preProcessToken(req, res);
        if(!adminId)
            return;

        let email = req.body.email;
        WebUtility.getTypeOfEmail(email).then(result=>{
            afterCheckingType(result);
        }, error=>{
            WebUtility.sendErrorMessage(res, req, DataModel.webResponses.inputError, "We cannot find that email ID");
        }).catch(error=>{
            WebUtility.sendErrorMessage(res, req, DataModel.webResponses.adminActionError, "Oops! Something went wrong.");
        })

        function afterCheckingType(actionType:string){
            let table:any=DataModel.tables.admin;
            if(actionType==DataModel.userTypes.sales){
                if(type!=DataModel.userTypes.admin)
                    return WebUtility.sendErrorMessage(res, req, DataModel.webResponses.accessError, "You dont have a valid access level");
                table=DataModel.tables.admin;
            }else if(actionType==DataModel.userTypes.hr){
                table=DataModel.tables.hr;
            }else{
                return WebUtility.sendErrorMessage(res, req, DataModel.webResponses.inputError, "The URL parameter is invalid");
            }

            
            //TODO Do the implementation to change the account status to the one for the blocked account
            MyApp.database.update(table.table, {
                [table.accountStatus]:DataModel.accountStatus.accepted
            },{
                [table.email]:email
            }).then(result=>{
                if(result){
                    return WebUtility.sendSuccess(res, req, [], "Successfully updated the details");
                }else{
                    return WebUtility.sendErrorMessage(res, req, DataModel.webResponses.adminActionError, "Woops! Nothing changed in our system");
                }
            }, error=>{
                return WebUtility.sendErrorMessage(res, req, DataModel.webResponses.adminActionError, "Something went Wrong !! "+error);
            }).catch(error=>{
                return WebUtility.sendErrorMessage(res, req, DataModel.webResponses.adminActionError, "Something went Wrong !! "+error);
            })
        }
    }

    private resetWebPassword(req:express.Request, res:express.Response){
        if(!WebUtility.getParsedToken(req)){
            return WebUtility.sendErrorMessage(res, req, DataModel.webResponses.account_token_error, "The token is invalid")
        }
        if(!req.body.email)
            return WebUtility.sendErrorMessage(res, req, DataModel.webResponses.inputError, "The input doesnt contains email ID or the type os User");

        let email=req.body.email;
        WebUtility.getTypeOfEmail(email).then(result=>{
            afterCheckingType(result);
        }, error=>{
            WebUtility.sendErrorMessage(res, req, DataModel.webResponses.inputError, "We cannot find that email ID");
        }).catch(error=>{
            WebUtility.sendErrorMessage(res, req, DataModel.webResponses.adminActionError, "Oops! Something went wrong.");
        })

        function afterCheckingType(type:string){
            //TODO Check if the email ID exists
            let users:any=DataModel.tables.admin;
            if(type==DataModel.userTypes.admin){
                users=DataModel.tables.admin;
            }else if(type==DataModel.userTypes.hr){
                users=DataModel.tables.hr;
            }else if(type==DataModel.userTypes.sales){
                users=DataModel.tables.admin;
            }else if(type==DataModel.userTypes.provider){
                users=DataModel.tables.providers;
            }else{
                return WebUtility.sendErrorMessage(res, req, DataModel.webResponses.inputError, "Type specified was invalid")
            }

            let sql ="SELECT "+users.firstName+" \
                FROM "+users.table+" \
                WHERE "+users.email+"=?";

            MyApp.database.getQueryResults(sql, [email]).then(result=>{
                if(result.length==1)
                    proceedAfterVerifyingUser();
                else
                    return WebUtility.sendErrorMessage(res, req, DataModel.webResponses.passwordResetError, "The User with that email ID doesn't Esists");
            }, error=>{
                return WebUtility.sendErrorMessage(res, req, DataModel.webResponses.passwordResetError, "Oops! Something went wrong.");
            }).catch(error=>{
                return WebUtility.sendErrorMessage(res, req, DataModel.webResponses.passwordResetError, "Oops! Something went wrong.");
            })

            function proceedAfterVerifyingUser(){
                let redirectURL=MyApp.appConfig.frontEndUrl+"/"+type+"/set/password?"
                let json={
                    email:email,
                    date:Date.now()
                }
                let encryptedStr = CryptoFunctions.aes256Encrypt(JSON.stringify(json), CryptoFunctions.get256BitKey([email, UserRoutes.randomPatternToVerify]))
                redirectURL+="resetCode="+encodeURIComponent(encryptedStr)+"&email="+encodeURIComponent(email);
                let body="<h3>Reset your password</h3>\
                    <p>Hi we have recieved your password reset request</p>\
                    <p>Please click on the <a href="+redirectURL+">link</a> to reset your password</p>"
                EmailActivity.instance.sendEmail(email, "Reset Pasword requested", body, function(error, info){
                    if(!error){
                        return WebUtility.sendSuccess(res, req, [], "Successfully sent the reset Link");
                    }else{
                        return WebUtility.sendErrorMessage(res, req, DataModel.webResponses.emailError, "Couldn't send the email.");
                    }
                });
            }
        }
    }

    private setNewWebPassword(req:express.Request, res:express.Response){
        if(!WebUtility.getParsedToken(req)){
            return WebUtility.sendErrorMessage(res, req, DataModel.webResponses.account_token_error, "The token is invalid")
        }

        if(!req.body.email || !req.body.resetCode || !req.body.password)
            return WebUtility.sendErrorMessage(res, req, DataModel.webResponses.inputError, "The input doesnt contains email ID");
        
        let email=req.body.email;
        let resetCode=req.body.resetCode;
        let password=req.body.password;

        if(!(password.match(/[A-Z]/) && password.match(/[a-z]/) && password.match(/[0-9]/) && password.match(/[^A-Za-z0-9]/)))
            return WebUtility.sendErrorMessage(res, req, DataModel.webResponses.inputError, "The password should contain 1 Caps, 1 Small, 1 number and 1 symbol");

        let decryptedStr = CryptoFunctions.aes256Decrypt(resetCode, CryptoFunctions.get256BitKey([email, UserRoutes.randomPatternToVerify]))
        let json:{
                email:string,
                date:number
            } = JSON.parse(decryptedStr);
        if(!json)
            return WebUtility.sendErrorMessage(res, req, DataModel.webResponses.inputError, "The the reset code sent is invalid");

        //Check the validity of link by checking the date
        let timeInMs = Date.now()-json.date;
        if(timeInMs<0 || timeInMs>24*60*60*60){
            return WebUtility.sendErrorMessage(res, req, DataModel.webResponses.passwordResetError, "The reset link has exprired");
        }

        //DONE Write the segment to implement if a given reset token has been already used
        this.checkIfTokenKeyUsed(req, res, resetCode, callback);

        function callback(){
            WebUtility.getTypeOfEmail(email).then(result=>{
                callbackAfterType(result);
            }, error=>{
                WebUtility.sendErrorMessage(res, req, DataModel.webResponses.inputError, "We cannot find that email ID");
            }).catch(error=>{
                WebUtility.sendErrorMessage(res, req, DataModel.webResponses.adminActionError, "Oops! Something went wrong.");
            })
        }

        // let users=DataModel.tables.users;
        function callbackAfterType(type:string){
            let table:any=DataModel.tables.admin;
            if(type==DataModel.userTypes.admin){
                table=DataModel.tables.admin;
            }else if(type==DataModel.userTypes.hr){
                table=DataModel.tables.hr;
            }else if(type==DataModel.userTypes.sales){
                table=DataModel.tables.admin;
            }else if(type==DataModel.userTypes.provider){
                table=DataModel.tables.providers;
            }else if(type==DataModel.userTypes.user){
                table=DataModel.tables.users;
            }else{
                return WebUtility.sendErrorMessage(res, req, DataModel.webResponses.inputError, "Type specified was invalid")
            }
            MyApp.database.update(table.table, {
                [table.password]:password
            }, {
                [table.email]:email
            }).then(result=>{
                if(result){
                    return WebUtility.sendSuccess(res, req, [], "Your password has been successfully reset!!");
                }else{
                    return WebUtility.sendErrorMessage(res, req, DataModel.webResponses.passwordResetError, "The email ID is not registered with us");
                }
            }, error=>{
                return WebUtility.sendErrorMessage(res, req, DataModel.webResponses.passwordResetError, "Oops! Something went wrong.");
            }).catch(error=>{
                return WebUtility.sendErrorMessage(res, req, DataModel.webResponses.passwordResetError, "Oops! Something went wrong.");
            })
        }
    }

    private checkIfTokenKeyUsed(req:express.Request, res:express.Response, token:string, callback:()=>void){

        let usedToken=DataModel.tables.usedTokensOrKeys;
        let sql = "SELECT * FROM "+usedToken.table+" WHERE "+usedToken.token+"=?";
        MyApp.database.getQueryResults(sql, [token]).then(result=>{
            if(result.length==1){
                return WebUtility.sendErrorMessage(res, req, DataModel.webResponses.passwordResetError, "The reset code has been already used.");
            }
            MyApp.database.insert(usedToken.table, {
                [usedToken.token]:token
            }).then(result=>{
                callback();
            }, error=>{
                return WebUtility.sendErrorMessage(res, req, DataModel.webResponses.passwordResetError, "Oops! Somethingwent wrong");
            }).catch(error=>{
                return WebUtility.sendErrorMessage(res, req, DataModel.webResponses.passwordResetError, "Oops! Somethingwent wrong on server");
            });
        }, error=>{
            return WebUtility.sendErrorMessage(res, req, DataModel.webResponses.passwordResetError, "Oops! Somethingwent wrong");
        }).catch(error=>{
            return WebUtility.sendErrorMessage(res, req, DataModel.webResponses.passwordResetError, "Oops! Somethingwent wrong on server");
        })
    }
}