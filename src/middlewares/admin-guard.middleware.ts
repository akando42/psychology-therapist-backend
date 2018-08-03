import { Request, Response, NextFunction } from "express";
import { WebUtility } from "../../routes/web-utility-routes";
import { DataModel } from "../../datamodels/datamodel";
import { InvalidTokenError } from "errors/invalid-token.error";
import { AccessPermissionError } from "errors/access-permission.error";

//TO DO
// FIX ALL THIS.   
export function adminGuardMiddleware(req: Request, res: Response, next: NextFunction): any {
    if (!WebUtility.getParsedToken(req)) {
        res.send(new InvalidTokenError());
    }

    let sessionToken = WebUtility.getParsedToken(req, req.body.sessionToken, 30);
    console.log("parsed Val 2: " + JSON.stringify(sessionToken));
    if (!sessionToken) {
        WebUtility.sendErrorMessage(res, req, DataModel.webResponses.session_token_error, "The session token is not valid. Please login again.");
        res.send(new InvalidTokenError("The session token is not valid. Please login again."));
    }

    if (!(sessionToken["role"] == DataModel.userRoles.admin || sessionToken["role"] == DataModel.userRoles.hr || sessionToken["role"] == DataModel.userRoles.sales)
        || parseInt(sessionToken["adminId"]) == NaN) {
        // WebUtility.sendErrorMessage(res, req, DataModel.webResponses.accessError, "You dont have valid access rights");
        res.send(new AccessPermissionError());

    }
    req['sessionToken'] = sessionToken;
    next();
}