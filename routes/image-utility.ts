import * as express from 'express';
import {MySqlDatabase} from '../class/class.mysql-database';
import {CryptoFunctions} from '../class/class.crypto-functions'
import {ExpressServer,HTTPMethod} from '../class/class.server';
import { RoutesHandler } from "../class/class.routeshandler";
import { DataModel } from "../datamodels/datamodel";
import { SQLUtility } from "./sql-utility";

var fs=require('fs');

export class ImageUtility {
    private static dirLoc:string;
    public static setLocation(str:string){
        this.dirLoc=str;
    }

    private static decodeBase64Image(dataString) {
        var matches = dataString.match(/^data:([A-Za-z-+\\\/]+);base64,(.+)$/);
        let response = {};
        if (matches.length !== 3) {
            return undefined;
        }
        response["type"] = matches[1];
        response["data"] = new Buffer(matches[2], 'base64');

        return response;
    }
    
    public static uploadImage(data:string, imageType:string ,id:any, isUser:boolean=true):string{
        console.log("Here1");
        let response = this.decodeBase64Image(data);
        console.log("Here2");
        if(!response)
            return undefined;

        var buf = new Buffer(response["data"], 'base64');
        var resps = response["type"].split("/");
        var address="/"+imageType+"/"+(isUser?"user":"provider")+"-"+Date.now()+"-"+id+"."+resps[1];
        console.log(address);
        fs.writeFileSync(this.dirLoc+address, buf);
        return address;
    }

}


