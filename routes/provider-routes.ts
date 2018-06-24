import * as express from 'express';
import {MySqlDatabase} from '../class/class.mysql-database';
import {CryptoFunctions} from '../class/class.crypto-functions'
import {ExpressServer,HTTPMethod} from '../class/class.server';
import { WebUtility } from "./web-utility-routes";
import { RoutesHandler } from "../class/class.routeshandler";
import { DataModel } from "../datamodels/datamodel";
import { SQLUtility } from "./sql-utility";
import { ImageUtility } from "./image-utility";
import { UserRoutes } from "./user-routes";
import { MyDatabase } from "../app";

export class ProviderRoutes{

    private server:ExpressServer;

    constructor(server:ExpressServer, db:MySqlDatabase){
        this.server=server;
        var me:ProviderRoutes=this;
        server.setRoute("/provider/signup", (req:express.Request, res:express.Response)=>{
            me.signUp(req, res);
        }, HTTPMethod.POST);
        server.setRoute("/provider/login", (req:express.Request, res:express.Response)=>{
            me.login(req, res);
        }, HTTPMethod.POST);

        server.setRoute("/provider/get/notification", (req:express.Request, res:express.Response)=>{
            me.getNotifications(req, res);
        }, HTTPMethod.POST);
        server.setRoute("/provider/set/notification", (req:express.Request, res:express.Response)=>{
            me.setNotifications(req, res);
        }, HTTPMethod.POST);
        
        server.setRoute("/provider/get/clients", (req:express.Request, res:express.Response)=>{
            me.getClients(req, res);
        }, HTTPMethod.POST);

        server.setRoute("/provider/upload/docs", (req:express.Request, res:express.Response)=>{
            me.uploadDocs(req, res);
        }, HTTPMethod.POST);

        server.setRoute("/provider/get/profile", (req:express.Request, res:express.Response)=>{
            me.getProfile(req, res);
        }, HTTPMethod.POST);
        server.setRoute("/provider/set/profile", (req:express.Request, res:express.Response)=>{
            me.setProfile(req, res);
        }, HTTPMethod.POST);

        server.setRoute("/provider/get/bookings/:time", (req:express.Request, res:express.Response)=>{
            me.getBookings(req, res);
        }, HTTPMethod.POST);

        server.setRoute("/provider/get/payments", (req:express.Request, res:express.Response)=>{
            me.getPayments(req, res);
        }, HTTPMethod.POST);


        server.setRoute("/provider/session/:action", (req:express.Request, res:express.Response)=>{
            me.performActionOnSessionPost(req, res);
        }, HTTPMethod.POST);
        server.setRoute("/provider/session/:action", (req:express.Request, res:express.Response)=>{
            me.performActionOnSessionGet(req, res);
        }, HTTPMethod.GET);
    }

    private performActionOnSessionPost(req:express.Request, res:express.Response){
        let sessionToken=this.authorizeProviders(req, res);
        if(!sessionToken)
            return;
        let providerId=sessionToken["providersId"];

        let sessionId=parseInt(req.body.sessionId);
        if(!sessionId || sessionId==NaN)
            return WebUtility.sendErrorMessage(res, req, DataModel.webResponses.inputError, "We cant parse the session ID in the request");
        
        let action = req.params.action;

        let sessionStat=0;
        if(action=="accept"){
            sessionStat = DataModel.sessionStatus.accepted
        }else if(action=="reject"){
            sessionStat = DataModel.sessionStatus.rejected
        }else{
            WebUtility.sendErrorMessage(res, req, DataModel.webResponses.inputError, "The URL action end-point is invalid");
        }

        let sessions = DataModel.tables.sessions;
        MyDatabase.database.update(sessions.table, {
            [sessions.sessionStatus]:sessionStat
        },{
            [sessions.id]:sessionId
        }).then(result=>{
            if(result){
                WebUtility.sendSuccess(res, req, [], "Successfully accepted/rejected the session");
            }else{
                WebUtility.sendErrorMessage(res, req, DataModel.webResponses.bookingError, "Oops! We cant find your session in our database.");
            }
        },error=>{
            WebUtility.sendErrorMessage(res, req, DataModel.webResponses.bookingError, "Oops! Something went wrong");
        }).catch(error=>{
            WebUtility.sendErrorMessage(res, req, DataModel.webResponses.bookingError, "Oops! Something went wrong on our server");
        })
    }

