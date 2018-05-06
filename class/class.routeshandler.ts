import * as express from 'express';

export class RoutesHandler
{
    /* Generates a respose to an HTTP request                                   */
    /* @param: res - Instance of express.Response                               */
    /* @param: req - Istance of express.Request                                 */
    /* @param: values - Values that will be sent in the data of the response    */ 
    /* @param: error - True if the response is an error, false otherwise        */
    /* @param: message - Message to send with the response                      */
    
    public static async respond(res:express.Response,req:express.Request,values:any,error:boolean = false,message:string = "", code:number=200)
    {
        res.status(code)
        res.json({
            data:values,
            error:error,
            message:message
        });
    }
    

}