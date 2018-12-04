import { Router, Response, Request } from "express";
import { TODUsersModule } from ".";
import { TokenValidationMiddleware } from "../../middlewares/token-validation.middleware";
import { IPhoneNumber } from "../../models/phone-number";
import { ILocation } from "../../models/location";


export class UsersRouter {
    constructor() {

    }

    init(): Router {
        const router: Router = Router();

        router.post('/users/upload-id', TokenValidationMiddleware, this.uploadId.bind(this));
        router.post('/users/upload-id-second', TokenValidationMiddleware, this.pushVerificationIDPic.bind(this));

        router.post('/users/location', TokenValidationMiddleware, this.createLocation.bind(this));
        router.get('/users/location', TokenValidationMiddleware, this.getUserLocation.bind(this));

        router.post('/users/phone_number', TokenValidationMiddleware, this.createPhoneNumber.bind(this));
        router.get('/users/phone_number', TokenValidationMiddleware, this.getUserPhoneNumber.bind(this));

        router.get('/users/details', TokenValidationMiddleware, this.getUserDetials.bind(this));
        return router;
    }

    uploadId(req: Request, res: Response): void {

        const { files, body } = <any>req;
        const { document } = files;
        const info = JSON.parse(body.docInfo)
        let obj =
        {
            raw: {
                mimeType: document.mimetype,
                blob: document.data
            },
            typeId: info.typeId,
            expirationDate: info.indentificationID,
            indentificationID: info.indentificationID,
            userId: req['userId']

        };

        TODUsersModule.uploadIDDocument(obj)
            .then((result) => {
                res.status(200).send(result);
            })
            .catch((err) => {
                res.status(400).send(err);
            })
    }

    pushVerificationIDPic(req: Request, res: Response): void {

        const { files, body } = <any>req;
        const { document } = files;

        TODUsersModule.uploadSecondIdVerificationPic({
            raw: {
                mimeType: document.mimetype,
                blob: document.data
            },
            typeId: body.docInfo
        }, req['userId'])
            .then((result) => {
                res.status(200).send(result);
            })
            .catch((err) => {
                res.status(400).send(err);
            });
    }

    createPhoneNumber(req: Request, res: Response): void {
        let phone: IPhoneNumber = req.body;
        phone.userId = req['userId'];
        TODUsersModule.addUserPhoneNumber(phone)
            .then((result) => {
                res.status(200).send(result);
            })
            .catch((err) => {
                res.status(400).send(err);
            });
    }

    createLocation(req: Request, res: Response): void {
        let location: ILocation = req.body;
        location.userId = req['userId'];
        console.log(location)
        TODUsersModule.addUserLocation(location)
            .then((result) => {
                res.status(200).send(result);
            })
            .catch((err) => {
                res.status(400).send(err);
            });
    }

    getUserLocation(req: Request, res: Response): void {
        TODUsersModule.getUserLocation(req['userId'])
            .then((result) => {
                res.status(200).send(result);
            })
            .catch((err) => {
                res.status(400).send(err);
            });
    }

    getUserPhoneNumber(req: Request, res: Response): void {
        TODUsersModule.getUserPhoneNumber(req['userId'])
            .then((result) => {
                res.status(200).send(result);
            })
            .catch((err) => {
                res.status(400).send(err);
            });
    }
    getUserDetials(req: Request, res: Response): void {
        TODUsersModule.getUserDetails(req['userId'])
            .then((result) => {
                res.status(200).send(result);
            })
            .catch((err) => {
                res.status(400).send(err);
            });
    }

}