    private performActionOnSessionGet(req:express.Request, res:express.Response){
        
        if(!req.query.sessionCode || !req.query.email)
            return WebUtility.sendErrorMessage(res, req, DataModel.webResponses.inputError, "Input Invalid");

        let decryptedSession = CryptoFunctions.aes256Encrypt(req.query.sessionCode, CryptoFunctions.get256BitKey([req.query.email, UserRoutes.randomPatternToVerify]))

        let sessionCode = JSON.parse(decryptedSession);

        if(!sessionCode)
            return WebUtility.sendErrorMessage(res, req, DataModel.webResponses.inputError, "The session code cant be parsed")

        let action = req.params.action;
        let sessionId = parseInt(sessionCode.sessionId);
        if(!sessionId || sessionId==NaN)
            return WebUtility.sendErrorMessage(res, req, DataModel.webResponses.inputError, "The session code is invalid")

        let sessionStat=0;
        if(action=="accept"){
            sessionStat = DataModel.sessionStatus.accepted
        }else if(action=="reject"){
            sessionStat = DataModel.sessionStatus.rejected
        }else{
            WebUtility.sendErrorMessage(res, req, DataModel.webResponses.inputError, "The URL action end-point is invalid");
        }

        let sessions = DataModel.tables.sessions;
        MyDatabase.database.update(sessions.table, {
            [sessions.sessionStatus]:sessionStat
        },{
            [sessions.id]:sessionId
        }).then(result=>{
            if(result){
                WebUtility.sendSuccess(res, req, [], "Successfully accepted/rejected the session");
            }else{
                WebUtility.sendErrorMessage(res, req, DataModel.webResponses.bookingError, "Oops! We cant find your session in our database.");
            }
        },error=>{
            WebUtility.sendErrorMessage(res, req, DataModel.webResponses.bookingError, "Oops! Something went wrong");
        }).catch(error=>{
            WebUtility.sendErrorMessage(res, req, DataModel.webResponses.bookingError, "Oops! Something went wrong on our server");
        })
    }
    
    private signUp(req:express.Request, res:express.Response){
        var parsedVal  = WebUtility.getParsedToken(req)
        console.log("Parsed Val : "+JSON.stringify(parsedVal));
        if(!parsedVal){
            WebUtility.sendErrorMessage(res, req, DataModel.webResponses.account_token_error, "The account token is not valid.");
            return false;
        }
        console.log("Signup with proper accountToken");
        var firstname:string = req.body.firstName;
        var lastname:string = req.body.lastName;
        //TODO Need to discuss on qualifications
        var qualifications:string = req.body.qualifications;
        var experience:string = req.body.experience;        
        var email:string = req.body.email;
        var phone:string = ""+req.body.phone;
        var gender:number = parseInt(req.body.gender);
        var resume:string = ImageUtility.uploadImage(req.body.resume, DataModel.imageTypes.resume, phone, false);;
        var password:string = req.body.password;
        var lattitude = parseFloat(req.body.lattitude);
        var longitude = parseFloat(req.body.longitude);
        req.body.resume="";
        console.log(JSON.stringify(req.body));

        if(!(WebUtility.validateStringFields(firstname, 2, 50)
            &&WebUtility.validateStringFields(lastname, 2, 50)
            &&WebUtility.validateStringFields(qualifications, 2, -1)
            &&WebUtility.validateStringFields(experience, 3, -1)
            &&WebUtility.validateStringFields(resume, 10, -1)
            &&WebUtility.validateStringFields(email, 6, 255)
            &&WebUtility.validateStringFields(phone, 6, 20)
            && gender>=0 && gender<=2
            &&lattitude!=NaN
            &&longitude!=NaN
            &&WebUtility.validateStringFields(password, 8, 20))){
                return WebUtility.sendErrorMessage(res, req, DataModel.webResponses.inputError, "Please check the inputs to the form");;
            }
        
        // /[0-9]+/.
        console.log("2");
        if(!phone.match(/^[0-9]+$/))
            return WebUtility.sendErrorMessage(res, req, DataModel.webResponses.inputError, "Invalid input, Phone number is not valid");
        else if(!(password.match(/[A-Z]/) && password.match(/[a-z]/) && password.match(/[0-9]/) && password.match(/[^A-Za-z0-9]/)))
            return WebUtility.sendErrorMessage(res, req, DataModel.webResponses.inputError, "Invalid input, Password should contain atleast 1 caps, 1 small letter, 1 numeric and 1 symbol");
        else if(!email.match(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)){
            return WebUtility.sendErrorMessage(res, req, DataModel.webResponses.inputError, "Invalid input, the parameters were not valid.");;
        }else{
            var providers = DataModel.tables.providers;
            MyDatabase.database.insert(providers.table, {
                [providers.firstName]:firstname,
                [providers.lastName]:lastname,
                [providers.experience]:experience,
                [providers.qualifications]:qualifications,
                [providers.resume]:resume,
                [providers.email]:email,
                [providers.phone]:phone,
                [providers.gender]:gender,
                [providers.lattitude]:lattitude,
                [providers.longitude]:longitude,
                [providers.password]:password,
                [providers.accountStatus]:DataModel.accountStatus.phaseOne,
            }).then(result=>{
                var response={
                    status:200,
                    description:"The provider has been registered successfuly and verification email has been sent."
                };
                RoutesHandler.respond(res, req, response, false, response["description"], response["status"]);
            }, error => {
                WebUtility.sendErrorMessage(res, req, DataModel.webResponses.registerError, "There is already a provider registered with the same email address.\n"+error);
                return;
            }).catch(error=>{
                WebUtility.sendErrorMessage(res, req, DataModel.webResponses.serverError, "Oops! Something went wrong.");
                return;
            })
        }
        return true;
    }


