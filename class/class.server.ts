import * as express from 'express';
import * as bodyParser from "body-parser";
import * as cookieParser from 'cookie-parser';
import * as cors from "cors";
import {RoutesHandler} from './class.routeshandler';
var compression = require('compression');
var helmet = require('helmet');
var multer = require('multer');
var fs = require('fs');
var jimp = require("jimp");


export enum HTTPMethod
{
    GET,
    POST,
    PUT,
    PULL,
    DELETE,
    OPTIONS
}

export class ExpressServer
{
    public server:express.Application;
    private router = express.Router();


    public constructor(public config:{port:number,urls:string[],tmpfolder:string,filesfolder:string})
    {
        this.server=express();
        this.server.use(compression());
        this.server.use(helmet());
        this.server.use(bodyParser({limit: '5mb'}));
        this.server.use(bodyParser.json());
        this.server.use(bodyParser.urlencoded({extended: false}));
        this.server.use(cors({credentials: true, origin:(origin,callback)=>
        {
            if (config.urls.indexOf(origin) !== -1)
                callback(null, true)
            else 
                callback(null,false);
        }}));
        this.server.use(cookieParser());
        this.server.listen(config.port,()=>
        {
            console.log("Server is running on port :",config.port);
        });
    }
    public isTmpImage(imageName:string):Promise<boolean>
    {
        return new Promise<boolean>((resolve,reject)=>
        {
            if(!imageName)
                resolve(false);
            else
                fs.stat(this.config.tmpfolder+imageName, (err:any, stat:any)=> {
                    if(!err)
                        resolve(true);
                    else
                        resolve(false);
                });
        });
    }
    public isTmpFile(fileName:string):Promise<boolean>
    {
        return new Promise<boolean>((resolve,reject)=>
        {
            if(!fileName)
                resolve(false);
            else
                fs.stat(this.config.tmpfolder+fileName, (err:any, stat:any)=> {
                    if(!err)
                        resolve(true);
                    else
                        resolve(false);
                });
        });
    }
    public deleteFile(file:string):Promise<boolean>
    {
        return new Promise<boolean>((resolve,reject)=>
        {
            fs.unlink(file,(err:any)=>
            {
                if(err)
                    reject(err);
                else
                    resolve(true);
            });
        });
    }
    public moveTmpImage(imageName:string,destination:string,width:number=0,height:number=0):Promise<boolean>
    {
        return new Promise<boolean>((resolve,reject)=>
        {
            fs.rename(this.config.tmpfolder+imageName,destination+imageName,(err:any)=>
            {
                if(err)
                {
                    console.log(err);
                    
                }   
                else
                {
                    
                    if(width>0||height>0)
                        setTimeout(()=>
                        {
                            jimp.read(destination+imageName).then((image:any)=>{
                                if(width>0&&height>0)
                                    image.resize(width, height)            
                                     .quality(90)                 
                                     .write(destination+imageName);
                                else if(width>0)
                                    image.resize(width, jimp.AUTO)            
                                    .quality(90)                 
                                    .write(destination+imageName);
                                else
                                    image.resize(jimp.AUTO,height)            
                                    .quality(90)                 
                                    .write(destination+imageName);
                            }).catch((err:any) => console.log(err));
                        },10000);
                    resolve(true);
                }
            });
        });
    }
    public moveTmpFile(fileName:string,destination:string):Promise<boolean>
    {
        return new Promise<boolean>((resolve,reject)=>
        {
            fs.rename(this.config.tmpfolder+fileName,destination+fileName,(err:any)=>
            {
                if(err)
                    reject(err);
                else
                    resolve(true);
            });
        });
    }
    public createFile(fileName:string,path:string,content:string):Promise<boolean>
    {
        return new Promise<boolean>((resolve,reject)=>
        {
            fs.writeFile(path+fileName, content,(err:any) => {
                if(err)
                    reject(false);
                else
                    resolve(true);
            });
        });
         
    }
    public appendToTmpFile(fileName:string,content:string)
    {
        return new Promise<boolean>((resolve,reject)=>
        {
            fs.appendFile(this.config.tmpfolder+fileName, content,(err:any) => {
                if(err)
                    reject(false);
                else
                    resolve(true);
            });
        });
    }
    public createTmpFile(fileName:string,content:string):Promise<boolean>
    {
        return new Promise<boolean>((resolve,reject)=>
        {
            fs.writeFile(this.config.tmpfolder+fileName, content,(err:any) => {
                if(err)
                    reject(false);
                else
                    resolve(true);
            });
        });
         
    }
    public uploadImage(res:express.Response,req:express.Request,origin:string):Promise<string>
    {
        return new Promise<string>((resolve,reject)=>
        {
            let imageFileName:string="";
            let imageFilesStorage= multer.diskStorage({
                destination: (req:express.Request, file:any, callback:Function) =>{
                    callback(null, this.config.tmpfolder);
                },
                filename: (req:express.Request, file:any, callback:Function)=>{
                    let extesion=file.originalname.split('.');
                    if(!extesion[extesion.length-1].match(new RegExp("jpg|jpeg|png|JPG|JPEG|PNG/Ui")))
                        imageFileName="/invalidextension/"+Date.now().toString()+"/~";
                    else
                        imageFileName=file.fieldname + "_" + Date.now() + "_" + file.originalname.replace(new RegExp("[^a-zA-Z0-9\\.]",'g'),'_');
                    callback(null, imageFileName);
                }
            }); 
            let imageUploader=multer({
                storage:imageFilesStorage
            }).single("image");
    
    
            imageUploader(req, res, (err:any) =>{
                 if (err) 
                    reject(imageFileName.indexOf('invalidextension')>0?'extension':err);                    
                 else
                 {
                    resolve(imageFileName);
                    setTimeout(()=>
                    {
                        
                        fs.stat(this.config.tmpfolder+imageFileName, (err:any, stat:any)=> {
                            if(!err)
                            {
                                try
                                {
                                    fs.unlink(this.config.tmpfolder+imageFileName,(err:any)=>
                                    {
                                        if(err)
                                            console.log(err);
                                    });
                                }
                                catch(err)
                                {}
                            }
                        });

                       
                        
                    },7200000);
                 }
                    
            });
        });
    }

