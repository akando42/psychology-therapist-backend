import * as express from 'express';
import {MySqlDatabase} from '../class/class.mysql-database';
import {CryptoFunctions} from '../class/class.crypto-functions'
import {ExpressServer,HTTPMethod} from '../class/class.server';
import {ProvidersUtility} from "./providers-utility-routes";
import { RoutesHandler } from "../class/class.routeshandler";
import { DataModel } from "../datamodels/datamodel";
import { SQLUtility } from "./sql-utility";
import { ImageUtility } from "./image-utility";

export class ProviderRoutes{

    private database:MySqlDatabase;
    private server:ExpressServer;

    constructor(server:ExpressServer, db:MySqlDatabase){
        this.database=db;
        this.server=server;
        var me:ProviderRoutes=this;
        server.setRoute("/provider/signup", (req:express.Request, res:express.Response)=>{
            me.signUp(req, res);
        }, HTTPMethod.POST);
        server.setRoute("/provider/login", (req:express.Request, res:express.Response)=>{
            me.login(req, res);
        }, HTTPMethod.POST);

        server.setRoute("/hr/get/:action", (req:express.Request, res:express.Response)=>{
            me.hrGetAction(req, res);
        }, HTTPMethod.POST);
        server.setRoute("/hr/action/:action", (req:express.Request, res:express.Response)=>{
            me.hrAction(req, res);
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
            me.getClients(req, res);
        }, HTTPMethod.POST);

        server.setRoute("/provider/get/payments", (req:express.Request, res:express.Response)=>{
            me.getClients(req, res);
        }, HTTPMethod.POST);
    }

    private signUp(req:express.Request, res:express.Response){
        var parsedVal  = ProvidersUtility.getParsedToken(req)
        console.log("Parsed Val : "+JSON.stringify(parsedVal));
        if(!parsedVal){
            ProvidersUtility.sendErrorMessage(res, req, DataModel.providerResponse.account_token_error, "The account_token is not valid.");
            return false;
        }
        console.log("Signup with proper account_token");
        var firstname:string = req.body.firstName;
        var lastname:string = req.body.lastName;
        //TODO Need to discuss on qualifications
        var qualifications:string = req.body.qualifications;
        var experience:string = req.body.experience;        
        var email:string = req.body.email;
        var phone:string = ""+req.body.phone;
        var resume:string = ImageUtility.uploadImage(req.body.resume, DataModel.imageTypes.resume, phone, false);;
        var password:string = req.body.password;
        req.body.resume="";
        console.log(JSON.stringify(req.body));

        if(!(ProvidersUtility.validateStringFields(firstname, 2, 50)
            &&ProvidersUtility.validateStringFields(lastname, 2, 50)
            &&ProvidersUtility.validateStringFields(qualifications, 2, -1)
            &&ProvidersUtility.validateStringFields(experience, 3, -1)
            &&ProvidersUtility.validateStringFields(resume, 10, -1)
            &&ProvidersUtility.validateStringFields(email, 6, 255)
            &&ProvidersUtility.validateStringFields(phone, 6, 20)
            &&ProvidersUtility.validateStringFields(password, 8, 20))){
                return ProvidersUtility.sendErrorMessage(res, req, DataModel.providerResponse.inputError, "The input is invalid...");;
            }
        
        // /[0-9]+/.
        console.log("2");
        if(!phone.match(/^[0-9]+$/)
            || !(password.match(/[A-Z]/) && password.match(/[a-z]/) && password.match(/[0-9]/) && password.match(/[^A-Za-z0-9]/))
            || !email.match(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)){
            return ProvidersUtility.sendErrorMessage(res, req, DataModel.providerResponse.inputError, "Invalid input, the parameters were not valid.");;
        }else{
            var providers = DataModel.tables.providers;
            this.database.insert(providers.table, {
                [providers.firstName]:firstname,
                [providers.lastName]:lastname,
                [providers.experience]:experience,
                [providers.qualifications]:qualifications,
                [providers.resume]:resume,
                [providers.email]:email,
                [providers.phone]:phone,
                [providers.password]:password,
                [providers.status]:DataModel.accountStatus.phaseOne,
            }).then(result=>{
                var response={
                    status:200,
                    description:"The provider has been registered successfuly and verification email has been sent."
                };
                RoutesHandler.respond(res, req, response, false, response["description"], response["status"]);
            }, error => {
                ProvidersUtility.sendErrorMessage(res, req, DataModel.providerResponse.registerError, "There is already a provider registered with the same email address.\n"+error);
                return;
            }).catch(error=>{
                ProvidersUtility.sendErrorMessage(res, req, DataModel.providerResponse.serverError, "Server Error");
                return;
            })
        }
        return true;
    }


