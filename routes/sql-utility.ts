import * as express from 'express';
import {MySqlDatabase} from '../class/class.mysql-database';
import {CryptoFunctions} from '../class/class.crypto-functions'
import {ExpressServer,HTTPMethod} from '../class/class.server';
import { RoutesHandler } from "../class/class.routeshandler";
import { DataModel } from "../datamodels/datamodel";

export class SQLUtility{
    public static formSelect(column:string[], tableName:string, whereColoumn?:string[], whereCond?:string[], whereSep?:string[]){
        var str:string;
        str="SELECT "+column.join(",")+" FROM "+tableName;
        if(whereColoumn==undefined || whereColoumn.length!=whereCond.length || whereColoumn.length-1!=whereSep.length){
            //Do nothing
        }else{
            str+=" Where ";
            for(let i=0 ;i<whereColoumn.length; i++){
                let sep = "";
                if(i!=0)
                    sep=whereSep[i-1];
                str+= " "+sep+" "+ whereColoumn[i]+whereCond[i]+"?"
            }
        }
        return str;
    }
}