    public uploadFile(res:express.Response,req:express.Request,origin:string):Promise<string>
    {
        return new Promise<string>((resolve,reject)=>
        {
            let fileName:string="";
            let filesStorage= multer.diskStorage({
                destination: (req:express.Request, file:any, callback:Function) =>{
                    callback(null, this.config.tmpfolder);
                },
                filename: (req:express.Request, file:any, callback:Function)=>{
                    let extesion=file.originalname.split('.');
                    if(!extesion[extesion.length-1].toLowerCase().match(new RegExp("jpg|jpeg|gif|png|pdf|txt|doc|docx|xls|xlsx|csv/Ui")))
                        fileName="/invalidextension/"+Date.now().toString()+"/~";
                    else
                        fileName="file_" + Date.now() + "_" + file.originalname.replace(new RegExp("[^a-zA-Z0-9\\.]",'g'),'_');
                    callback(null, fileName);
                }
            }); 
            let imageUploader=multer({
                storage:filesStorage
            }).single("image");
    
    
            imageUploader(req, res, (err:any) =>{
                 if (err) 
                    reject(fileName.indexOf('invalidextension')>0?'extension':err);                    
                 else
                 {
                    resolve(fileName);
                    setTimeout(()=>
                    {
                        
                        fs.stat(this.config.tmpfolder+fileName, (err:any, stat:any)=> {
                            if(!err)
                            {
                                try
                                {
                                    fs.unlink(this.config.tmpfolder+fileName,(err:any)=>
                                    {
                                        if(err)
                                            console.log(err);
                                    });
                                }
                                catch(err)
                                {}
                            }
                        });

                       
                        
                    },7200000);
                 }
                    
            });
        });
    }
    /* Validates the origin of a request                                                                    */
    /* @param: req - Instance of express.Request                                                            */
    /* returns: Promise<boolean> - A Promise that resolves to true if the request is valid, false otherwise */
    public async validateRequest(req:express.Request):Promise<boolean>
    {
        return new Promise((resolve,reject)=>
        {
            if(req.method=="GET"){
                resolve(true);
                return;
            }
            let origin:any=req.get('origin')?req.get('origin'):req.get('host');
            if(!origin||this.config.urls.indexOf(origin)==-1){
                if(req.body.mac || req.query.mac){
                    resolve(true);
                }else{
                    resolve(false);
                }
            }else
                resolve(true);
        });
    }
    /* Sets a route in the server and validates the origin                                          */
    /* @param: route - Path of the route to set Ex: /route                                          */
    /* @param: callback - Callback function to be called upon successful validation of the request */
    /* @param: httpMethod - Value from the HTTPMethod enum                                         */
    public setRoute(route:string,callback:Function,httpMethod:HTTPMethod)
    {
        switch(httpMethod)
        {
            case HTTPMethod.OPTIONS:
                this.router.get(route, (req:express.Request, res:express.Response) => {
                this.validateRequest(req).then(validRequest=>
                    {
                        
                        if(validRequest)
                        {
                            try
                            {
                                callback(req,res);
                            }
                            catch(err)
                            {
                                let routesHandler:RoutesHandler = new RoutesHandler();
                                RoutesHandler.respond(res,req,{},true,"Internal Server Error");
                            }
                        }
                        else
                            RoutesHandler.respond(res,req,{},true,'Invalid request');
                        
                    },error=>RoutesHandler.respond(res,req,{},true,'Invalid request')).catch(error=>RoutesHandler.respond(res,req,{},true,'Invalid request')); 
                
                
             });                
            break;
            case HTTPMethod.GET:
                this.router.get(route, (req:express.Request, res:express.Response) => {

                    this.validateRequest(req).then(validRequest=>
                        {
                            if(validRequest)
                            {
                                try
                                {
                                    callback(req,res);
                                }
                                catch(err)
                                {
                                    let routesHandler:RoutesHandler = new RoutesHandler();
                                    RoutesHandler.respond(res,req,{},true,"Internal Server Error");
                                }
                            }
                            else
                                RoutesHandler.respond(res,req,{},true,'Invalid request');
                            
                        },error=>RoutesHandler.respond(res,req,{},true,'Invalid request')).catch(error=>RoutesHandler.respond(res,req,{},true,'Invalid request')); 
                    
                    
                });
                break;
            case HTTPMethod.POST:
               this.router.post(route, (req:express.Request, res:express.Response) => {
                this.validateRequest(req).then(validRequest=>
                    {
                        if(validRequest)
                        {
                            try
                            {
                                callback(req,res);
                            }
                            catch(err)
                            {
                                let routesHandler:RoutesHandler = new RoutesHandler();
                                RoutesHandler.respond(res,req,{},true,"Internal Server Error");
                            }
                        }
                        else
                            RoutesHandler.respond(res,req,{},true,'Invalid request');
                        
                    },error=>RoutesHandler.respond(res,req,{},true,'Invalid request')).catch(error=>RoutesHandler.respond(res,req,{},true,'Invalid request')); 
                });
                break;
        }
        this.server.use(route, this.router);
        
    }
}