    private login(req:express.Request, res:express.Response){
        var parsedVal  = ProvidersUtility.getParsedToken(req)
        console.log("parsed Val : "+JSON.stringify(parsedVal));
        if(!parsedVal){
            return ProvidersUtility.sendErrorMessage(res, req, DataModel.providerResponse.account_token_error, "The account_token is not valid");;
        }

        var email:string = String(req.body.email);
        var password:string = String(req.body.password);

        // console.log(email+" : "+password);
        if(!(ProvidersUtility.validateStringFields(email, 6, 255)
            && ProvidersUtility.validateStringFields(password, 8, 20))){
                return ProvidersUtility.sendErrorMessage(res, req, DataModel.providerResponse.inputError, "The input is invalid...");;
            }
            
        console.log("My Email : "+email);
        if(email=="admin@therapy.coach"){
            if(password=="Massage@12345"){
                var date = Math.floor(new Date().getTime());

                var tokenKey:string = ProvidersUtility.getTokenKey(req);
                var jsonStr={
                    ip:ProvidersUtility.getIPAddress(req),
                    date:date,
                    origin:req.get("origin"),
                    providersId : -1,
                    type:"Admin"
                }
                var cookieStr = CryptoFunctions.aes256Encrypt(JSON.stringify(jsonStr), tokenKey);
                return ProvidersUtility.sendSuccess(res, req, {
                    admin:true,
                    message:"Its Admin Login",
                    session_token:cookieStr
                }, "Admin Logged in");
            }else{
                return ProvidersUtility.sendErrorMessage(res, req, DataModel.providerResponse.loginError, "Password is wrong");
            }
        }
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
        this.database.getQueryResults(sql, [email]).then(result=>{
            console.log(JSON.stringify(result));
            if(result.length==0){
                ProvidersUtility.sendErrorMessage(res, req, DataModel.providerResponse.loginError, "We cannot find any User registered with that email ID");
                return false;
            }else{
                var out = result[0];
                if(out[providers.password]!=pass){
                    ProvidersUtility.sendErrorMessage(res, req, DataModel.providerResponse.loginError, "The email ID and password doesnt match");
                    return false;
                }
                var response = {
                    value:{
                        email : out[providers.email],
                        name : out[providers.firstName],
                        verification : out[providers.status]=='Y'?true:false
                    }
                }
                var tokenKey:string = ProvidersUtility.getTokenKey(req);
                var date = Math.floor(new Date().getTime());
                var jsonStr={
                    ip:ProvidersUtility.getIPAddress(req),
                    date:date,
                    origin:req.get("origin"),
                    providersId : out[providers.id],
                    type:"Provider"
                }
                // console.log("MySTR : "+JSON.stringify(jsonStr));
                // console.log("MySTR 2 : "+out[providers.id]);
                var cookieStr = CryptoFunctions.aes256Encrypt(JSON.stringify(jsonStr), tokenKey);
                response["session_token"] = cookieStr;
                //res.end(JSON.stringify(response));
                return ProvidersUtility.sendSuccess(res, req, {
                    admin:false,
                    message:"Its User Login",
                    session_token:cookieStr
                }, "User Logged in");
            }
        }, error=>{
            ProvidersUtility.sendErrorMessage(res, req, DataModel.providerResponse.loginError, error);
            return false;
        }).catch(error=>{
            ProvidersUtility.sendErrorMessage(res, req, DataModel.providerResponse.serverError, "Server Error : "+error);
            return false;
        })
    }

