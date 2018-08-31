import { Request, Response, NextFunction } from "express";
import { RequestHandlerParams } from "express-serve-static-core";



export function selfResponsabilityMiddleware(bindTo: string): RequestHandlerParams {
    return (req: Request, res: Response, next: NextFunction) => {
        req.body[bindTo] = req['userId'];
        next()
    }
}