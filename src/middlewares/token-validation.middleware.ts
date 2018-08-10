

import { Request, Response, NextFunction } from "express";
import * as jwt from 'jsonwebtoken';
import { InvalidTokenError } from "../errors/invalid-token.error";

export function TokenValidationMiddleware(req: Request, res: Response | any, next: NextFunction): void {
    if (req.headers['auth-token'] != 'undefined' && req.headers['auth-token']) {
        let token: any = req.headers['auth-token'];

        jwt.verify(token, process.env.SECRET_KEY, (err: any, decoded: any) => {
            if (err) {
                return res.status(500)
                    .send(new InvalidTokenError());
            }
            req['accountId'] = decoded['accountId'];
            next();
        });

    }
    else {
        //Forbbiden
        res.status(403).send({ auth: false, message: 'not token found' });

    }
}