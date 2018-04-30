import * as express from 'express';
import {MySqlDatabase} from '../class/class.mysql-database';
import {CryptoFunctions} from '../class/class.crypto-functions'
import {ExpressServer,HTTPMethod} from '../class/class.server';
import {UtilityRoutes} from "./utility-routes";
import { RoutesHandler } from "../class/class.routeshandler";
import { DataModel } from "../datamodels/datamodel";
import { SQLUtility } from "./sql-utility";

export class HRRoutes{
    private static database:MySqlDatabase;
    private static server:ExpressServer;

    constructor(server:ExpressServer, db:MySqlDatabase){
        HRRoutes.database=db;
        HRRoutes.server=server;
        var me:HRRoutes=this;
        server.setRoute("/hr/login", (req:express.Request, res:express.Response)=>{
            me.login(req, res);
        }, HTTPMethod.POST);

        server.setRoute("/hr/phase1", (req:express.Request, res:express.Response)=>{
            me.getPhaseDocs(req, res, 1);
        }, HTTPMethod.GET);

        server.setRoute("/hr/phase2", (req:express.Request, res:express.Response)=>{
            me.getPhaseDocs(req, res, 2);
        }, HTTPMethod.GET);
    }

    private login(req:express.Request, res:express.Response){
        console.log("Login Route");
        if(!req.cookies.account_token){
            UtilityRoutes.sendErrorMessage(res, req, 403, "The account_token is not valid");
            return false;
        }else{
            var parsedVal  = UtilityRoutes.getParsedToken(req)
            console.log("parsed Val : "+JSON.stringify(parsedVal));
            if(!parsedVal){
                UtilityRoutes.sendErrorMessage(res, req, 403, "The account_toekn is not valid");
                return false;
            }
        }

        var email:string = String(req.body.email);
        var password:string = String(req.body.password);

        // console.log(email+" : "+password);
        if(!(UtilityRoutes.validateStringFields(email, 6, 255, res, req)
            && UtilityRoutes.validateStringFields(password, 8, 20, res, req))){
                return false;
            }
            
        //TODO Do the actual login here
        this.verifyUser(email, password, req, res);
        
        return true;
    }
    private verifyUser(email:string, pass:string, req:express.Request, res:express.Response){
        //console.log(email+" : "+pass);
        let hr = DataModel.tables.hr;
        let status = DataModel.accountStatus;
        let sql = SQLUtility.formSelect([hr.name, hr.password, hr.accountStatus, hr.lastLoginAttempt, hr.totalLoginAttempts, hr.imageLink],
                    hr.table,
                    [hr.email],
                    ["="],
                    []);
        console.log("My SQL : "+sql);
        HRRoutes.database.getQueryResults(sql, [email]).then(result=>{
            console.log(JSON.stringify(result));
            if(result.length==0){
                UtilityRoutes.sendErrorMessage(res, req, 400, "We cannot find any User registered with that email ID");
                return false;
            }else{
                var out = result[0];
                console.log(pass+" : "+out[hr.password])
                if(out[hr.password]!=pass){
                    UtilityRoutes.sendErrorMessage(res, req, 400, "The email ID and password doesnt match");
                    return false;
                }else if(out[hr.accountStatus]==status.blocked){
                    UtilityRoutes.sendErrorMessage(res, req, 511, "This account has been blocked");
                    return false;
                }else if(out[hr.accountStatus]==status.deleted){
                    UtilityRoutes.sendErrorMessage(res, req, 512, "This account has been deleted");
                    return false;
                }else if(out[hr.totalLoginAttempts]>=3){
                    if(!UtilityRoutes.checkTimeThreshold(out[hr.lastLoginAttempt], req)){
                        HRRoutes.database.update(hr.table,{
                            [hr.accountStatus] : status.blocked
                        },{
                            [hr.email] : email
                        }).then(result=>{
                            UtilityRoutes.sendErrorMessage(res, req, 511, "Your account has been blocked");
                        }, error=>{
                            UtilityRoutes.sendErrorMessage(res, req, 500, "Internal Server Error");
                        }).catch(error=>{
                            UtilityRoutes.sendErrorMessage(res, req, 500, "Internal Server Error");
                        })
                    }
                }

                HRRoutes.database.update(hr.table, {
                    [hr.lastLoginAttempt] : new Date(Date.now()),
                    [hr.totalLoginAttempts] : out[hr.totalLoginAttempts]+1
                },{
                    [hr.email] : email
                }).then(result2=>{
                    var response = {
                        status:200,
                        value:{
                            name : out[hr.name],
                            email : out[hr.email],
                            image : out[hr.imageLink]
                        }
                    }
                    var tokenKey:string = UtilityRoutes.getTokenKey(req);
                    var date = Math.floor(new Date().getTime());
                    var jsonStr={
                        ip:UtilityRoutes.getIPAddress(req),
                        date:date,
                        origin:req.get("origin")
                    }
                    var cookieStr = CryptoFunctions.aes256Encrypt(JSON.stringify(jsonStr), tokenKey);
                    res.cookie("session_token", cookieStr, {maxAge:1800000});
                    //res.end(JSON.stringify(response));
                    RoutesHandler.respond(res, req, response, false, "Successfully verified the user", response["status"])
                    return true;
                }, error=>{
                    UtilityRoutes.sendErrorMessage(res, req, 500, "Internal Server Error");
                }).catch(error=>{
                    UtilityRoutes.sendErrorMessage(res, req, 500, "Internal Server Error");
                })
            }
        }, error=>{
            UtilityRoutes.sendErrorMessage(res, req, 400, error);
            return false;
        }).catch(error=>{
            UtilityRoutes.sendErrorMessage(res, req, 400, error);
            return false;
        })
    }





//------------------------------------------Get Documents-------------------------------------