    private hrGetAction(req:express.Request, res:express.Response){
        if(!ProvidersUtility.getParsedToken(req)){
            return ProvidersUtility.sendErrorMessage(res, req, DataModel.providerResponse.account_token_error, "The account_token is not valid");
        }

        let session_token  = ProvidersUtility.getParsedToken(req, req.body.session_token, 30);
        console.log("parsed Val 2: "+JSON.stringify(session_token));
        if(!session_token){
            return ProvidersUtility.sendErrorMessage(res, req, DataModel.providerResponse.session_token_error, "The session_token is not valid");
        }
        if(session_token["type"]!="Admin"){
            return ProvidersUtility.sendErrorMessage(res, req, DataModel.providerResponse.session_token_error, "The session_token is not valid");
        }

        let action = req.params.action;
        let providers = DataModel.tables.providers;
        let providersDocs = DataModel.tables.providersDoc;
        let sql = "SELECT * FROM "+providers.table+" WHERE "+providers.status+" = "
        if(action==="pending"){
            sql+=DataModel.accountStatus.phaseOneDocSubmitted;
        }else if(action==="active"){
            sql+=DataModel.accountStatus.accepted;
        }else if(action==="rejected"){
            sql+=DataModel.accountStatus.phaseOneRejected;
        }else{
            return ProvidersUtility.sendErrorMessage(res, req, DataModel.providerResponse.serverError, "The routing you specified doesnot exists");
        }
        this.database.getQueryResults(sql, []).then(result=>{
            let data={};
            let ids=[-1];
            for(var i in result){
                let out=result[i];
                let json={
                    providerID:out[providers.id],
                    firstName:out[providers.firstName],
                    lastName:out[providers.lastName],
                    email:out[providers.email],
                    phone:out[providers.phone],
                    image:out[providers.image],
                    experience:out[providers.experience],
                    qualifications:out[providers.qualifications],
                    resume:out[providers.resume],
                    status:out[providers.status],
                    docs:[]
                }
                data[out[providers.id]]=json
                ids.push(out[providers.id])
            }
            let sql="SELECT * FROM "+providersDocs.table+" WHERE "+providersDocs.providerID+" IN ("+ids.join(",")+")";
            console.log(sql);
            
            this.database.getQueryResults(sql, []).then(result=>{
                for(var i in result){
                    let out=result[i];
                    data[out[providersDocs.providerID]].docs.push({
                        id:out[providersDocs.id],
                        docTitle:out[providersDocs.docTitle],
                        docContent:out[providersDocs.docContent]
                    })
                }

                return ProvidersUtility.sendSuccess(res, req, data, "Successfully fetched the datas");
            }, error=>{
                return ProvidersUtility.sendErrorMessage(res, req, DataModel.providerResponse.hrError, "Something went wrong : "+error);
            }).catch(error=>{
                return ProvidersUtility.sendErrorMessage(res, req, DataModel.providerResponse.serverError, "Server Error : "+error);
            })
        }, error=>{
            return ProvidersUtility.sendErrorMessage(res, req, DataModel.providerResponse.hrError, "Something went wrong : "+error);
        }).catch(error=>{
            return ProvidersUtility.sendErrorMessage(res, req, DataModel.providerResponse.serverError, "Server Error : "+error);
        })
    }

    private hrAction(req:express.Request, res:express.Response){
        if(!ProvidersUtility.getParsedToken(req)){
            return ProvidersUtility.sendErrorMessage(res, req, DataModel.providerResponse.account_token_error, "The account_token is not valid");
        }

        let session_token  = ProvidersUtility.getParsedToken(req, req.body.session_token, 30);
        console.log("parsed Val : "+JSON.stringify(session_token));
        if(!session_token){
            return ProvidersUtility.sendErrorMessage(res, req, DataModel.providerResponse.session_token_error, "The session_token is not valid");
        }
        if(session_token["type"]!="Admin"){
            return ProvidersUtility.sendErrorMessage(res, req, DataModel.providerResponse.session_token_error, "The session_token is not valid");
        }
        let action=req.params.action;
        let providerId=req.body.providerId;

        let providers = DataModel.tables.providers;
        let status:number;
        if(action==="accept"){
            status=DataModel.accountStatus.accepted;
        }else if(action==="reject"){
            status=DataModel.accountStatus.phaseOneRejected;
        }else{
            return ProvidersUtility.sendErrorMessage(res, req, DataModel.providerResponse.serverError, "The routing you specified doesnot exists");
        }
        
        this.database.update(providers.table,{
            [providers.status]:status
        }, {
            [providers.id]:providerId
        }).then(result=>{
            return ProvidersUtility.sendSuccess(res, req, [], "Successfully accepted/rejected the applications");
        }, error=>{
            return ProvidersUtility.sendErrorMessage(res, req, DataModel.providerResponse.hrActionError, "We couldnt find any provider with that ID");
        }).catch(error=>{
            return ProvidersUtility.sendErrorMessage(res, req, DataModel.providerResponse.serverError, "Server Error : "+error);
        })
    }