    private login(req:express.Request, res:express.Response){
        var parsedVal  = WebUtility.getParsedToken(req)
        console.log("parsed Val : "+JSON.stringify(parsedVal));
        if(!parsedVal){
            return WebUtility.sendErrorMessage(res, req, DataModel.webResponses.account_token_error, "The account token is not valid");;
        }

        var email:string = String(req.body.email);
        var password:string = String(req.body.password);

        // console.log(email+" : "+password);
        if(!(WebUtility.validateStringFields(email, 6, 255)
            && WebUtility.validateStringFields(password, 8, 20))){
                return WebUtility.sendErrorMessage(res, req, DataModel.webResponses.inputError, "Please check the input.");;
            }
            
        console.log("My Email : "+email);
        
        //TODO Do the actual login here
        this.verifyUser(email, password, req, res);

        return true;
    }

    private verifyUser(email:string, pass:string, req:express.Request, res:express.Response){
        //console.log(email+" : "+pass);
        let providers = DataModel.tables.providers;
        let sql = SQLUtility.formSelect(["*"],
                    providers.table,
                    [providers.email],
                    ["="],
                    []);
        console.log("My SQL : "+sql);
        MyDatabase.database.getQueryResults(sql, [email]).then(result=>{
            console.log(JSON.stringify(result));
            if(result.length==0){
                WebUtility.sendErrorMessage(res, req, DataModel.webResponses.loginError, "We cannot find any User registered with that email ID");
                return false;
            }else{
                var out = result[0];
                if(out[providers.password]!=pass){
                    WebUtility.sendErrorMessage(res, req, DataModel.webResponses.loginError, "The email ID and password doesnt match");
                    return false;
                }
                var response = {
                    value:{
                        email : out[providers.email],
                        name : out[providers.firstName],
                        verification : out[providers.accountStatus]=='Y'?true:false
                    }
                }
                var tokenKey:string = WebUtility.getTokenKey(req);
                var date = Math.floor(new Date().getTime());
                var jsonStr={
                    ip:WebUtility.getIPAddress(req),
                    date:date,
                    origin:req.get("origin"),
                    providersId : out[providers.id],
                    type:DataModel.userTypes.provider
                }
                // console.log("MySTR : "+JSON.stringify(jsonStr));
                // console.log("MySTR 2 : "+out[providers.id]);
                var cookieStr = CryptoFunctions.aes256Encrypt(JSON.stringify(jsonStr), tokenKey);
                response["sessionToken"] = cookieStr;
                //res.end(JSON.stringify(response));
                return WebUtility.sendSuccess(res, req, {
                    admin:false,
                    message:"Its User Login",
                    sessionToken:cookieStr
                }, "User Logged in");
            }
        }, error=>{
            WebUtility.sendErrorMessage(res, req, DataModel.webResponses.loginError, "Oops! Something went wrong.");
            return false;
        }).catch(error=>{
            WebUtility.sendErrorMessage(res, req, DataModel.webResponses.serverError, "Oops! Something went wrong on server.");
            return false;
        })
    }