    private initialSessionCheck(req:express.Request, res:express.Response):boolean{
        if(req.cookies.account_token){
            if(!UtilityRoutes.getParsedToken(req)){
                UtilityRoutes.sendErrorMessage(res, req, 403, "The account_token is not valid");
                return false;
            }
        }else{
            UtilityRoutes.sendErrorMessage(res, req, 403, "The account_token is not valid");
            return false;
        }
        if(req.cookies.session_token){
            if(!UtilityRoutes.getParsedToken(req, 30, req.cookies.session_token)){
                UtilityRoutes.sendErrorMessage(res, req, 405, "The session_token is not valid");
                return false;
            }
        }else{
            UtilityRoutes.sendErrorMessage(res, req, 405, "The session_token is not valid");
            return false;
        }
        return true;
    }

    private getPhaseDocs(req:express.Request, res:express.Response, phase:number){
        if(!this.initialSessionCheck(req, res))
            return;
        
        let start = parseInt(req.query.start);
        let end = parseInt(req.query.end);
        
        if(start===undefined || end===undefined || start>end){
            UtilityRoutes.sendErrorMessage(res, req, 400, "Invalid input, the start and end parameters are invalid");
            return;
        }

        let providers = DataModel.tables.providers;
        let providersDoc = DataModel.tables.providersDoc;
        let docTypes = DataModel.tables.docTypes;
        let accountStatus = DataModel.accountStatus;
        let phaseInfo:number;
        if(phase==1){
            phaseInfo=accountStatus.phaseOneDocSubmitted;
        }else if(phase==2){
            phaseInfo=accountStatus.phaseTwoDocSubmitted;
        }else{
            UtilityRoutes.sendErrorMessage(res, req, 400, "Invalid input, the start and end parameters are invalid");
            return;
        }

        let sql =SQLUtility.formSelect(["*"],
            providers.table,
            [providers.accountStatus],
            ["="],
            [])+"\
            ORDER BY "+providers.id+"\
            LIMIT "+start+", "+end;
        
        console.log("SQL : "+sql);
        HRRoutes.database.getQueryResults(sql, [phaseInfo]).then(result=>{
            let count=result.length;

            let response={
                description: "Successfully fetched the information",
                total:count,
                start: start,
                end:end,
                data:{}
            }
            if(result.length==0){
                RoutesHandler.respond(res, req, response, false, response.description, 200);
                return;
            }
            let pids=[];
            for(var i in result){
                pids.push(result[i][providers.id])
                response.data[result[i][providers.id]]={
                    name:result[i][providers.firstName]+" "+result[i][providers.lastName],
                    email:result[i][providers.emailID],
                    image:result[i][providers.imageLink],
                    docs:[]
                }
            }
            
            let sql = SQLUtility.formSelect([providersDoc.providerId, providersDoc.id, providersDoc.documentLink, docTypes.docName, docTypes.docDescription],
                providersDoc.table+" natural join "+docTypes.table)+"\
                WHERE "+providersDoc.providerId+" in ("+pids.join(',')+") AND "+providersDoc.phaseInfo+"="+phaseInfo+" \
                "+providersDoc.docApproved+"="+accountStatus.docUploaded;
            console.log("Phase1 Doc SQL : "+sql);
            HRRoutes.database.getQueryResults(sql,[]).then(result=>{
                for(var i in result){
                    var out = result[i];
                    response.data[out[providersDoc.providerId]].docs.push({
                        docLink:out[providersDoc.documentLink],
                        docType:out[docTypes.id],
                        docName:out[docTypes.docName],
                        docDescription:out[docTypes.docDescription]
                    })
                }

                RoutesHandler.respond(res, req, response, false, response.description, 200);
            }, error=>{
                console.log(error);
                UtilityRoutes.sendErrorMessage(res, req, 500, "Internal Server Error");
                return;
            }).catch(error=>{
                console.log(error);
                UtilityRoutes.sendErrorMessage(res, req, 500, "Internal Server Error");
                return;
            })
        },error=>{
            UtilityRoutes.sendErrorMessage(res, req, 500, "Internal Server Error");
            return;
        }).catch(error=>{
            UtilityRoutes.sendErrorMessage(res, req, 500, "Internal Server Error");
            return;
        });
    }

