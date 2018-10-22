import { Request, Response } from "express";

export function roleValidationMiddleware(roles: string[]): any {
    
    return (req: Request, res: Response, next) => {
        next()
    }
}