    private authorizeProviders(req:express.Request, res:express.Response){
        if(!WebUtility.getParsedToken(req)){
            WebUtility.sendErrorMessage(res, req, DataModel.webResponses.account_token_error, "The account token is not valid");
            return undefined;
        }

        let sessionToken  = WebUtility.getParsedToken(req, req.body.sessionToken, 30);
        console.log("parsed Val : "+JSON.stringify(sessionToken));
        if(!sessionToken){
            WebUtility.sendErrorMessage(res, req, DataModel.webResponses.session_token_error, "The session token is not valid. Please login again");
            return undefined;
        }
        if(sessionToken["type"]!=DataModel.userTypes.provider){
            WebUtility.sendErrorMessage(res, req, DataModel.webResponses.session_token_error, "The session token is not valid. Please login again");
            return undefined;
        }
        return sessionToken;
    }

    private getNotifications(req:express.Request, res:express.Response){
        let sessionToken=this.authorizeProviders(req, res);
        if(!sessionToken)
            return;
        let providerId=sessionToken["providersId"];
        
        let providers=DataModel.tables.providers;
        let providersNotif=DataModel.tables.providerNotifications;

        let sql = "SELECT * \
                FROM "+providersNotif.table+" \
                WHERE "+providersNotif.providerID+"="+providerId+" \
                ORDER BY "+providersNotif.isRead+", "+providersNotif.dateTime+"";

        MyDatabase.database.getQueryResults(sql,[]).then(result=>{
            let data={};
            let unread=0;
            for(var i in result){
                let out=result[i];
                let json={
                    notificationID:out[providersNotif.id],
                    content:out[providersNotif.content],
                    dateTime:out[providersNotif.dateTime],
                    isRead:out[providersNotif.isRead],
                }
                data[out[providersNotif.id]]=json
                if(parseInt(out[providersNotif.isRead])!=1)
                    unread++
            }
            data["unreadCount"]=unread;
            return WebUtility.sendSuccess(res, req, data, "Successfully got all the notifications");
        }, error=>{
            return WebUtility.sendErrorMessage(res, req, DataModel.webResponses.hrError, "Oops! Something went wrong.");
        }).catch(error=>{
            return WebUtility.sendErrorMessage(res, req, DataModel.webResponses.serverError, "Oops! Something went wrong on server.");
        })
    }
    private setNotifications(req:express.Request, res:express.Response){
        let sessionToken=this.authorizeProviders(req, res);
        if(!sessionToken)
            return;
        let providerId=sessionToken["providersId"];
        let notifId=parseInt(req.body.notificationID);
        if(notifId==NaN){
            return WebUtility.sendErrorMessage(res, req, DataModel.webResponses.inputError, "Please check your inputs");
        }
        
        let providers=DataModel.tables.providers;
        let providersNotif=DataModel.tables.providerNotifications;

        MyDatabase.database.update(providersNotif.table,{
            [providersNotif.isRead]:1
        }, {
            [providersNotif.providerID]:providerId,
            [providersNotif.id]:notifId
        }).then(result=>{
            if(result){
                return WebUtility.sendSuccess(res, req, [], "Successfully set the notification as read");
            }
            return WebUtility.sendErrorMessage(res, req, DataModel.webResponses.hrActionError, "Oops! Something went wrong.");
        }, error=>{
            return WebUtility.sendErrorMessage(res, req, DataModel.webResponses.hrError, "Oops! Something went wrong.");
        }).catch(error=>{
            return WebUtility.sendErrorMessage(res, req, DataModel.webResponses.serverError, "Oops! Something went wrong on srver.");
        })

    }

