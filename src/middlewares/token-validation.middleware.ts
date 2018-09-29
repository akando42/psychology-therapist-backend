

import { Request, Response, NextFunction } from "express";
import * as jwt from 'jsonwebtoken';
import { InvalidTokenError } from "../errors/invalid-token.error";

export function TokenValidationMiddleware(req: Request, res: Response | any, next: NextFunction): void {
    const token =req.headers['authorization'] 
    if (token) {
        jwt.verify(token, process.env.SECRET_KEY, (err: any, decoded: any) => {
            if (err) {
                return res.status(403)
                    .send(new InvalidTokenError());
            }
            console.log(decoded)
            req['userId'] = decoded['userId'];
            req['roleId'] = decoded['roleId'];
            next();
        });

    }
    else {
        //Forbbiden
        res.status(403).send({ auth: false, message: 'not token found' });

    }
}