    private authorizeProviders(req:express.Request, res:express.Response){
        if(!ProvidersUtility.getParsedToken(req)){
            ProvidersUtility.sendErrorMessage(res, req, DataModel.providerResponse.account_token_error, "The account_token is not valid");
            return undefined;
        }

        let session_token  = ProvidersUtility.getParsedToken(req, req.body.session_token, 30);
        console.log("parsed Val : "+JSON.stringify(session_token));
        if(!session_token){
            ProvidersUtility.sendErrorMessage(res, req, DataModel.providerResponse.session_token_error, "The session_token is not valid");
            return undefined;
        }
        if(session_token["type"]!="Provider"){
            ProvidersUtility.sendErrorMessage(res, req, DataModel.providerResponse.session_token_error, "The session_token is not valid");
            return undefined;
        }
        return session_token;
    }
    private getNotifications(req:express.Request, res:express.Response){
        let session_token=this.authorizeProviders(req, res);
        if(!session_token)
            return;
        let providerId=session_token["providersId"];
        
        let providers=DataModel.tables.providers;
        let providersNotif=DataModel.tables.providerNotifications;

        let sql = "SELECT * \
                FROM "+providersNotif.table+" \
                WHERE "+providersNotif.providerID+"="+providerId+" \
                ORDER BY "+providersNotif.isRead+", "+providersNotif.dateTime+"";

        this.database.getQueryResults(sql,[]).then(result=>{
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
            return ProvidersUtility.sendSuccess(res, req, data, "Successfully got all the notifications");
        }, error=>{
            return ProvidersUtility.sendErrorMessage(res, req, DataModel.providerResponse.hrActionError, "We couldnt find any provider with that ID");
        }).catch(error=>{
            return ProvidersUtility.sendErrorMessage(res, req, DataModel.providerResponse.serverError, "Server Error : "+error);
        })
    }
    private setNotifications(req:express.Request, res:express.Response){
        let session_token=this.authorizeProviders(req, res);
        if(!session_token)
            return;
        let providerId=session_token["providersId"];
        let notifId=parseInt(req.body.notificationID);
        if(notifId==NaN){
            return ProvidersUtility.sendErrorMessage(res, req, DataModel.providerResponse.inputError, "Invaild inputs");
        }
        
        let providers=DataModel.tables.providers;
        let providersNotif=DataModel.tables.providerNotifications;

        this.database.update(providersNotif.table,{
            [providersNotif.isRead]:1
        }, {
            [providersNotif.providerID]:providerId,
            [providersNotif.id]:notifId
        }).then(result=>{
            if(result){
                return ProvidersUtility.sendSuccess(res, req, [], "Successfully set the notification as read");
            }
            return ProvidersUtility.sendErrorMessage(res, req, DataModel.providerResponse.hrActionError, "Something went wrong");
        }, error=>{
            return ProvidersUtility.sendErrorMessage(res, req, DataModel.providerResponse.hrActionError, "We couldnt find any provider with that ID");
        }).catch(error=>{
            return ProvidersUtility.sendErrorMessage(res, req, DataModel.providerResponse.serverError, "Server Error : "+error);
        })

    }

    private uploadDocs(req:express.Request, res:express.Response){
        let session_token=this.authorizeProviders(req, res);
        if(!session_token)
            return;
        let providerId=session_token["providersId"];
        let docs=req.body.docs;
        if(docs==undefined){
            return ProvidersUtility.sendErrorMessage(res, req, DataModel.providerResponse.inputError, "Invaild inputs");
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
                query:"UPDATE "+providers.table+" SET "+providers.status+"="+DataModel.accountStatus.phaseOneDocSubmitted+" \
                    WHERE "+providers.id+"="+providerId,
                values:[],
                result_id:""+i
            }
        queries.push(query);
        console.log(JSON.stringify(queries));
        
        this.database.transaction(queries).then(result=>{
                return ProvidersUtility.sendSuccess(res, req, [], "Successfully uploaded all the docs");
            }, error=>{
                return ProvidersUtility.sendErrorMessage(res, req, DataModel.providerResponse.hrActionError, "Something went wrong : "+error);
            }).catch(error=>{
                return ProvidersUtility.sendErrorMessage(res, req, DataModel.providerResponse.serverError, "Server Error : "+error);
            })
        
    }