    private uploadDocs(req:express.Request, res:express.Response){
        let sessionToken=this.authorizeProviders(req, res);
        if(!sessionToken)
            return;
        let providerId=sessionToken["providersId"];
        let docs=req.body.docs;
        if(docs==undefined){
            return WebUtility.sendErrorMessage(res, req, DataModel.webResponses.inputError, "Invaild inputs");
        }

        let providers=DataModel.tables.providers;
        let providersDoc=DataModel.tables.providersDoc;
        let queries=[];
        for(var i in docs){
            let doc=docs[i];
            let imgLoc = ImageUtility.uploadImage(doc.docContent, DataModel.imageTypes.docs, providerId, false);
            let query={
                query:"INSERT INTO "+providersDoc.table+"("+providersDoc.docTitle+", "+providersDoc.docContent+", "+providersDoc.providerID+") \
                        VALUES ('"+doc.docTitle+"', '"+imgLoc+"', "+providerId+")",
                values:[],
                result_id:""+i
            }
            queries.push(query);
        }
        let query={
                query:"UPDATE "+providers.table+" SET "+providers.accountStatus+"="+DataModel.accountStatus.phaseOneDocSubmitted+" \
                    WHERE "+providers.id+"="+providerId,
                values:[],
                result_id:""+i
            }
        queries.push(query);
        console.log(JSON.stringify(queries));
        
        MyDatabase.database.transaction(queries).then(result=>{
                return WebUtility.sendSuccess(res, req, [], "Successfully uploaded all the docs");
            }, error=>{
                return WebUtility.sendErrorMessage(res, req, DataModel.webResponses.hrActionError, "Oops! Something went wrong.");
            }).catch(error=>{
                return WebUtility.sendErrorMessage(res, req, DataModel.webResponses.serverError, "Oops! Something went wrong on server.");
            })
        
    }

    private getClients(req:express.Request, res:express.Response){
        let sessionToken=this.authorizeProviders(req, res);
        if(!sessionToken)
            return;
        let providerId=sessionToken["providersId"];

        let providers=DataModel.tables.providers;
        let users=DataModel.tables.users;
        let sessions=DataModel.tables.sessions;

        let sql="SELECT  "+users.id+" AS userID, MAX("+users.firstName+") AS fisrtName, MAX("+users.lastName+") AS lastName, MAX("+users.image+") AS image, MAX("+sessions.dateTime+") AS lastBookTime, COUNT(*) AS totalBookings\
            FROM "+sessions.table+" natural join "+users.table+" natural join "+providers.table+" \
            WHERE "+providers.id+"="+providerId+" \
            GROUP BY "+users.id+" ";
        console.log(sql);
        
        MyDatabase.database.getQueryResults(sql, []).then(result=>{
            let data={};
            for(var i in result){
                let out=result[i];
                data[out[users.id]]=out;
            }
            return WebUtility.sendSuccess(res, req, data, "Successfully fetched all the clients");
        }, error=>{
            return WebUtility.sendErrorMessage(res, req, DataModel.webResponses.hrActionError, "Oops! Something went wrong.");
        }).catch(error=>{
            return WebUtility.sendErrorMessage(res, req, DataModel.webResponses.serverError, "Oops! Something went wrong on server.");
        })
    }

    private getProfile(req:express.Request, res:express.Response){
        let sessionToken=this.authorizeProviders(req, res);
        if(!sessionToken)
            return;
        let providerId=sessionToken["providersId"];

        let providers=DataModel.tables.providers;

        let sql = "SELECT * \
                FROM "+providers.table+" \
                WHERE "+providers.id+"="+providerId;
        console.log(sql);
        MyDatabase.database.getQueryResults(sql, []).then(result=>{
            let out=result[0];
            let data={
                firstName:out[providers.firstName],
                lastName:out[providers.lastName],
                email:out[providers.email],
                phone:out[providers.phone],
                image:out[providers.image],
                experience:out[providers.experience],
                qualifications:out[providers.qualifications],
                resume:out[providers.resume],
                status:out[providers.accountStatus]
            };
            return WebUtility.sendSuccess(res, req, data, "Successfully fetched all the informations");
        }, error=>{
            return WebUtility.sendErrorMessage(res, req, DataModel.webResponses.hrActionError, "Oops! Something went wrong.");
        }).catch(error=>{
            return WebUtility.sendErrorMessage(res, req, DataModel.webResponses.serverError, "Oops! Something went wrong on server.");
        })
    }

