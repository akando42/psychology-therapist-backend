import * as express from 'express';
import {MySqlDatabase} from '../class/class.mysql-database';
import {CryptoFunctions} from '../class/class.crypto-functions'
import {ExpressServer,HTTPMethod} from '../class/class.server';
import { UsersUtility } from "./users-utility-routes";
import { DataModel } from "../datamodels/datamodel";
import { SQLUtility } from "./sql-utility";
import { ImageUtility } from "./image-utility";
import { EmailActivity } from "./email-activity";
import { MyDatabase } from "../app";
import { MyApp } from "../app";

var nodemailer = require('nodemailer');
var appConfig=require('../config/app.json');
const url = require('url');    


export class UserRoutes{
    private server:ExpressServer;

    public static randomPatternToVerify="!47218fah8y5&^%^$76T21358GUfutT6%$&68327Q5";
    

    constructor(server:ExpressServer, db:MySqlDatabase){
        this.server=server;
        var me=this;

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
        server.setRoute("/user/reset/password", (req:express.Request, res:express.Response)=>{
            me.resetPassword(req, res);
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

        server.setRoute("/user/session/otp", (req:express.Request, res:express.Response)=>{
            me.getOtp(req, res);
        }, HTTPMethod.POST);

        server.setRoute("/user/session/checkout", (req:express.Request, res:express.Response)=>{
            me.userCheckOut(req, res);
        }, HTTPMethod.POST);

    }

    private userCheckOut(req:express.Request, res:express.Response){
        if(!UsersUtility.getParsedToken(req)){
            return UsersUtility.sendErrorMessage(res, DataModel.userResponse.tokenError, "The token is invalid")
        }

        let id = UsersUtility.decryptId(req);
        if(!id)
            return UsersUtility.sendErrorMessage(res, DataModel.userResponse.idError, "Invalid ID");

        let sessionId=parseInt(req.body.sessionId);
        if(!sessionId || sessionId==NaN)
            return UsersUtility.sendErrorMessage(res, DataModel.userResponse.inputError, "Theres an error in request you have sent");
        
        let sessions=DataModel.tables.sessions;

        let star=parseInt(req.body.star);
        let comment=req.body.comment;
        
        if(!star || !comment || star==NaN || star>5 || star<0)
            return UsersUtility.sendErrorMessage(res, DataModel.userResponse.inputError, "Invalid inputs");

        let feedback = DataModel.tables.feedbackSession;
        
        //let queriesNew:{query:string,values:any[],result_id:string}[];
        let q1={
            query:"INSERT INTO "+feedback.table+" ("+feedback.sessionId+", "+feedback.userRating+", "+feedback.userComment+") \
                VALUES (?, ?, ?) \
                ON DUPLICATE KEY UPDATE "+feedback.userRating+"=?, "+feedback.userComment+"=?",
            values:[sessionId, star, comment, star, comment],
            result_id:""
        };
        let q2={
            query:"UPDATE "+sessions.table+" \
                SET "+sessions.sessionStatus+"=? \
                WHERE "+sessions.sessionStatus+"="+DataModel.sessionStatus.checkedOut+" \
                AND "+sessions.id+"="+sessionId,
            values:[DataModel.sessionStatus.feedbackGiven],
            result_id:""
        };
        console.log("reached here");
        
        let queriesNew = [q1, q2]
        
        // queries.push();
        // queries.push()
        MyDatabase.database.transaction(queriesNew).then(result=>{
            return UsersUtility.sendSuccess(res, [], "You have successfully checked out and given feedback");
        }, error=>{
            return UsersUtility.sendErrorMessage(res, DataModel.userResponse.checkInError, "Oops! Something went wrong. "+error);
        }).catch(error=>{
            return UsersUtility.sendErrorMessage(res, DataModel.userResponse.checkInError, "Oops! Something went wrong on our server.");
        })
    }

    private getOtp(req:express.Request, res:express.Response){
        if(!UsersUtility.getParsedToken(req)){
            return UsersUtility.sendErrorMessage(res, DataModel.userResponse.tokenError, "The token is invalid")
        }

        let id = UsersUtility.decryptId(req);
        if(!id)
            return UsersUtility.sendErrorMessage(res, DataModel.userResponse.idError, "Invalid ID");

        let sessionId=parseInt(req.body.sessionId);

        if(!sessionId || sessionId==NaN)
            return UsersUtility.sendErrorMessage(res, DataModel.userResponse.inputError, "Theres an error in request you have sent");
        
        let sessions=DataModel.tables.sessions;

        let sql="SELECT * \
            FROM "+sessions.table+" \
            WHERE "+sessions.id+"=?";
        MyDatabase.database.getQueryResults(sql, [sessionId]).then(result=>{
            if(result.length==1){
                let out=result[0];
                if(!out[sessions.sessionOTP] || out[sessions.sessionOTP].length==0){
                    return generateOtp();
                }
                return UsersUtility.sendSuccess(res, {
                    otp:out[sessions.sessionOTP]
                }, "Successfully created the OTP");
            }else{
                return UsersUtility.sendErrorMessage(res, DataModel.userResponse.checkInError, "We can't find session with that ID");
            }
        }, error=>{
            return UsersUtility.sendErrorMessage(res, DataModel.userResponse.checkInError, "Oops! Something went wrong.");
        }).catch(error=>{
            return UsersUtility.sendErrorMessage(res, DataModel.userResponse.checkInError, "Oops! Something went wrong on our server.");
        })

        function generateOtp(){
            let otp = ""+Math.floor(1000+Math.random()*8999);
            MyDatabase.database.update(sessions.table, {
                [sessions.sessionOTP]:otp
            }, {
                [sessions.id]:sessionId
            }).then(result=>{
                if(result){
                    return UsersUtility.sendSuccess(res, {
                        otp:otp
                    }, "Successfully created the OTP");
                }else{
                    return UsersUtility.sendErrorMessage(res, DataModel.userResponse.checkInError, "We can't find session with that ID");
                }
            }, error=>{
                return UsersUtility.sendErrorMessage(res, DataModel.userResponse.checkInError, "Oops! Something went wrong.");
            }).catch(error=>{
                return UsersUtility.sendErrorMessage(res, DataModel.userResponse.checkInError, "Oops! Something went wrong on our server.");
            })
        }
    }

    private loginUser(req:express.Request, res:express.Response){
        if(!UsersUtility.getParsedToken(req)){
            return UsersUtility.sendErrorMessage(res, DataModel.userResponse.tokenError, "The token is invalid")
        }

        let email = req.body.email;
        let password = req.body.password;

        if(!UsersUtility.validateStringFields(email, 1, 155)
            || !UsersUtility.validateStringFields(password, 8, 50)
            || !(password.match(/[A-Z]/) && password.match(/[a-z]/) && password.match(/[0-9]/) && password.match(/[^A-Za-z0-9]/))
            || !email.match(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)){
                return UsersUtility.sendErrorMessage(res, DataModel.userResponse.inputError, "Invalid Input");
            }
        
        // UsersUtility.sendSuccess(res, email, "Something");
        let users = DataModel.tables.users;
        var sql = SQLUtility.formSelect(["*"],
                users.table,
                [users.email],
                ["="],
                []);
        MyDatabase.database.getQueryResults(sql, [email]).then(result=>{
            if(result.length==0){
                return UsersUtility.sendErrorMessage(res, DataModel.userResponse.loginError, "Email ID is not registered");
            }
            var out = result[0];
            if(out[users.password] == password){
                if(out[users.accountStatus]==DataModel.accountStatus.waiting){
                    return UsersUtility.sendErrorMessage(res, DataModel.userResponse.loginError, "The Email is not verified");
                }

                let encryptedId=UsersUtility.createEncryptedID(req, out[users.id]);
                let json={
                    id:encryptedId,
                    fName:out[users.firstName],
                    lName:out[users.lastName],
                    phone:out[users.phone],
                    gender:out[users.gender],
                    image:out[users.image],
                    email:out[users.email]
                }
                return UsersUtility.sendSuccess(res, json, "Successfully logged in");
            }else{
                return UsersUtility.sendErrorMessage(res, DataModel.userResponse.loginError, "The username and password dint match");
            }
        }, error=>{
            UsersUtility.sendErrorMessage(res, DataModel.userResponse.loginError, error);
        }).catch(error=>{
            UsersUtility.sendErrorMessage(res, DataModel.userResponse.loginError, error);
        })
        
    }

    private registerUser(req:express.Request, res:express.Response){
        if(!UsersUtility.getParsedToken(req)){
            return UsersUtility.sendErrorMessage(res, DataModel.userResponse.tokenError, "The token is invalid")
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
                return UsersUtility.sendErrorMessage(res, DataModel.userResponse.inputError, "Invalid Input");
            }
        
        let users = DataModel.tables.users;
        
        let debug=false;
        // if(req.body.debug){
        //     debug=true;
        // }

        //TODO Change accepted to waiting
        MyDatabase.database.insert(users.table,{
            [users.firstName]:fname,
            [users.lastName]:lname,
            [users.email]:email,
            [users.password]:password,
            [users.phone]:phone,
            [users.gender]:gender,
            [users.accountStatus]:debug?DataModel.accountStatus.accepted:DataModel.accountStatus.waiting,
        }).then(result=>{
            if(debug)
                return UsersUtility.sendSuccess(res,[], "Successfully registered!! We have sent you a cofirmation mail!");
            this.sendEmailConfirmation(email, fname, lname, res);
        }, error=>{
            return UsersUtility.sendErrorMessage(res, DataModel.userResponse.registerError, error);
        }).catch(error=>{
            return UsersUtility.sendErrorMessage(res, DataModel.userResponse.registerError, "Server Error");
        })
        
    }
    private sendEmailConfirmation(email:string, fname:String, lname:String, res:express.Response){
        let link=appConfig.baseURL+"/user/verify?key=";

        let encKey = CryptoFunctions.get256BitKey(["To", "Verify", "Email", UserRoutes.randomPatternToVerify])
        //console.log("Token : "+token);
        let json={
            email:email,
            fname:fname,
            lname:lname
        };
        console.log("JSON : "+JSON.stringify(json));
        let key = encodeURIComponent(CryptoFunctions.aes256Encrypt(JSON.stringify(json), encKey));
        console.log("Key : "+key);

        let body="<H2>Verify Your Email Address</H2><H5>Massage on Demand</H5></br><H4>Hello "+fname+" "+lname+",</H4><p>Thanks for registering with us</p><p>Please Click <a href='"+link+key+"'>here</a> to verify you email Address</p>";
        EmailActivity.instance.sendEmail(email, 'Verification Mail | Massage On Demand', body, function(error, info){
            if (error) {
                console.log(error);
                return UsersUtility.sendErrorMessage(res, DataModel.userResponse.emailError, "Server Error : "+error);
            } else {
                console.log('Email sent: ' + info.response);
                return UsersUtility.sendSuccess(res,[], "Successfully registered!! We have sent you a cofirmation mail!");
            }
        });

    }
    private verifyEmail(req:express.Request, res:express.Response){
        console.log("Reached here");
        let encKey = CryptoFunctions.get256BitKey(["To", "Verify", "Email", UserRoutes.randomPatternToVerify])
        console.log("Encryption Key : "+encKey);
        let keyVal=req.query.key;

        if(!keyVal){
            return UsersUtility.sendErrorMessage(res, DataModel.userResponse.registerError, "Sorry Couldn't verify your email");
        }
        let actVal = CryptoFunctions.aes256Decrypt(keyVal, encKey);
        console.log("actual Value : "+actVal);
        let json:{email:string, fname:string, lname:string} = JSON.parse(actVal)
        if(!json || !json.email || !json.fname || !json.lname)
            return UsersUtility.sendErrorMessage(res, DataModel.userResponse.registerError, "Sorry Couldn't verify your email");
        

        var users=DataModel.tables.users;
        MyDatabase.database.update(users.table, {
            [users.accountStatus]:DataModel.accountStatus.accepted
        }, {
            [users.email]:json.email,
            [users.firstName]:json.fname,
            [users.lastName]:json.lname
        }).then(result=>{
            if(result){
                //return UsersUtility.sendSuccess(res, [], "Congratulations!! You email ID is verified. Please go to the login screen");
                let url=MyApp.appConfig.frontEndUrl+"/user/success/verifiaction";
                res.redirect(url)
            }else{
                return UsersUtility.sendErrorMessage(res, DataModel.userResponse.registerError, "The email Id in the token doesnt exists");
            }
        }, error=>{
            return UsersUtility.sendErrorMessage(res, DataModel.userResponse.registerError, "Something went Wrong!! "+error);
        }).catch(error=>{
            return UsersUtility.sendErrorMessage(res, DataModel.userResponse.registerError, "Server Error");
        })
    }

    private updateProfile(req:express.Request, res:express.Response){
        if(!UsersUtility.getParsedToken(req)){
            return UsersUtility.sendErrorMessage(res, DataModel.userResponse.tokenError, "The token is invalid")
        }

        let id = UsersUtility.decryptId(req);
        if(!id)
            return UsersUtility.sendErrorMessage(res, DataModel.userResponse.idError, "Invalid ID");

        let users=DataModel.tables.users;
        let json={};
        
        if(req.body.password){
            //TODO Write segment to update password.
            let passwords = req.body.password;
            if(!UsersUtility.validateStringFields(passwords.oldPassword, 8, 50)
                || !UsersUtility.validateStringFields(passwords.newPassword, 8, 50)
                || !(passwords.newPassword.match(/[A-Z]/) && passwords.newPassword.match(/[a-z]/) && passwords.newPassword.match(/[0-9]/) && passwords.newPassword.match(/[^A-Za-z0-9]/))) 
                return UsersUtility.sendErrorMessage(res, DataModel.userResponse.inputError, "The Password should follow the rules");

            json[users.password]=passwords.newPassword;
            MyDatabase.database.update(users.table, json, {
                [users.id]:id,
                [users.password]:passwords.oldPassword
            }).then(result=>{
                if(result){
                    return UsersUtility.sendSuccess(res, [], "Successfully updated the details");
                }else{
                    return UsersUtility.sendErrorMessage(res, DataModel.userResponse.profileError, "Cannot find profile with that ID and password");
                }
            }, error=>{
                return UsersUtility.sendErrorMessage(res, DataModel.userResponse.profileError, "Something went wrong!! "+error);
            }).catch(error=>{
                return UsersUtility.sendErrorMessage(res, DataModel.userResponse.profileError, "Server Error");
            })

            return;
        }

        if(req.body.firstName){
            if(!UsersUtility.validateStringFields(req.body.firstName, 1, 50)) 
                return UsersUtility.sendErrorMessage(res, DataModel.userResponse.inputError, "Invalid Input");
            json[users.firstName]=req.body.firstName
        }
        if(req.body.lastName){
            if(!UsersUtility.validateStringFields(req.body.lastName, 1, 50)) 
                return UsersUtility.sendErrorMessage(res, DataModel.userResponse.inputError, "Invalid Input");
            json[users.lastName]=req.body.lastName
        }
        if(req.body.phone){
            if(!UsersUtility.validateStringFields(req.body.phone, 1, 10)
                || !req.body.phone.match(/^[0-9]+$/)) 
                return UsersUtility.sendErrorMessage(res, DataModel.userResponse.inputError, "Invalid Input");
            json[users.phone]=req.body.phone
        }
        console.log("Its here");
        if(req.body.image){
            //this.decodeBase64Image(req.body.image)
            let imageLoc = ImageUtility.uploadImage(req.body.image, DataModel.imageTypes.profileImage, id, true, true);
            if(!imageLoc)
               return UsersUtility.sendErrorMessage(res, DataModel.userResponse.inputError, "The Image you sent is not base64");
            json[users.image]=imageLoc
        }
        console.log(JSON.stringify(json));
        MyDatabase.database.update(users.table, json, {
            [users.id]:id
        }).then(result=>{
            if(result){
                return UsersUtility.sendSuccess(res, [], "Successfully updated the details");
            }else{
                return UsersUtility.sendErrorMessage(res, DataModel.userResponse.profileError, "Cannot find profile with that ID");
            }
        }, error=>{
            return UsersUtility.sendErrorMessage(res, DataModel.userResponse.profileError, "Something went wrong!! "+error);
        }).catch(error=>{
            return UsersUtility.sendErrorMessage(res, DataModel.userResponse.profileError, "Server Error");
        })
    }

    private resetPassword(req:express.Request, res:express.Response){
        if(!UsersUtility.getParsedToken(req)){
            return UsersUtility.sendErrorMessage(res, DataModel.userResponse.tokenError, "The token is invalid")
        }

        if(!req.body.email)
            return UsersUtility.sendErrorMessage(res,DataModel.userResponse.inputError, "The iput doesnt contains email ID");

        let email=req.body.email;
        //TODO Check if the email ID exists
        let users=DataModel.tables.users;
        let sql ="SELECT "+users.firstName+" \
            FROM "+users.table+" \
            WHERE "+users.email+"=?";

        MyDatabase.database.getQueryResults(sql, [email]).then(result=>{
            if(result.length==1)
                proceedAfterVerifyingUser();
            else
                return UsersUtility.sendErrorMessage(res, DataModel.userResponse.passwordResetError, "The User with that email ID doesn't Esists");
        }, error=>{
            return UsersUtility.sendErrorMessage(res, DataModel.userResponse.passwordResetError, "Something went wrong : "+error);
        }).catch(error=>{
            return UsersUtility.sendErrorMessage(res, DataModel.userResponse.passwordResetError, "Something went wrong : "+error);
        })
        function proceedAfterVerifyingUser(){
            let redirectURL=MyApp.appConfig.frontEndUrl+"/user/set/password?"
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
                    return UsersUtility.sendSuccess(res, [], "Successfully sent the reset Link");
                }else{
                    return UsersUtility.sendErrorMessage(res, DataModel.userResponse.emailError, "Couldn't send the email : "+error);
                }
            });
        }
    }

    private getProfile(req:express.Request, res:express.Response){
        if(!UsersUtility.getParsedToken(req)){
            return UsersUtility.sendErrorMessage(res, DataModel.userResponse.tokenError, "The token is invalid")
        }

        let id = UsersUtility.decryptId(req);
        if(!id)
            return UsersUtility.sendErrorMessage(res, DataModel.userResponse.idError, "Invalid ID");

        let users=DataModel.tables.users;

        let sql = SQLUtility.formSelect(["*"]
            ,users.table
            ,[users.id]
            ,["="]
            ,[]);
        
        MyDatabase.database.getQueryResults(sql, [id]).then(result=>{
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
                return UsersUtility.sendErrorMessage(res, DataModel.userResponse.profileError, "Cant find any details for that ID");
            }
        }, error=>{

        }).catch(error=>{

        })
    }


    private addAddress(req:express.Request, res:express.Response){
        if(!UsersUtility.getParsedToken(req)){
            return UsersUtility.sendErrorMessage(res, DataModel.userResponse.tokenError, "The token is invalid")
        }

        let id = UsersUtility.decryptId(req);
        if(!id)
            return UsersUtility.sendErrorMessage(res, DataModel.userResponse.idError, "Invalid ID");

        let name=req.body.name;
        let lattitude = parseFloat(req.body.lattitude);
        let longitude = parseFloat(req.body.longitude);
        let address = req.body.address;
        let parkAddress = req.body.parkAddress;

        if(!UsersUtility.validateStringFields(name, 1, 50)
            || lattitude==NaN
            || longitude==NaN)
            return UsersUtility.sendErrorMessage(res, DataModel.userResponse.inputError, "Invalid Input");
        
        let addressTab = DataModel.tables.userAddress;

        MyDatabase.database.insert(addressTab.table,{
            [addressTab.userID]:id,
            [addressTab.name]:name,
            [addressTab.latitude]:lattitude,
            [addressTab.longitude]:longitude,
            [addressTab.address]:address,
            [addressTab.parkingInfo]:parkAddress,
        }).then(result=>{
            let json={
                addressId:result
            };
            UsersUtility.sendSuccess(res, json, "Successfully Added the addresses");
        }, error=>{
            return UsersUtility.sendErrorMessage(res, DataModel.userResponse.addressError, "Something went wrong!! "+error);
        }).catch(error=>{
            return UsersUtility.sendErrorMessage(res, DataModel.userResponse.addressError, "Server Error");
        })

    }

    private getAddresses(req:express.Request, res:express.Response){
        if(!UsersUtility.getParsedToken(req)){
            return UsersUtility.sendErrorMessage(res, DataModel.userResponse.tokenError, "The token is invalid")
        }

        let id = UsersUtility.decryptId(req);
        if(!id)
            return UsersUtility.sendErrorMessage(res, DataModel.userResponse.idError, "Invalid ID");

        let address=DataModel.tables.userAddress;
        let sql = SQLUtility.formSelect(["*"]
            ,address.table
            ,[address.userID]
            ,["="]
            ,[]);
        console.log(sql);
        MyDatabase.database.getQueryResults(sql, [id]).then(result=>{
            let data=[];
            for(var i in result){
                let out = result[i];
                let json={
                    addressId:out[address.id],
                    name:out[address.name],
                    lattitude:out[address.latitude],
                    longitude:out[address.longitude],
                    address:out[address.address],
                    parkAddress:out[address.parkingInfo]
                };
                data.push(json);
            }
            return UsersUtility.sendSuccess(res, data, "Retrieved all the addresses");
        }, error=>{
            return UsersUtility.sendErrorMessage(res, DataModel.userResponse.addressError, "Something went wrong!! "+error);
        }).catch(error=>{
            return UsersUtility.sendErrorMessage(res, DataModel.userResponse.addressError, "Server Error");
        })
    }

    private deleteAddress(req:express.Request, res:express.Response){
        if(!UsersUtility.getParsedToken(req)){
            return UsersUtility.sendErrorMessage(res, DataModel.userResponse.tokenError, "The token is invalid")
        }

        let id = UsersUtility.decryptId(req);
        if(!id)
            return UsersUtility.sendErrorMessage(res, DataModel.userResponse.idError, "Invalid ID");

        if(!req.body.addressId)
            return UsersUtility.sendErrorMessage(res, DataModel.userResponse.idError, "The Address ID doesn't exists");
        let addressId = parseInt(req.body.addressId);
        if(addressId === NaN)
            return UsersUtility.sendErrorMessage(res, DataModel.userResponse.inputError, "Invalid Address ID");

        let userAddress=DataModel.tables.userAddress;
        MyDatabase.database.delete(userAddress.table, {
            [userAddress.userID]:id,
            [userAddress.id]:addressId
        }).then(result=>{
            if(result)
                UsersUtility.sendSuccess(res, [], "Successfully Deleted the addresses");
            else
                UsersUtility.sendErrorMessage(res, DataModel.userResponse.addressError, "Could find any address with that ID");
        }, error=>{
            return UsersUtility.sendErrorMessage(res, DataModel.userResponse.addressError, "Something went wrong!! "+error);
        }).catch(error=>{
            return UsersUtility.sendErrorMessage(res, DataModel.userResponse.addressError, "Server Error");
        })
    }


    private addPayment(req:express.Request, res:express.Response){
        if(!UsersUtility.getParsedToken(req)){
            return UsersUtility.sendErrorMessage(res, DataModel.userResponse.tokenError, "The token is invalid")
        }

        let id = UsersUtility.decryptId(req);
        if(!id)
            return UsersUtility.sendErrorMessage(res, DataModel.userResponse.idError, "Invalid ID");
        
        if(!req.body.amount)
            return UsersUtility.sendErrorMessage(res, DataModel.userResponse.paymentError, "The amount doesn't exists in the query");
        let amount = parseInt(req.body.amount);
        
        if(!req.body.sessionId)
            return UsersUtility.sendErrorMessage(res, DataModel.userResponse.paymentError, "The Session ID doesn't exists in the query");
        let sessionId = parseInt(req.body.sessionId);
        
        if(id === NaN || amount == NaN || sessionId == NaN)
            return UsersUtility.sendErrorMessage(res, DataModel.userResponse.inputError, "Invalid Inputs");

        let payments=DataModel.tables.payments;

        MyDatabase.database.insert(payments.table,{
            [payments.amount]:amount,
            [payments.sessionID]:sessionId,
        }).then(result=>{
            let json={
                sessionId:sessionId,
                paymentId:result
            };
            return UsersUtility.sendSuccess(res, json, "Successfully Added the Payment Details");
        }, error=>{
            return UsersUtility.sendErrorMessage(res, DataModel.userResponse.paymentError, "Something went wrong!! "+error);
        }).catch(error=>{
            return UsersUtility.sendErrorMessage(res, DataModel.userResponse.paymentError, "Server Error");
        })
    }

    private completePayment(req:express.Request, res:express.Response){
        if(!UsersUtility.getParsedToken(req)){
            return UsersUtility.sendErrorMessage(res, DataModel.userResponse.tokenError, "The token is invalid")
        }

        let id = UsersUtility.decryptId(req);
        if(!id)
            return UsersUtility.sendErrorMessage(res, DataModel.userResponse.idError, "Invalid ID");
        
        if(!req.body.paymentId)
            return UsersUtility.sendErrorMessage(res, DataModel.userResponse.paymentError, "The Payment ID doesn't exists in the query");
        let paymentId = parseInt(req.body.paymentId);
        
        if(!req.body.transactionId)
            return UsersUtility.sendErrorMessage(res, DataModel.userResponse.paymentError, "The Transaction ID doesn't exists in the query");
        let transactionId = req.body.transactionId;

        if(id === NaN || paymentId == NaN)
            return UsersUtility.sendErrorMessage(res, DataModel.userResponse.inputError, "Invalid Inputs");

        let payments = DataModel.tables.payments;
        MyDatabase.database.update(payments.table,{
            [payments.transactionId]:transactionId
        }, {
            [payments.id]:paymentId
        }).then(result=>{
            if(result){
                sendEmailNotification();
            }else{
                return UsersUtility.sendErrorMessage(res, DataModel.userResponse.paymentError, "Cannot Find any entry with that Payment ID");
            }
        }, error=>{
            return UsersUtility.sendErrorMessage(res, DataModel.userResponse.paymentError, "Something went wrong!! "+error);
        }).catch(error=>{
            return UsersUtility.sendErrorMessage(res, DataModel.userResponse.paymentError, "Server Error");
        })
        let myThis=this;
        function sendEmailNotification(){
            let payments=DataModel.tables.payments;
            let providers=DataModel.tables.providers;
            let users=DataModel.tables.users;
            let userAddress=DataModel.tables.userAddress;
            let sessions=DataModel.tables.sessions;

            let sql = "SELECT "+providers.email+", "+providers.firstName+", "+users.firstName+", "+users.lastName+", "+sessions.dateTime+", "+sessions.massageType+", "+sessions.massageLength+", "+sessions.id+" \
                FROM "+payments.table+" natural join "+sessions.table+" natural join "+providers.table+" natural join "+users.table+" natural join "+userAddress.table+"\
                WHERE "+payments.id+"="+paymentId;
            console.log("My Query : "+sql);
            MyDatabase.database.getQueryResults(sql, []).then(result=>{
                if(result.length==1){
                    let out=result[0];

                    let email = out[providers.email];
                    let pFirstName = out[providers.firstName];
                    let firstName = out[users.firstName];
                    let lastName = out[users.lastName];
                    let massageDate = out[sessions.dateTime];
                    let massageLength = out[sessions.massageLength];
                    let massageType = out[sessions.massageType];

                    let sessionCode={
                        sessionId:out[sessions.id],
                        providerEmail:out[providers.email],
                    }
                    let encryptedSession = CryptoFunctions.aes256Encrypt(JSON.stringify(sessionCode), CryptoFunctions.get256BitKey([email, UserRoutes.randomPatternToVerify]))
                    // console.log("App config : "+JSON.stringify(MyApp.appConfig));
                    
                    let confirmLink=url.format({
                        pathname:MyApp.appConfig.baseURL+"/provider/session/accept",
                        query:{
                            sessionCode:encryptedSession,
                            email:email
                        }
                    })
                    let rejectLink=url.format({
                        pathname:MyApp.appConfig.baseURL+"/provider/session/reject",
                        query:{
                            sessionCode:encryptedSession,
                            email:email
                        }
                    })
                    let body = "<h5>Hi "+pFirstName+",</h5><p>You have been booked for "+massageDate+"</p>\
                        <table>\
                        <tody>\
                        \
                        <tr>\
                        <td>Person Name</td>\
                        <td>"+firstName+" "+lastName+"</td>\
                        </tr>\
                        \
                        <tr>\
                        <td>Massage Type</td>\
                        <td>"+massageType+"</td>\
                        </tr>\
                        \
                        <tr>\
                        <td>Massage Length</td>\
                        <td>"+massageLength+" minutes</td>\
                        </tr>\
                        \
                        <tr>\
                        <td>Date and Time</td>\
                        <td>"+massageDate+"</td>\
                        </tr>\
                        </tbody>\
                        </table>\
                        <div><a href='"+confirmLink+"'><input type='submit' value='Confirm'></a></div>\
                        <div><a href='"+rejectLink+"'><input type='submit' value='Decline'></a></div>\
                        <p><b>Please open your account to view more details and the contact info of the client</b></p>"
                    
                    EmailActivity.instance.sendEmail(email, "You got a booking | Therapy On Demand", body, function(error, msg){
                        if(!error)
                            return UsersUtility.sendSuccess(res, [], "Successfully Completed the payment");
                        else
                            return UsersUtility.sendErrorMessage(res, DataModel.userResponse.emailError, "Email Notification cant be send! Still we have registered your response");
                    })
                    return UsersUtility.sendSuccess(res, [], "Successfully Completed the payment");
                }else{
                    return UsersUtility.sendErrorMessage(res, DataModel.userResponse.paymentError, "Payment ID not registered");
                }
                //EmailActivity.instance.sendEmail()
            }, error=>{
                return UsersUtility.sendErrorMessage(res, DataModel.userResponse.paymentError, "Something went wrong! "+error);
            }).catch(error=>{
                return UsersUtility.sendErrorMessage(res, DataModel.userResponse.paymentError, "Something went wrong! "+error);
            })
        }
    }
    private getPaymentsOrSessions(req:express.Request, res:express.Response, isSession:boolean=false){
        if(!UsersUtility.getParsedToken(req)){
            return UsersUtility.sendErrorMessage(res, DataModel.userResponse.tokenError, "The token is invalid")
        }

        let id = UsersUtility.decryptId(req);
        if(!id)
            return UsersUtility.sendErrorMessage(res, DataModel.userResponse.idError, "Invalid ID");

        let payments=DataModel.tables.payments;
        let providers=DataModel.tables.providers;
        let sessions=DataModel.tables.sessions;

        let sql = "SELECT * \
            FROM "+payments.table+" natural join "+sessions.table+" natural join "+providers.table+" \
            WHERE "+sessions.userID+"="+id;
        console.log(sql);
        MyDatabase.database.getQueryResults(sql, [id]).then(result=>{
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
                    preferredGender:out[sessions.preferredGender],
                    massageDate:out[sessions.dateTime],
                    pets:out[sessions.pets],
                    equipements:out[sessions.equipements],
                    medicalInformation:out[sessions.medicalInformation],
                    sessionStatus:out[sessions.sessionStatus]
                };
                if(!isSession){
                    json["paymentId"]=out[payments.id];
                    json["transactionId"]=out[payments.transactionId];
                }
                let dateTime = new Date().toISOString().slice(0, 19).replace('T', ' ');
                if(out[sessions.dateTime]<dateTime){
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
                return UsersUtility.sendErrorMessage(res, DataModel.userResponse.paymentError, "Something went wrong!! "+error);
            return UsersUtility.sendErrorMessage(res, DataModel.userResponse.bookingError, "Something went wrong!! "+error);
        }).catch(error=>{
            if(!isSession)
                return UsersUtility.sendErrorMessage(res, DataModel.userResponse.bookingError, "Server Error");
        })
    }

    private addSession(req:express.Request, res:express.Response){
        if(!UsersUtility.getParsedToken(req)){
            return UsersUtility.sendErrorMessage(res, DataModel.userResponse.tokenError, "The token is invalid")
        }

        let id = UsersUtility.decryptId(req);
        if(!id)
            return UsersUtility.sendErrorMessage(res, DataModel.userResponse.idError, "Invalid ID");

        let massageType=req.body.massageType;
        let preferredGender=parseInt(req.body.preferredGender);
        let massageLength=parseInt(req.body.massageLength);
        let longDateTime=parseInt(req.body.dateTime);
        let addressId=parseInt(req.body.addressId);
        
        console.log("Time : "+longDateTime+" : "+Date.now());
        if(!req.body.extras)
            return UsersUtility.sendErrorMessage(res, DataModel.userResponse.inputError, "No Extras Attached");

        let extrasEquipe=req.body.extras.equipements==="true"?1:0;
        let extrasPets=req.body.extras.pets;
        let extrasInfo=req.body.extras.medicalInformation;
        
        console.log(massageType+":"+(longDateTime<Date.now())+" : "+longDateTime+" : "+preferredGender+" : "+addressId+" : "+extrasPets);
        if(!UsersUtility.validateStringFields(massageType, 1, 50)
            || longDateTime==NaN
            || longDateTime<Date.now()
            || preferredGender==NaN
            || addressId==NaN
            || !UsersUtility.validateStringFields(extrasPets, 1, 20))
            return UsersUtility.sendErrorMessage(res, DataModel.userResponse.inputError, "Invalid Input. Please Check the parameters");
        
        let userAddress=DataModel.tables.userAddress;
        let sqlAdd = "SELECT * \
            FROM "+userAddress.table+" \
            WHERE "+userAddress.id+" = "+addressId;
        MyDatabase.database.getQueryResults(sqlAdd, []).then(result=>{
            if(result.length==1){
                let out = result[0];
                console.log("Address : "+out[userAddress.latitude]+" : "+out[userAddress.longitude]);
                
                afterAddressIsFetched(out[userAddress.latitude], out[userAddress.longitude]);
            }else{
                return UsersUtility.sendErrorMessage(res, DataModel.userResponse.addressError, "Something went wrong in fetching the address");
            }
        }, error=>{
            return UsersUtility.sendErrorMessage(res, DataModel.userResponse.addressError, "Couldn't fetch the address : "+error);
        }).catch(error=>{
            return UsersUtility.sendErrorMessage(res, DataModel.userResponse.addressError, "Server Error-Address : "+error);
        })
        let myThis=this;
        function afterAddressIsFetched(lattitude:number, longitude:number){
            let providers=DataModel.tables.providers;
            let sql = "SELECT * \
                FROM "+providers.table+" \
                WHERE "+providers.accountStatus+"="+DataModel.accountStatus.accepted;
            MyDatabase.database.getQueryResults(sql, []).then(result=>{
                let providerID=-1; // DONE this needs to be set accordingly
                let travelDist=-1; // TODO Change this variable to a non negative value to put the threshold
                console.log("Total providers on system : "+result.length);
                
                for(var i in result){
                    let out = result[i];
                    let myId = out[providers.id];
                    let templatt = out[providers.lattitude];
                    let templongt = out[providers.longitude];
                    let gender = parseInt(out[providers.gender]);
                    

                    if(preferredGender===gender || preferredGender==2){
                        let dist = (lattitude-templatt)*(lattitude-templatt)+(longitude-templongt)*(longitude-templongt)
                        console.log("Distance of provider with id "+myId+": "+dist);
                        if(travelDist==-1 || travelDist>dist){
                            travelDist=dist;
                            providerID=myId
                        }
                    }
                }
                
                if(providerID==-1)
                    return UsersUtility.sendErrorMessage(res, DataModel.userResponse.bookingError, "Cannot find any provider near you");
                let dateTime = new Date(longDateTime).toISOString().slice(0, 19).replace('T', ' ');
                let sessions = DataModel.tables.sessions;
                let payments = DataModel.tables.payments;
                
                MyDatabase.database.insert(sessions.table,{
                    [sessions.providerID]:providerID,
                    [sessions.userID]:id,
                    [sessions.massageType]:massageType,
                    [sessions.preferredGender]:preferredGender,
                    [sessions.massageLength]:massageLength,
                    [sessions.dateTime]:dateTime,
                    [sessions.addressID]:addressId,
                    [sessions.equipements]:extrasEquipe,
                    [sessions.pets]:extrasPets,
                    [sessions.medicalInformation]:extrasInfo,
                }).then(result=>{
                    req.body.sessionId=result;
                    myThis.addPayment(req, res);
                }, error=>{
                    return UsersUtility.sendErrorMessage(res, DataModel.userResponse.bookingError, "Something went wrong!! "+error);
                }).catch(error=>{
                    return UsersUtility.sendErrorMessage(res, DataModel.userResponse.bookingError, "Server Error");
                })

            }, error=>{

            }).catch(error=>{

            })
        }
    }
}