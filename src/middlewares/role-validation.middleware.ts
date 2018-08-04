import { Request, Response } from "express";

export function roleValidationMiddleware(roles: string[]): any {
    console.log(roles)
    return (req: Request, res: Response, next) => {
        next()
    }
}