    private getClients(req:express.Request, res:express.Response){
        let session_token=this.authorizeProviders(req, res);
        if(!session_token)
            return;
        let providerId=session_token["providersId"];

        let providers=DataModel.tables.providers;
        let users=DataModel.tables.users;
        let sessions=DataModel.tables.sessions;

        let sql="SELECT  "+users.id+" AS userID, MAX("+users.firstName+") AS fisrtName, MAX("+users.lastName+") AS lastName, MAX("+users.image+") AS image, MAX("+sessions.dateTime+") AS lastBookTime, SUM(*) AS totalBookings\
            FROM "+sessions.table+" natural join "+users.table+" natural join "+providers.table+" \
            WHERE "+providers.id+"="+providerId+" \
            ORDER BY "+sessions.dateTime+" DESC \
            GROUP BY "+users.id+" ";
        this.database.getQueryResults(sql, []).then(result=>{
            let data={};
            for(var i in result){
                let out=result[i];
                data[out[users.id]]=out;
            }
            return ProvidersUtility.sendSuccess(res, req, data, "Successfully fetched all the clients");
        }, error=>{
            return ProvidersUtility.sendErrorMessage(res, req, DataModel.providerResponse.hrActionError, "We couldnt find any provider with that ID");
        }).catch(error=>{
            return ProvidersUtility.sendErrorMessage(res, req, DataModel.providerResponse.serverError, "Server Error : "+error);
        })
    }