    private approveDoc(req:express.Request, res:express.Response){
        if(!this.initialSessionCheck(req, res))
            return;

        let docId=parseInt(req.body.docId);
        let providerId=parseInt(req.body.providerId);
        let action=req.body.action;

        let myAction:number;

        let providersDoc=DataModel.tables.providersDoc;
        let accountStatus=DataModel.accountStatus;
        
        if(docId==NaN || providerId==NaN || !(action=="approve" || action=="resubmit")){
            UtilityRoutes.sendErrorMessage(res, req, 400, "Invalid input")
            return;
        }

        if(action=="approve"){
            myAction=accountStatus.docApproved;
        }else if(action=="resubmit"){
            myAction=accountStatus.docReRequested;
        }
        HRRoutes.database.update(providersDoc.table, {
            [providersDoc.docApproved]:myAction
        },{
            [providersDoc.id]:docId,
            [providersDoc.providerId]:providerId
        }).then(result=>{
            if(!result){
                UtilityRoutes.sendErrorMessage(res, req, 500, "Internal Server Error.");
                return;
            }
            RoutesHandler.respond(res, req, [], false, "Successfully performed action on the docs", 200);
        }, error=>{
            UtilityRoutes.sendErrorMessage(res, req, 500, "Internal Server Error.");
            return;
        }).catch(error=>{
            UtilityRoutes.sendErrorMessage(res, req, 500, "Internal Server Error.");
            return;
        })

    }
    private approvePhase1(req:express.Request, res:express.Response){
        
    }

    private approvePhase2Docs(req:express.Request, res:express.Response){
        
    }

    private requestPhase1Docs(req:express.Request, res:express.Response){
        
    }

    private requestPhase2Docs(req:express.Request, res:express.Response){
        
    }

    private declinePhase1Docs(req:express.Request, res:express.Response){
        
    }

    private declinePhase2Docs(req:express.Request, res:express.Response){
        
    }

    private unlockDeclinedDoc(req:express.Request, res:express.Response){
        
    }

    private getLockedProviders(req:express.Request, res:express.Response){
        
    }

}