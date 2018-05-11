import * as express from 'express';
import {MySqlDatabase} from '../class/class.mysql-database';
import {CryptoFunctions} from '../class/class.crypto-functions'
import {ExpressServer,HTTPMethod} from '../class/class.server';
import { UsersUtility } from "./users-utility-routes";
import { DataModel } from "../datamodels/datamodel";
import { SQLUtility } from "./sql-utility";

var nodemailer = require('nodemailer');
var appConfig=require('../config/app.json');

export class UserRoutes{
    private database:MySqlDatabase;
    private server:ExpressServer;
    private transporter;

    private randomPatternToVerify="!47218fah8y5&^%^$76T21358GUfutT6%$&68327Q5";
    

    constructor(server:ExpressServer, db:MySqlDatabase){
        this.server=server;
        this.database=db;  
        var me=this;

        this.transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        // service: 'gmail',
        auth: {
            user: 'rahul.test1908@gmail.com',
            pass: 'rahulkatest'
        }
        });

        server.setRoute("/user/login", (req:express.Request, res:express.Response)=>{
            me.loginUser(req, res);
        }, HTTPMethod.POST);
        server.setRoute("/user/register", (req:express.Request, res:express.Response)=>{
            me.registerUser(req, res);
        }, HTTPMethod.POST);
        server.setRoute("/user/verify", (req:express.Request, res:express.Response)=>{
            me.verifyEmail(req, res);
        }, HTTPMethod.GET);

        server.setRoute("/user/profile/update", (req:express.Request, res:express.Response)=>{
            me.updateProfile(req, res);
        }, HTTPMethod.POST);
        server.setRoute("/user/profile/get", (req:express.Request, res:express.Response)=>{
            me.getProfile(req, res);
        }, HTTPMethod.POST);


        server.setRoute("/user/address/add", (req:express.Request, res:express.Response)=>{
            me.addAddress(req, res);
        }, HTTPMethod.POST);
        server.setRoute("/user/address/get", (req:express.Request, res:express.Response)=>{
            me.getAddresses(req, res);
        }, HTTPMethod.POST);
        server.setRoute("/user/address/delete", (req:express.Request, res:express.Response)=>{
            me.deleteAddress(req, res);
        }, HTTPMethod.POST);
        

        server.setRoute("/user/payments/add", (req:express.Request, res:express.Response)=>{
            me.addPayment(req, res);
        }, HTTPMethod.POST);
        server.setRoute("/user/payments/complete", (req:express.Request, res:express.Response)=>{
            me.completePayment(req, res);
        }, HTTPMethod.POST);
        server.setRoute("/user/payments/get", (req:express.Request, res:express.Response)=>{
            me.getPaymentsOrSessions(req, res, false);
        }, HTTPMethod.POST);


        server.setRoute("/user/session/add", (req:express.Request, res:express.Response)=>{
            me.addSession(req, res);
        }, HTTPMethod.POST);
        server.setRoute("/user/session/get", (req:express.Request, res:express.Response)=>{
            me.getPaymentsOrSessions(req, res, true);
        }, HTTPMethod.POST);

    }

    private loginUser(req:express.Request, res:express.Response){
        if(!UsersUtility.getParsedToken(req)){
            return UsersUtility.sendErrorMessage(res, DataModel.responseStatus.tokenError, "The token is invalid")
        }

        let email = req.body.email;
        let password = req.body.password;

        if(!UsersUtility.validateStringFields(email, 1, 155)
            || !UsersUtility.validateStringFields(password, 8, 50)
            || !(password.match(/[A-Z]/) && password.match(/[a-z]/) && password.match(/[0-9]/) && password.match(/[^A-Za-z0-9]/))
            || !email.match(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)){
                return UsersUtility.sendErrorMessage(res, DataModel.responseStatus.inputError, "Invalid Input");
            }
        
        // UsersUtility.sendSuccess(res, email, "Something");
        let users = DataModel.tables.users;
        var sql = SQLUtility.formSelect(["*"],
                users.table,
                [users.email],
                ["="],
                []);
        this.database.getQueryResults(sql, [email]).then(result=>{
            if(result.length==0){
                return UsersUtility.sendErrorMessage(res, DataModel.responseStatus.loginError, "Email ID is not registered");
            }
            var out = result[0];
            if(out[users.password] == password){
                if(out[users.status]==DataModel.accountStatus.waiting){
                    return UsersUtility.sendErrorMessage(res, DataModel.responseStatus.loginError, "The Email is not verified");
                }
                let json={
                    id:out[users.id],
                    fName:out[users.firstName],
                    lName:out[users.lastName],
                    phone:out[users.phone],
                    gender:out[users.gender],
                    image:out[users.image],
                    email:out[users.email]
                }
                return UsersUtility.sendSuccess(res, json, "Successfully logged in");
            }else{
                return UsersUtility.sendErrorMessage(res, DataModel.responseStatus.loginError, "The username and password dint match");
            }
        }, error=>{
            UsersUtility.sendErrorMessage(res, DataModel.responseStatus.loginError, error);
        }).catch(error=>{
            UsersUtility.sendErrorMessage(res, DataModel.responseStatus.loginError, error);
        })
        
    }

    private registerUser(req:express.Request, res:express.Response){
        if(!UsersUtility.getParsedToken(req)){
            return UsersUtility.sendErrorMessage(res, DataModel.responseStatus.tokenError, "The token is invalid")
        }

        let fname = req.body.firstName;
        let lname = req.body.lastName;
        let email = req.body.email;
        let password = req.body.password;
        let gender = req.body.gender;
        let phone = req.body.phone;

        if(!UsersUtility.validateStringFields(email, 1, 155)
            || !UsersUtility.validateStringFields(password, 8, 50)
            || !UsersUtility.validateStringFields(fname, 1, 50)
            || !UsersUtility.validateStringFields(lname, 1, 50)
            || !UsersUtility.validateStringFields(phone, 1, 10)
            || !UsersUtility.validateStringFields(gender, 4, 10)
            || !(gender=="Male" || gender=="Female" || gender=="Others")
            || !(password.match(/[A-Z]/) && password.match(/[a-z]/) && password.match(/[0-9]/) && password.match(/[^A-Za-z0-9]/))
            || !email.match(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
            || !phone.match(/^[0-9]+$/)){
                return UsersUtility.sendErrorMessage(res, DataModel.responseStatus.inputError, "Invalid Input");
            }
        
        let users = DataModel.tables.users;
        
        let debug=false;
        if(req.body.debug){
            debug=true;
        }

        //TODO Change accepted to waiting
        this.database.insert(users.table,{
            [users.firstName]:fname,
            [users.lastName]:lname,
            [users.email]:email,
            [users.password]:password,
            [users.phone]:phone,
            [users.gender]:gender,
            [users.status]:debug?DataModel.accountStatus.accepted:DataModel.accountStatus.waiting,
        }).then(result=>{
            this.sendEmailConfirmation(email, fname, lname, res);
        }, error=>{
            if(debug)
                return this.sendEmailConfirmation(email, fname, lname, res);
            return UsersUtility.sendErrorMessage(res, DataModel.responseStatus.registerError, error);
        }).catch(error=>{
            return UsersUtility.sendErrorMessage(res, DataModel.responseStatus.registerError, "Server Error");
        })
        
    }
    private sendEmailConfirmation(email:string, fname:String, lname:String, res:express.Response){
        let link=appConfig.baseURL+"user/verify?key=";

        let encKey = CryptoFunctions.get256BitKey(["To", "Verify", "Email", this.randomPatternToVerify])
        //console.log("Token : "+token);
        let json={
            email:email,
            fname:fname,
            lname:lname
        };
        console.log("JSON : "+JSON.stringify(json));
        let key = encodeURIComponent(CryptoFunctions.aes256Encrypt(JSON.stringify(json), encKey));
        console.log("Key : "+key);

        let myStr="<H2>Verify Your Email Address</H2><H5>Massage on Demand</H5></br><H4>Hello "+fname+" "+lname+",</H4><p>Thanks for registering with us</p><p>Please Click <a href='"+link+key+"'>here</a> to verify you email Address</p>";
        var mailOptions = {
            from: 'rahul.test1908@gmail.com',
            to: email,
            subject: 'Verification Mail | Massage On Demand',
            html: myStr
        };
        this.transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
                return UsersUtility.sendErrorMessage(res, DataModel.responseStatus.registerError, "Server Error : "+error);
            } else {
                console.log('Email sent: ' + info.response);
                return UsersUtility.sendSuccess(res,[], "Successfully registered!! We have sent you a cofirmation mail!");
            }
        });

    }
    private verifyEmail(req:express.Request, res:express.Response){
        console.log("Reached here");
        let encKey = CryptoFunctions.get256BitKey(["To", "Verify", "Email", this.randomPatternToVerify])
        console.log("Encryption Key : "+encKey);
        let keyVal=req.query.key;

        if(!keyVal){
            return UsersUtility.sendErrorMessage(res, DataModel.responseStatus.registerError, "Sorry Couldn't verify your email");
        }
        let actVal = CryptoFunctions.aes256Decrypt(keyVal, encKey);
        console.log("actual Value : "+actVal);
        let json:{email:string, fname:string, lname:string} = JSON.parse(actVal)
        if(!json || !json.email || !json.fname || !json.lname)
            return UsersUtility.sendErrorMessage(res, DataModel.responseStatus.registerError, "Sorry Couldn't verify your email");
        

        var users=DataModel.tables.users;
        this.database.update(users.table, {
            [users.status]:DataModel.accountStatus.accepted
        }, {
            [users.email]:json.email,
            [users.firstName]:json.fname,
            [users.lastName]:json.lname
        }).then(result=>{
            if(result){
                return UsersUtility.sendSuccess(res, [], "Congratulations!! You email ID is verified. Please go to the login screen");
            }else{
                return UsersUtility.sendErrorMessage(res, DataModel.responseStatus.registerError, "The email Id in the token doesnt exists");
            }
        }, error=>{
            return UsersUtility.sendErrorMessage(res, DataModel.responseStatus.registerError, "Something went Wrong!! "+error);
        }).catch(error=>{
            return UsersUtility.sendErrorMessage(res, DataModel.responseStatus.registerError, "Server Error");
        })
    }


    private decodeBase64Image(dataString) {
        var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
        let response = {};
        if (matches.length !== 3) {
            return undefined;
        }
        response["type"] = matches[1];
        response["data"] = new Buffer(matches[2], 'base64');

        return response;
    }

    private updateProfile(req:express.Request, res:express.Response){
        if(!UsersUtility.getParsedToken(req)){
            return UsersUtility.sendErrorMessage(res, DataModel.responseStatus.tokenError, "The token is invalid")
        }

        if(!req.body.id)
            return UsersUtility.sendErrorMessage(res, DataModel.responseStatus.idError, "The ID doesn't exists in the query");
        let id = parseInt(req.body.id);
        if(id === NaN)
            return UsersUtility.sendErrorMessage(res, DataModel.responseStatus.inputError, "Invalid ID");

        let users=DataModel.tables.users;
        let json={};
        
        if(req.body.password){
            //TODO Write segment to update password.
            let passwords = req.body.password;
            if(!UsersUtility.validateStringFields(passwords.oldPassword, 8, 50)
                || !UsersUtility.validateStringFields(passwords.newPassword, 8, 50)
                || !(passwords.newPassword.match(/[A-Z]/) && passwords.newPassword.match(/[a-z]/) && passwords.newPassword.match(/[0-9]/) && passwords.newPassword.match(/[^A-Za-z0-9]/))) 
                return UsersUtility.sendErrorMessage(res, DataModel.responseStatus.inputError, "The Password should follow the rules");
            this.database.update(users.table, json, {
                [users.id]:id,
                [users.password]:passwords.oldPassword
            }).then(result=>{
                if(result){
                    return UsersUtility.sendSuccess(res, [], "Successfully updated the details");
                }else{
                    return UsersUtility.sendErrorMessage(res, DataModel.responseStatus.profileError, "Cannot find profile with that ID and password");
                }
            }, error=>{
                return UsersUtility.sendErrorMessage(res, DataModel.responseStatus.profileError, "Something went wrong!! "+error);
            }).catch(error=>{
                return UsersUtility.sendErrorMessage(res, DataModel.responseStatus.profileError, "Server Error");
            })

            return;
        }

        if(req.body.firstName){
            if(!UsersUtility.validateStringFields(req.body.firstName, 1, 50)) 
                return UsersUtility.sendErrorMessage(res, DataModel.responseStatus.inputError, "Invalid Input");
            json[users.firstName]=req.body.firstName
        }
        if(req.body.lastName){
            if(!UsersUtility.validateStringFields(req.body.lastName, 1, 50)) 
                return UsersUtility.sendErrorMessage(res, DataModel.responseStatus.inputError, "Invalid Input");
            json[users.lastName]=req.body.lastName
        }
        if(req.body.phone){
            if(!UsersUtility.validateStringFields(req.body.phone, 1, 10)
                || !req.body.phone.match(/^[0-9]+$/)) 
                return UsersUtility.sendErrorMessage(res, DataModel.responseStatus.inputError, "Invalid Input");
            json[users.phone]=req.body.phone
        }
        if(req.body.image){
            if(!this.decodeBase64Image(req.body.image))
                return UsersUtility.sendErrorMessage(res, DataModel.responseStatus.inputError, "The Image you sent is not base64");
            json[users.image]=req.body.image
        }

        this.database.update(users.table, json, {
            [users.id]:id
        }).then(result=>{
            if(result){
                return UsersUtility.sendSuccess(res, [], "Successfully updated the details");
            }else{
                return UsersUtility.sendErrorMessage(res, DataModel.responseStatus.profileError, "Cannot find profile with that ID");
            }
        }, error=>{
            return UsersUtility.sendErrorMessage(res, DataModel.responseStatus.profileError, "Something went wrong!! "+error);
        }).catch(error=>{
            return UsersUtility.sendErrorMessage(res, DataModel.responseStatus.profileError, "Server Error");
        })
    }

    private getProfile(req:express.Request, res:express.Response){
        if(!UsersUtility.getParsedToken(req)){
            return UsersUtility.sendErrorMessage(res, DataModel.responseStatus.tokenError, "The token is invalid")
        }

        if(!req.body.id)
            return UsersUtility.sendErrorMessage(res, DataModel.responseStatus.idError, "The ID doesn't exists in the query");
        let id = parseInt(req.body.id);
        if(id === NaN)
            return UsersUtility.sendErrorMessage(res, DataModel.responseStatus.inputError, "Invalid ID");

        let users=DataModel.tables.users;

        let sql = SQLUtility.formSelect(["*"]
            ,users.table
            ,[users.id]
            ,["="]
            ,[]);
        
        this.database.getQueryResults(sql, [id]).then(result=>{
            if(result.length>0){
                let out=result[0];
                let json={
                    firstName:out[users.firstName],
                    lastName:out[users.lastName],
                    phone:out[users.phone],
                    gender:out[users.gender],
                    email:out[users.email],
                    image:out[users.image]
                }
                return UsersUtility.sendSuccess(res, json, "Retrieved about the profile");
            }else{
                return UsersUtility.sendErrorMessage(res, DataModel.responseStatus.profileError, "Cant find any details for that ID");
            }
        }, error=>{

        }).catch(error=>{

        })
    }


    private addAddress(req:express.Request, res:express.Response){
        if(!UsersUtility.getParsedToken(req)){
            return UsersUtility.sendErrorMessage(res, DataModel.responseStatus.tokenError, "The token is invalid")
        }

        if(!req.body.id)
            return UsersUtility.sendErrorMessage(res, DataModel.responseStatus.idError, "The ID doesn't exists in the query");
        let id = parseInt(req.body.id);
        if(id === NaN)
            return UsersUtility.sendErrorMessage(res, DataModel.responseStatus.inputError, "Invalid ID");

        let name=req.body.name;
        let lattitude = parseFloat(req.body.lattitude);
        let longitude = parseFloat(req.body.longitude);
        let address = req.body.address;
        let parkLat = parseFloat(req.body.parkLat);
        let parkLong = parseFloat(req.body.parkLong);
        let parkAddress = req.body.parkAddress;

        if(!UsersUtility.validateStringFields(name, 1, 50)
            || lattitude==NaN
            || longitude==NaN
            || parkLat==NaN
            || parkLong==NaN)
            return UsersUtility.sendErrorMessage(res, DataModel.responseStatus.inputError, "Invalid Input");
        
        let addressTab = DataModel.tables.userAddress;

        this.database.insert(addressTab.table,{
            [addressTab.userID]:id,
            [addressTab.name]:name,
            [addressTab.latitude]:lattitude,
            [addressTab.longitude]:longitude,
            [addressTab.address]:address,
            [addressTab.parkingLatitude]:parkLat,
            [addressTab.parkingLongitude]:parkLong,
            [addressTab.parkingAddress]:parkAddress,
        }).then(result=>{
            let json={
                addressId:result
            };
            UsersUtility.sendSuccess(res, json, "Successfully Added the addresses");
        }, error=>{
            return UsersUtility.sendErrorMessage(res, DataModel.responseStatus.addressError, "Something went wrong!! "+error);
        }).catch(error=>{
            return UsersUtility.sendErrorMessage(res, DataModel.responseStatus.addressError, "Server Error");
        })

    }

    private getAddresses(req:express.Request, res:express.Response){
        if(!UsersUtility.getParsedToken(req)){
            return UsersUtility.sendErrorMessage(res, DataModel.responseStatus.tokenError, "The token is invalid")
        }

        if(!req.body.id)
            return UsersUtility.sendErrorMessage(res, DataModel.responseStatus.idError, "The ID doesn't exists in the query");
        let id = parseInt(req.body.id);
        if(id === NaN)
            return UsersUtility.sendErrorMessage(res, DataModel.responseStatus.inputError, "Invalid ID");

        let address=DataModel.tables.userAddress;
        let sql = SQLUtility.formSelect(["*"]
            ,address.table
            ,[address.userID]
            ,["="]
            ,[]);
        this.database.getQueryResults(sql, [id]).then(result=>{
            let data=[];
            for(var i in result){
                let out = result[i];
                let json={
                    addressId:out[address.id],
                    name:out[address.name],
                    lattitude:out[address.latitude],
                    longitude:out[address.longitude],
                    address:out[address.address],
                    parkLat:out[address.parkingLatitude],
                    parkLong:out[address.parkingLongitude],
                    parkAddress:out[address.parkingAddress]
                };
                data.push(json);
            }
            return UsersUtility.sendSuccess(res, data, "Retrieved all the addresses");
        }, error=>{
            return UsersUtility.sendErrorMessage(res, DataModel.responseStatus.addressError, "Something went wrong!! "+error);
        }).catch(error=>{
            return UsersUtility.sendErrorMessage(res, DataModel.responseStatus.addressError, "Server Error");
        })
    }

    private deleteAddress(req:express.Request, res:express.Response){
        if(!UsersUtility.getParsedToken(req)){
            return UsersUtility.sendErrorMessage(res, DataModel.responseStatus.tokenError, "The token is invalid")
        }

        if(!req.body.id)
            return UsersUtility.sendErrorMessage(res, DataModel.responseStatus.idError, "The ID doesn't exists in the query");
        let id = parseInt(req.body.id);
        if(id === NaN)
            return UsersUtility.sendErrorMessage(res, DataModel.responseStatus.inputError, "Invalid ID");

        if(!req.body.addressId)
            return UsersUtility.sendErrorMessage(res, DataModel.responseStatus.idError, "The Address ID doesn't exists");
        let addressId = parseInt(req.body.addressId);
        if(addressId === NaN)
            return UsersUtility.sendErrorMessage(res, DataModel.responseStatus.inputError, "Invalid Address ID");

        let userAddress=DataModel.tables.userAddress;
        this.database.delete(userAddress.table, {
            [userAddress.userID]:id,
            [userAddress.id]:addressId
        }).then(result=>{
            if(result)
                UsersUtility.sendSuccess(res, [], "Successfully Deleted the addresses");
            else
                UsersUtility.sendErrorMessage(res, DataModel.responseStatus.addressError, "Could find any address with that ID");
        }, error=>{
            return UsersUtility.sendErrorMessage(res, DataModel.responseStatus.addressError, "Something went wrong!! "+error);
        }).catch(error=>{
            return UsersUtility.sendErrorMessage(res, DataModel.responseStatus.addressError, "Server Error");
        })
    }


    private addPayment(req:express.Request, res:express.Response){
        if(!UsersUtility.getParsedToken(req)){
            return UsersUtility.sendErrorMessage(res, DataModel.responseStatus.tokenError, "The token is invalid")
        }

        if(!req.body.id)
            return UsersUtility.sendErrorMessage(res, DataModel.responseStatus.idError, "The ID doesn't exists in the query");
        let id = parseInt(req.body.id);
        
        if(!req.body.amount)
            return UsersUtility.sendErrorMessage(res, DataModel.responseStatus.paymentError, "The amount doesn't exists in the query");
        let amount = parseInt(req.body.amount);
        
        if(!req.body.sessionId)
            return UsersUtility.sendErrorMessage(res, DataModel.responseStatus.paymentError, "The Session ID doesn't exists in the query");
        let sessionId = parseInt(req.body.sessionId);
        
        if(id === NaN || amount == NaN || sessionId == NaN)
            return UsersUtility.sendErrorMessage(res, DataModel.responseStatus.inputError, "Invalid Inputs");

        let payments=DataModel.tables.payments;

        this.database.insert(payments.table,{
            [payments.amount]:amount,
            [payments.sessionID]:sessionId,
        }).then(result=>{
            let json={
                paymentId:result
            };
            return UsersUtility.sendSuccess(res, json, "Successfully Added the Payment Details");
        }, error=>{
            return UsersUtility.sendErrorMessage(res, DataModel.responseStatus.paymentError, "Something went wrong!! "+error);
        }).catch(error=>{
            return UsersUtility.sendErrorMessage(res, DataModel.responseStatus.paymentError, "Server Error");
        })
    }

    private completePayment(req:express.Request, res:express.Response){
        if(!UsersUtility.getParsedToken(req)){
            return UsersUtility.sendErrorMessage(res, DataModel.responseStatus.tokenError, "The token is invalid")
        }

        if(!req.body.id)
            return UsersUtility.sendErrorMessage(res, DataModel.responseStatus.idError, "The ID doesn't exists in the query");
        let id = parseInt(req.body.id);
        
        if(!req.body.paymentId)
            return UsersUtility.sendErrorMessage(res, DataModel.responseStatus.paymentError, "The Payment ID doesn't exists in the query");
        let paymentId = parseInt(req.body.paymentId);
        
        if(!req.body.transactionId)
            return UsersUtility.sendErrorMessage(res, DataModel.responseStatus.paymentError, "The Transaction ID doesn't exists in the query");
        let transactionId = req.body.sessionId;

        if(id === NaN || paymentId == NaN)
            return UsersUtility.sendErrorMessage(res, DataModel.responseStatus.inputError, "Invalid Inputs");

        let payments = DataModel.tables.payments;
        this.database.update(payments.table,{
            [payments.transactionId]:transactionId
        }, {
            [payments.id]:paymentId
        }).then(result=>{
            if(result)
                return UsersUtility.sendSuccess(res, [], "Successfully Completed the payment");
            return UsersUtility.sendErrorMessage(res, DataModel.responseStatus.paymentError, "Cannot Find any entry with that Payment ID");
        }, error=>{
            return UsersUtility.sendErrorMessage(res, DataModel.responseStatus.paymentError, "Something went wrong!! "+error);
        }).catch(error=>{
            return UsersUtility.sendErrorMessage(res, DataModel.responseStatus.paymentError, "Server Error");
        })

    }
    private getPaymentsOrSessions(req:express.Request, res:express.Response, isSession:boolean=false){
        if(!UsersUtility.getParsedToken(req)){
            return UsersUtility.sendErrorMessage(res, DataModel.responseStatus.tokenError, "The token is invalid")
        }

        if(!req.body.id)
            return UsersUtility.sendErrorMessage(res, DataModel.responseStatus.idError, "The ID doesn't exists in the query");
        let id = parseInt(req.body.id);
        if(id === NaN)
            return UsersUtility.sendErrorMessage(res, DataModel.responseStatus.inputError, "Invalid ID");

        let payments=DataModel.tables.payments;
        let providers=DataModel.tables.providers;
        let sessions=DataModel.tables.sessions;

        let sql = "SELECT * \
            FROM "+payments.table+" natural join "+sessions.table+" natural join "+providers.table+" \
            WHERE "+sessions.userID+"="+id;

        this.database.getQueryResults(sql, [id]).then(result=>{
            let pending=[];
            let present=[];
            let past=[];
            let myJson={
                pending:pending,
                present:present,
                past:past
            }

            for(var i in result){
                let out = result[i];
                let json={
                    sessionId:out[payments.sessionID],
                    amount:out[payments.amount],
                    providerName:out[providers.firstName]+" "+out[providers.lastName],
                    massageType:out[sessions.massageType],
                    massageLength:out[sessions.massageLength],
                    massageDate:out[sessions.dateTime],
                };
                if(!isSession){
                    json["paymentId"]=out[payments.id];
                    json["transactionId"]=out[payments.transactionId];
                }
                if(parseInt(out[sessions.dateTime])<Date.now()){
                    past.push(json);
                }else if(out[payments.transactionId]==="NOTDONE"){
                    pending.push(json);
                }else{
                    present.push(json);
                }
            }
            if(!isSession)
                return UsersUtility.sendSuccess(res, myJson, "Retrieved all the Payment Details");
            return UsersUtility.sendSuccess(res, myJson, "Retrieved all the Session Details");
        }, error=>{
            if(!isSession)
                return UsersUtility.sendErrorMessage(res, DataModel.responseStatus.paymentError, "Something went wrong!! "+error);
            return UsersUtility.sendErrorMessage(res, DataModel.responseStatus.bookingError, "Something went wrong!! "+error);
        }).catch(error=>{
            if(!isSession)
                return UsersUtility.sendErrorMessage(res, DataModel.responseStatus.bookingError, "Server Error");
        })
    }

    private addSession(req:express.Request, res:express.Response){
        if(!UsersUtility.getParsedToken(req)){
            return UsersUtility.sendErrorMessage(res, DataModel.responseStatus.tokenError, "The token is invalid")
        }

        if(!req.body.id)
            return UsersUtility.sendErrorMessage(res, DataModel.responseStatus.idError, "The ID doesn't exists in the query");
        let id = parseInt(req.body.id);
        if(id === NaN)
            return UsersUtility.sendErrorMessage(res, DataModel.responseStatus.inputError, "Invalid ID");

        let massageType=req.body.massageType;
        let preferredGender=parseInt(req.body.preferredGender);
        let massageLength=parseInt(req.body.massageLength);
        let longDateTime=parseInt(req.body.dateTime);
        let addressId=parseInt(req.body.addressId);
        
        if(!req.body.extras)
            return UsersUtility.sendErrorMessage(res, DataModel.responseStatus.inputError, "Invalid Input");

        let extrasEquipe=req.body.extras.equipements==="true"?1:0;
        let extrasPets=req.body.extras.pets;
        let extrasInfo=req.body.extras.medicalInformation;
        
        if(!UsersUtility.validateStringFields(name, 1, 50)
            || longDateTime>Date.now()
            || preferredGender==NaN
            || addressId==NaN
            || !UsersUtility.validateStringFields(extrasPets, 1, 20))
            return UsersUtility.sendErrorMessage(res, DataModel.responseStatus.inputError, "Invalid Input");
        
        let dateTime = new Date(longDateTime).toISOString().slice(0, 19).replace('T', ' ');
        let sessions = DataModel.tables.sessions;
        
        this.database.insert(sessions.table,{
            [sessions.massageType]:massageType,
            [sessions.preferredGender]:preferredGender,
            [sessions.massageLength]:massageLength,
            [sessions.dateTime]:dateTime,
            [sessions.addressID]:addressId,
            [sessions.equipements]:extrasEquipe,
            [sessions.pets]:extrasPets,
            [sessions.medicalInformation]:extrasInfo,
        }).then(result=>{
            let json={
                sessionId:result
            };
            UsersUtility.sendSuccess(res, json, "Successfully Added the Session");
        }, error=>{
            return UsersUtility.sendErrorMessage(res, DataModel.responseStatus.bookingError, "Something went wrong!! "+error);
        }).catch(error=>{
            return UsersUtility.sendErrorMessage(res, DataModel.responseStatus.bookingError, "Server Error");
        })

    }
}