    private setProfile(req:express.Request, res:express.Response){
        let sessionToken=this.authorizeProviders(req, res);
        if(!sessionToken)
            return;
        let providerId=sessionToken["providersId"];
        
        let providers=DataModel.tables.providers;
        let json={};
        if(req.body.password){
            //TODO Write segment to update password.
            let passwords = req.body.password;
            if(!WebUtility.validateStringFields(passwords.oldPassword, 8, 50)
                || !WebUtility.validateStringFields(passwords.newPassword, 8, 50)
                || !(passwords.newPassword.match(/[A-Z]/) && passwords.newPassword.match(/[a-z]/) && passwords.newPassword.match(/[0-9]/) && passwords.newPassword.match(/[^A-Za-z0-9]/))) 
                return WebUtility.sendErrorMessage(res, req, DataModel.webResponses.inputError, "The Password should conatain atleast 1 caps, 1 small letter, 1 number and 1 alphanumeric ");

            json[providers.password]=passwords.newPassword;
            MyDatabase.database.update(providers.table, json, {
                [providers.id]:providerId,
                [providers.password]:passwords.oldPassword
            }).then(result=>{
                if(result){
                    return WebUtility.sendSuccess(res, req, [], "Successfully updated the details");
                }else{
                    return WebUtility.sendErrorMessage(res, req, DataModel.webResponses.profileError, "Cannot find profile with that ID and password");
                }
            }, error=>{
                return WebUtility.sendErrorMessage(res, req, DataModel.webResponses.profileError, "Oops! Something went wrong.");
            }).catch(error=>{
                return WebUtility.sendErrorMessage(res, req, DataModel.webResponses.profileError, "Oops! Something went wrong on server.");
            })

            return;
        }

        if(req.body.firstName){
            if(!WebUtility.validateStringFields(req.body.firstName, 1, 50)) 
                return WebUtility.sendErrorMessage(res, req, DataModel.webResponses.inputError, "Invalid First name");
            json[providers.firstName]=req.body.firstName
        }
        if(req.body.lastName){
            if(!WebUtility.validateStringFields(req.body.lastName, 1, 50)) 
                return WebUtility.sendErrorMessage(res, req, DataModel.webResponses.inputError, "Invalid Last name");
            json[providers.lastName]=req.body.lastName
        }
        if(req.body.experience){
            if(!WebUtility.validateStringFields(req.body.experience, 3, -1)) 
                return WebUtility.sendErrorMessage(res, req, DataModel.webResponses.inputError, "Invalid experience");
            json[providers.experience]=req.body.experience
        }
        if(req.body.qualifications){
            if(!WebUtility.validateStringFields(req.body.qualifications, 2, -1)) 
                return WebUtility.sendErrorMessage(res, req, DataModel.webResponses.inputError, "Invalid Qualifications");
            json[providers.qualifications]=req.body.qualifications
        }
        if(req.body.phone){
            if(!WebUtility.validateStringFields(req.body.phone, 1, 10)
                || !req.body.phone.match(/^[0-9]+$/)) 
                return WebUtility.sendErrorMessage(res, req, DataModel.webResponses.inputError, "Invalid phone number");
            json[providers.phone]=req.body.phone
        }
        if(req.body.image){
            //this.decodeBase64Image(req.body.image)
            let imageLoc = ImageUtility.uploadImage(req.body.image, DataModel.imageTypes.profileImage, providerId, false);
            if(!imageLoc)
               return WebUtility.sendErrorMessage(res, req, DataModel.webResponses.inputError, "The Image format is invalid");
            json[providers.image]=imageLoc
        }
        if(req.body.resume){
            //this.decodeBase64Image(req.body.image)
            let imageLoc = ImageUtility.uploadImage(req.body.resume, DataModel.imageTypes.docs, providerId, false);
            if(!imageLoc)
               return WebUtility.sendErrorMessage(res, req, DataModel.webResponses.inputError, "The Image format is invalid");
            json[providers.resume]=imageLoc
        }

        MyDatabase.database.update(providers.table, json, {
            [providers.id]:providerId
        }).then(result=>{
            if(result){
                return WebUtility.sendSuccess(res, req, [], "Successfully updated the details");
            }else{
                return WebUtility.sendErrorMessage(res, req, DataModel.webResponses.profileError, "Cannot find profile with that ID");
            }
        }, error=>{
            return WebUtility.sendErrorMessage(res, req, DataModel.webResponses.profileError, "Oops! Something went wrong.");
        }).catch(error=>{
            return WebUtility.sendErrorMessage(res, req, DataModel.webResponses.profileError, "Oops! Something went wrong on server.");
        })
    }