    private getProfile(req:express.Request, res:express.Response){
        let session_token=this.authorizeProviders(req, res);
        if(!session_token)
            return;
        let providerId=session_token["providersId"];

        let providers=DataModel.tables.providers;

        let sql = "SELECT * \
                FROM "+providers.table+" \
                WHERE "+providers.id+"="+providerId;
        console.log(sql);
        this.database.getQueryResults(sql, []).then(result=>{
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
                status:out[providers.status]
            };
            return ProvidersUtility.sendSuccess(res, req, data, "Successfully fetched all the informations");
        }, error=>{
            return ProvidersUtility.sendErrorMessage(res, req, DataModel.providerResponse.hrActionError, "Something went wrong : "+error);
        }).catch(error=>{
            return ProvidersUtility.sendErrorMessage(res, req, DataModel.providerResponse.serverError, "Server Error : "+error);
        })
    }

    private setProfile(req:express.Request, res:express.Response){
        let session_token=this.authorizeProviders(req, res);
        if(!session_token)
            return;
        let providerId=session_token["providersId"];
        
        let providers=DataModel.tables.providers;
        let json={};
        if(req.body.password){
            //TODO Write segment to update password.
            let passwords = req.body.password;
            if(!ProvidersUtility.validateStringFields(passwords.oldPassword, 8, 50)
                || !ProvidersUtility.validateStringFields(passwords.newPassword, 8, 50)
                || !(passwords.newPassword.match(/[A-Z]/) && passwords.newPassword.match(/[a-z]/) && passwords.newPassword.match(/[0-9]/) && passwords.newPassword.match(/[^A-Za-z0-9]/))) 
                return ProvidersUtility.sendErrorMessage(res, req, DataModel.providerResponse.inputError, "The Password should follow the rules");

            json[providers.password]=passwords.newPassword;
            this.database.update(providers.table, json, {
                [providers.id]:providerId,
                [providers.password]:passwords.oldPassword
            }).then(result=>{
                if(result){
                    return ProvidersUtility.sendSuccess(res, req, [], "Successfully updated the details");
                }else{
                    return ProvidersUtility.sendErrorMessage(res, req, DataModel.providerResponse.profileError, "Cannot find profile with that ID and password");
                }
            }, error=>{
                return ProvidersUtility.sendErrorMessage(res, req, DataModel.providerResponse.profileError, "Something went wrong!! "+error);
            }).catch(error=>{
                return ProvidersUtility.sendErrorMessage(res, req, DataModel.providerResponse.profileError, "Server Error");
            })

            return;
        }

        if(req.body.firstName){
            if(!ProvidersUtility.validateStringFields(req.body.firstName, 1, 50)) 
                return ProvidersUtility.sendErrorMessage(res, req, DataModel.providerResponse.inputError, "Invalid Input");
            json[providers.firstName]=req.body.firstName
        }
        if(req.body.lastName){
            if(!ProvidersUtility.validateStringFields(req.body.lastName, 1, 50)) 
                return ProvidersUtility.sendErrorMessage(res, req, DataModel.providerResponse.inputError, "Invalid Input");
            json[providers.lastName]=req.body.lastName
        }
        if(req.body.experience){
            if(!ProvidersUtility.validateStringFields(req.body.experience, 3, -1)) 
                return ProvidersUtility.sendErrorMessage(res, req, DataModel.providerResponse.inputError, "Invalid Input");
            json[providers.experience]=req.body.experience
        }
        if(req.body.qualifications){
            if(!ProvidersUtility.validateStringFields(req.body.qualifications, 2, -1)) 
                return ProvidersUtility.sendErrorMessage(res, req, DataModel.providerResponse.inputError, "Invalid Input");
            json[providers.qualifications]=req.body.qualifications
        }
        if(req.body.phone){
            if(!ProvidersUtility.validateStringFields(req.body.phone, 1, 10)
                || !req.body.phone.match(/^[0-9]+$/)) 
                return ProvidersUtility.sendErrorMessage(res, req, DataModel.providerResponse.inputError, "Invalid Input");
            json[providers.phone]=req.body.phone
        }
        if(req.body.image){
            //this.decodeBase64Image(req.body.image)
            let imageLoc = ImageUtility.uploadImage(req.body.image, DataModel.imageTypes.profileImage, providerId, false);
            if(!imageLoc)
               return ProvidersUtility.sendErrorMessage(res, req, DataModel.providerResponse.inputError, "The Image you sent is not base64");
            json[providers.image]=imageLoc
        }
        if(req.body.resume){
            //this.decodeBase64Image(req.body.image)
            let imageLoc = ImageUtility.uploadImage(req.body.resume, DataModel.imageTypes.docs, providerId, false);
            if(!imageLoc)
               return ProvidersUtility.sendErrorMessage(res, req, DataModel.providerResponse.inputError, "The Image you sent is not base64");
            json[providers.resume]=imageLoc
        }

        this.database.update(providers.table, json, {
            [providers.id]:providerId
        }).then(result=>{
            if(result){
                return ProvidersUtility.sendSuccess(res, req, [], "Successfully updated the details");
            }else{
                return ProvidersUtility.sendErrorMessage(res, req, DataModel.providerResponse.profileError, "Cannot find profile with that ID");
            }
        }, error=>{
            return ProvidersUtility.sendErrorMessage(res, req, DataModel.providerResponse.profileError, "Something went wrong!! "+error);
        }).catch(error=>{
            return ProvidersUtility.sendErrorMessage(res, req, DataModel.providerResponse.profileError, "Server Error");
        })
    }

    private getBookings(req:express.Request, res:express.Response){
        let session_token=this.authorizeProviders(req, res);
        if(!session_token)
            return;
        let providerId=session_token["providersId"];
        let time = req.params.time;
        let comparator="";

        if(time=="present"){
            comparator=" >= ";
        }else if(time=="past"){
            comparator=" < ";
        }else{
            return ProvidersUtility.sendErrorMessage(res, req, DataModel.providerResponse.inputError, "The path specified is wrong");
        }

        let providers=DataModel.tables.providers;
        let users=DataModel.tables.users;
        let sessions=DataModel.tables.sessions;
        let userAddress=DataModel.tables.userAddress;
        
        let sql = "SELECT  * \
                FROM "+sessions.table+" natural join "+users.table+" natural join "+userAddress.table+" \
                WHERE "+sessions.providerID+"="+providerId+" \
                AND "+sessions.dateTime+comparator+"now()";
        this.database.getQueryResults(sql, []).then(result=>{
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
            return ProvidersUtility.sendSuccess(res, req, data, "Successfully fetched all the session details");
        }, error=>{
            return ProvidersUtility.sendErrorMessage(res, req, DataModel.providerResponse.hrActionError, "We couldnt find any provider with that ID");
        }).catch(error=>{
            return ProvidersUtility.sendErrorMessage(res, req, DataModel.providerResponse.serverError, "Server Error : "+error);
        })
    }
    private getPayments(req:express.Request, res:express.Response){
        let session_token=this.authorizeProviders(req, res);
        if(!session_token)
            return;
        let providerId=session_token["providersId"];

        let providers=DataModel.tables.providers;
        let payments=DataModel.tables.payments;
        let users=DataModel.tables.users;
        let sessions=DataModel.tables.sessions;

        let sql="SELECT * \
                FROM "+payments.table+" natural join "+sessions.table+" natural join "+users.table+" \
                WHERE "+sessions.providerID+"="+providerId+" \
                ORDER BY "+sessions.dateTime+" DESC";
        
        this.database.getQueryResults(sql, []).then(result=>{
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
            return ProvidersUtility.sendSuccess(res, req, data, "Successfully fetched all transaction details");
        }, error=>{
            return ProvidersUtility.sendErrorMessage(res, req, DataModel.providerResponse.hrActionError, "We couldnt find any provider with that ID");
        }).catch(error=>{
            return ProvidersUtility.sendErrorMessage(res, req, DataModel.providerResponse.serverError, "Server Error : "+error);
        })
    }
}