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
import { ImageUtility } from "./image-utility";


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

        server.setRoute("/admin/set/profile", (req:express.Request, res:express.Response)=>{
            me.setProfile(req, res);
        }, HTTPMethod.POST);
        

        server.setRoute("/admin/add_user", (req:express.Request, res:express.Response)=>{
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
        server.setRoute("/get/profile", (req:express.Request, res:express.Response)=>{
            me.getProfile(req, res);
        }, HTTPMethod.POST);

        server.setRoute("/admin/list_users", (req:express.Request, res:express.Response)=>{
            me.listUsers(req, res);
        }, HTTPMethod.POST);

    }

    private getProfile(req:express.Request, res:express.Response){
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
        if(!(sessionToken["role"]==DataModel.userTypes.admin || sessionToken["role"]==DataModel.userTypes.hr || sessionToken["role"]==DataModel.userTypes.sales) 
            || parseInt(sessionToken["adminId"])==NaN){
            WebUtility.sendErrorMessage(res, req, DataModel.webResponses.accessError, "You dont have valid access rights");
            return undefined;
        }

        const { adminId, role}=sessionToken;
        if(!adminId)
            return;
        
        let admin=DataModel.tables.admin;

        MyApp.database.query(admin.table, {
            [admin.id]:adminId,
            [admin.userType]:role
        }, []).then(result=>{
            if(result.length==1){
                let out=result[0];
                return WebUtility.sendSuccess(res, req, {
                    type:type,
                    fullName:out[admin.firstName]+" "+out[admin.lastName],
                    firstName:out[admin.firstName],
                    lastName:out[admin.lastName],
                    email:out[admin.email],
                    image:out[admin.image],
                    phone:out[admin.phone],
                }, "Successfully fetched the profile details");
            }else{

            }
        }, error=>{
            WebUtility.sendErrorMessage(res, req, DataModel.webResponses.profileError, "Oops! Something went wrong.");
        }).catch(error=>{
            WebUtility.sendErrorMessage(res, req, DataModel.webResponses.profileError, "Oops! Something went wrong on our server.");
        })

    }

    private listUsers(req:express.Request, res:express.Response){
        const { adminId, role}=this.preProcessToken(req, res);
        if(!adminId)
            return;
        
        let admin=DataModel.tables.admin;
        
        let searchKey=req.body.searchKey;
        let roles:any[]=req.body.roles;
        let status:number[]=req.body.status;
        let paging:number=req.body.paging;
        let pageStart=0;
        let pageEnd=10;

        let sql = " FROM "+admin.table+" \
                WHERE "+admin.userType+"!='"+DataModel.userTypes.admin+"' \
                ";

        if(searchKey && searchKey.length>0){
            sql+=" AND ("+admin.email+" LIKE '%"+searchKey+"%'  OR  "+admin.firstName+" LIKE '%"+searchKey+"%' OR "+admin.lastName+" LIKE '%"+searchKey+"%') ";
        }
        if(roles && roles.length>0){
            sql+=" AND "+admin.userType+" in ('"+roles.join("','")+"') ";
        }
        if(status && status.length>0){
            sql+=" AND "+admin.accountStatus+" in ('"+status.join("','")+"') ";
        }
        if(paging){
             pageStart= paging*10;
             pageEnd=pageStart+10;
        }

        
        function getTotalPageCount(){
            let countSql="SELECT COUNT(*) as count"+sql;
            MyApp.database.getQueryResults(countSql, []).then(result=>{
                let pages = parseInt(result[0]["count"])
                if(pages==NaN){
                    WebUtility.sendErrorMessage(res, req, DataModel.webResponses.listUserError, "Something went wrong which fetching the pages");
                }else{
                    getActualData(Math.floor(pages/10));
                }
            }, error=>{
                WebUtility.sendErrorMessage(res, req, DataModel.webResponses.listUserError, "Oops! Something went wrong.");
            }).catch(error=>{
                WebUtility.sendErrorMessage(res, req, DataModel.webResponses.listUserError, "Oops! Something went wrong on our server.");
            })
        }
        getTotalPageCount();

        function getActualData(pages:number){
            pages++;

            let mysql="SELECT * "+sql+" LIMIT "+pageStart+", "+pageEnd;;

            MyApp.database.getQueryResults(mysql, []).then(result=>{
                let users=[];
                for(var i in result){
                    let out = result[i];
                    let json={
                        id:out[admin.id],
                        firstName:out[admin.firstName],
                        lastName:out[admin.lastName],
                        email:out[admin.email],
                        role:out[admin.userType],
                        status:out[admin.accountStatus],
                    }
                    users.push(json);
                }
                var data={
                    pages:pages,
                    users:users
                }
                WebUtility.sendSuccess(res, req, data, "Data Fetched successfully");
            }, error=>{
                WebUtility.sendErrorMessage(res, req, DataModel.webResponses.listUserError, "Oops! Something went wrong.");
            }).catch(error=>{
                WebUtility.sendErrorMessage(res, req, DataModel.webResponses.listUserError, "Oops! Something went wrong on our server.");
            })
        }

        
        
    }

    private setProfile(req:express.Request, res:express.Response){
        const { adminId, role}=this.preProcessToken(req, res);
        if(!adminId)
            return;
        
        let admin=DataModel.tables.admin;
        WebUtility.adminSetProfile(req, res, admin, adminId);
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
        
        this.verifyUser(email, password, req, res);
    }

    private verifyUser(email:string, pass:string, req:express.Request, res:express.Response){
        //console.log(email+" : "+pass);
        let myTable = DataModel.tables.admin;;

        let sql = SQLUtility.formSelect(["*"],
                    myTable.table,
                    [myTable.email],
                    ["="],
                    []);
        console.log("My SQL : "+sql);
        MyApp.database.getQueryResults(sql, [email]).then(result=>{
            console.log(JSON.stringify(result));
            if(result.length==0){
                WebUtility.sendErrorMessage(res, req, DataModel.webResponses.loginError, "We cannot find any Admin with that name");
            }else{
                var out = result[0];
                if(out[myTable.password]!=pass){
                    WebUtility.sendErrorMessage(res, req, DataModel.webResponses.loginError, "The email ID and password doesnt match");
                    return false;
                }

                if(out[myTable.accountStatus] == DataModel.accountStatus.accepted){
                    //Do Nothing
                }else if(out[myTable.accountStatus] == DataModel.accountStatus.waiting){
                    return WebUtility.sendErrorMessage(res, req, DataModel.webResponses.loginError, "Please accept the email confirmation to login");
                }else{
                    return WebUtility.sendErrorMessage(res, req, DataModel.webResponses.loginError, "Your account has been blocked. Please, contact the administrator for details.")
                }

                
                let role=out[DataModel.tables.admin.userType];
                var tokenKey:string = WebUtility.getTokenKey(req);
                var date = Math.floor(new Date().getTime());
                var jsonStr={
                    ip:WebUtility.getIPAddress(req),
                    date:date,
                    origin:req.get("origin"),
                    adminId : out[myTable.id],
                    role:role
                }

                var cookieStr = CryptoFunctions.aes256Encrypt(JSON.stringify(jsonStr), tokenKey);
                //res.end(JSON.stringify(response));
                return WebUtility.sendSuccess(res, req, {
                    role:role,
                    sessionToken:cookieStr,
                    fullName:out[myTable.firstName]+" "+out[myTable.lastName],
                    firstName:out[myTable.firstName],
                    lastName:out[myTable.lastName],
                    email:out[myTable.email],
                    image:out[myTable.image],
                    phone:out[myTable.phone],
                }, "Logged in as an "+role);
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
        if(!(sessionToken["role"]==DataModel.userTypes.admin) || parseInt(sessionToken["adminId"])==NaN){
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
            role:string,
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
            role:json.role+"_temp",
            actualType:json.role
        }
        let registerToken = CryptoFunctions.aes256Encrypt(JSON.stringify(jsonToken), tokenKey);

        let outputStr={
            email:json.email,
            firstName:json.firstName,
            lastName:json.lastName,
            role:json.role,
            registerToken:registerToken
        }
        WebUtility.sendSuccess(res, req, outputStr, "Successfully Parsed the email Inputs");
    }

    private addAccount(req:express.Request, res:express.Response){
        const { adminId, role}=this.preProcessToken(req, res);
        if(!adminId)
            return;

        let actionType = req.body.role;

        //let table=DataModel.tables.admin;
        let table=DataModel.tables.admin;

        if(role!=DataModel.userTypes.admin)
            return WebUtility.sendErrorMessage(res, req, DataModel.webResponses.accessError, "You dont have a valid access permissions");
        
        let userType:string;
        if(actionType==DataModel.userTypes.sales){            
            userType=DataModel.userTypes.sales
        }else if(actionType==DataModel.userTypes.hr){
            userType=DataModel.userTypes.hr
        }else{
            return WebUtility.sendErrorMessage(res, req, DataModel.webResponses.inputError, "The URL parameter is invalid");
        }

        let firstName=req.body.firstName;
        let lastName=req.body.lastName;
        let email=req.body.email;
        let phone=(req.body.phone?req.body.phone:null);
        let callback=req.body.callbackUrl;
        
        if(!WebUtility.validateEmail(email)
            || !WebUtility.validateStringFields(firstName, 1, 50)
            || !WebUtility.validateStringFields(lastName, 1, 50)){            
            return WebUtility.sendErrorMessage(res, req, DataModel.webResponses.inputError, "Invalid Input");
        }
        let insertJson={
            [table.firstName]:firstName,
            [table.lastName]:lastName,
            [table.email]:email,
            [table.userType]:userType,
            [table.phone]:phone,
            [table.adminCreatedRefID]:adminId,
        };
        MyApp.database.insert(table.table, insertJson).then(result=>{
            //TODO Send the invitation Email to the user
            this.sendInvitationWithCode(req, res, table, email, firstName, lastName, actionType, result, callback);
        }, error=>{
            return WebUtility.sendErrorMessage(res, req, DataModel.webResponses.hrError, "Oops! Something went wrong.");
        }).catch(error=>{
            return WebUtility.sendErrorMessage(res, req, DataModel.webResponses.hrError, "Oops! Something went wrong on our server.");
        })
    }

    private sendInvitationWithCode(req:express.Request, res:express.Response, table:any, email:string, firstName:string, lastName:string, role:string, id:number, callback:string){
        let json={
            email:email,
            firstName:firstName,
            lastName:lastName,
            role:role,
            id:id
        }

        let myActualString=JSON.stringify(json);

        let myEncodedString=CryptoFunctions.aes256Encrypt(myActualString, CryptoFunctions.get256BitKey([email, this.encodingKey]));
        let code = encodeURIComponent(myEncodedString);
        let url = callback+"?code="+code+"&email="+encodeURIComponent(email);

        let body="<H1>Welcome to Therapy On Demand</H1>\
                <h3>Invitation to join Therapy On Demand ("+role+")</h3>\
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
        const { adminId, role}=this.preProcessToken(req, res);
        if(!adminId)
            return;

        let email = req.body.email;
        WebUtility.getUserType(email).then(result=>{
            console.log("role fetched : "+result);
            afterCheckingType(result);
        }, error=>{
            WebUtility.sendErrorMessage(res, req, DataModel.webResponses.inputError, "We cannot find that email ID");
        }).catch(error=>{
            WebUtility.sendErrorMessage(res, req, DataModel.webResponses.adminActionError, "Oops! Something went wrong.");
        })

        function afterCheckingType(actionType:string){
            let table:any=DataModel.tables.admin;
            if(actionType==DataModel.userTypes.sales){
                if(role!=DataModel.userTypes.admin)
                    return WebUtility.sendErrorMessage(res, req, DataModel.webResponses.accessError, "You dont have a valid access level");
                table=DataModel.tables.admin;
            }else if(actionType==DataModel.userTypes.hr){
                table=DataModel.tables.admin;
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
                    let body="<p>We are sorry to say but you are blocked by the admin.</p>\
                        <p>Please contact our support for more details.</p>";
                    EmailActivity.instance.sendEmail(email, "Blocked by Admin | Therapy On Demand", body, function(err, info){
                        if(err)
                            console.log("Error Sending Mail : "+err);
                        else
                            console.log("Mail Sent: "+info);
                    })
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
        const { adminId, role}=this.preProcessToken(req, res);
        if(!adminId)
            return;

        let email = req.body.email;
        WebUtility.getUserType(email).then(result=>{
            afterCheckingType(result);
        }, error=>{
            WebUtility.sendErrorMessage(res, req, DataModel.webResponses.inputError, "We cannot find that email ID");
        }).catch(error=>{
            WebUtility.sendErrorMessage(res, req, DataModel.webResponses.adminActionError, "Oops! Something went wrong.");
        })

        function afterCheckingType(actionType:string){
            let table:any=DataModel.tables.admin;
            if(actionType==DataModel.userTypes.sales){
                if(role!=DataModel.userTypes.admin)
                    return WebUtility.sendErrorMessage(res, req, DataModel.webResponses.accessError, "You dont have a valid access level");
                table=DataModel.tables.admin;
            }else if(actionType==DataModel.userTypes.hr){
                table=DataModel.tables.admin;
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
                    let body="<p>Congratulation! Our Admin has unblocked you.</p>\
                        <p>We are glad to have you back on the platform. Please start your service</p>";
                    EmailActivity.instance.sendEmail(email, "Unblocked by Admin | Therapy On Demand", body, function(err, info){
                        if(err)
                            console.log("Error Sending Mail : "+err);
                        else
                            console.log("Mail Sent: "+info);
                    })
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
            return WebUtility.sendErrorMessage(res, req, DataModel.webResponses.inputError, "The input doesnt contains email ID or the role os User");

        let email=req.body.email;
        WebUtility.getUserType(email).then(result=>{
            afterCheckingType(result);
        }, error=>{
            WebUtility.sendErrorMessage(res, req, DataModel.webResponses.inputError, "We cannot find that email ID");
        }).catch(error=>{
            WebUtility.sendErrorMessage(res, req, DataModel.webResponses.adminActionError, "Oops! Something went wrong.");
        })

        function afterCheckingType(role:string){
            //TODO Check if the email ID exists
            let users:any=DataModel.tables.admin;
            if(role==DataModel.userTypes.admin){
                users=DataModel.tables.admin;
            }else if(role==DataModel.userTypes.hr){
                users=DataModel.tables.admin;
            }else if(role==DataModel.userTypes.sales){
                users=DataModel.tables.admin;
            }else if(role==DataModel.userTypes.provider){
                users=DataModel.tables.providers;
            }else{
                return WebUtility.sendErrorMessage(res, req, DataModel.webResponses.inputError, "role specified was invalid")
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
                let redirectURL=MyApp.appConfig.frontEndUrl+"/"+role+"/set/password?"
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
            WebUtility.getUserType(email).then(result=>{
                callbackAfterType(result);
            }, error=>{
                WebUtility.sendErrorMessage(res, req, DataModel.webResponses.inputError, "We cannot find that email ID");
            }).catch(error=>{
                WebUtility.sendErrorMessage(res, req, DataModel.webResponses.adminActionError, "Oops! Something went wrong.");
            })
        }

        // let users=DataModel.tables.users;
        function callbackAfterType(role:string){
            let table:any=DataModel.tables.admin;
            if(role==DataModel.userTypes.admin){
                table=DataModel.tables.admin;
            }else if(role==DataModel.userTypes.hr){
                table=DataModel.tables.admin;
            }else if(role==DataModel.userTypes.sales){
                table=DataModel.tables.admin;
            }else if(role==DataModel.userTypes.provider){
                table=DataModel.tables.providers;
            }else if(role==DataModel.userTypes.user){
                table=DataModel.tables.users;
            }else{
                return WebUtility.sendErrorMessage(res, req, DataModel.webResponses.inputError, "role specified was invalid")
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