    private getBookings(req:express.Request, res:express.Response){
        let sessionToken=this.authorizeProviders(req, res);
        if(!sessionToken)
            return;
        let providerId=sessionToken["providersId"];
        let time = req.params.time;
        let comparator="";

        if(time=="present"){
            comparator=" >= ";
        }else if(time=="past"){
            comparator=" < ";
        }else{
            return WebUtility.sendErrorMessage(res, req, DataModel.webResponses.inputError, "The path specified is wrong");
        }

        let providers=DataModel.tables.providers;
        let users=DataModel.tables.users;
        let sessions=DataModel.tables.sessions;
        let userAddress=DataModel.tables.userAddress;
        
        let sql = "SELECT  * \
                FROM "+sessions.table+" natural join "+users.table+" natural join "+userAddress.table+" \
                WHERE "+sessions.providerID+"="+providerId+" \
                AND "+sessions.dateTime+comparator+"now()";
        MyDatabase.database.getQueryResults(sql, []).then(result=>{
            let data={};
            for(var i in result){
                let out=result[i];
                let json={
                    name:out[users.firstName]+" "+out[users.lastName],
                    phone:out[users.phone],
                    email:out[users.email],
                    gender:out[users.gender],

                    addressLatt:out[userAddress.latitude],
                    addressLong:out[userAddress.longitude],
                    address:out[userAddress.address],
                    parkingInfo:out[userAddress.parkingInfo],
                    
                    sessionID:out[sessions.id],
                    massageType:out[sessions.massageType],
                    massageLength:out[sessions.massageLength],
                    dateTime:out[sessions.dateTime],
                    equipements:out[sessions.equipements],
                    pets:out[sessions.pets],
                    medicalInformation:out[sessions.medicalInformation]
                }
                data[out[sessions.id]]=json;
            }
            return WebUtility.sendSuccess(res, req, data, "Successfully fetched all the session details");
        }, error=>{
            return WebUtility.sendErrorMessage(res, req, DataModel.webResponses.hrError, "Oops! Something went wrong.");
        }).catch(error=>{
            return WebUtility.sendErrorMessage(res, req, DataModel.webResponses.serverError, "Oops! Something went wrong on server.");
        })
    }
    private getPayments(req:express.Request, res:express.Response){
        let sessionToken=this.authorizeProviders(req, res);
        if(!sessionToken)
            return;
        let providerId=sessionToken["providersId"];

        let providers=DataModel.tables.providers;
        let payments=DataModel.tables.payments;
        let users=DataModel.tables.users;
        let sessions=DataModel.tables.sessions;

        let sql="SELECT * \
                FROM "+payments.table+" natural join "+sessions.table+" natural join "+users.table+" \
                WHERE "+sessions.providerID+"="+providerId+" \
                ORDER BY "+sessions.dateTime+" DESC";
        
        MyDatabase.database.getQueryResults(sql, []).then(result=>{
            let data={};
            for(var i in result){
                let out = result[i];
                let json={
                    paymentID:out[payments.id],
                    clientName:out[users.firstName]+" "+out[users.lastName],
                    dateTime:out[sessions.dateTime],
                    amount:out[payments.amount],
                    transactionId:out[payments.transactionId],
                }
                data[out[payments.id]]=json;
            }
            return WebUtility.sendSuccess(res, req, data, "Successfully fetched all transaction details");
        }, error=>{
            return WebUtility.sendErrorMessage(res, req, DataModel.webResponses.hrError, "Oops! Something went wrong.");
        }).catch(error=>{
            return WebUtility.sendErrorMessage(res, req, DataModel.webResponses.serverError, "Oops! Something went wrong on server.");
        })
    }
}