import { Router, Response, Request } from "express";
import { TODUsersModule } from ".";
import { TokenValidationMiddleware } from "../../middlewares/token-validation.middleware";


export class UsersRouter {
    constructor() {

    }

    init(): Router {
        const router: Router = Router();

        router.post('/users/upload-id', TokenValidationMiddleware,this.uploadId.bind(this));
        router.post('/users/upload-id-second', TokenValidationMiddleware, this.pushVerificationIDPic.bind(this));

        return router;
    }

    uploadId(req: Request, res: Response): void {

        const { files, body } = <any>req;
        const { document } = files;
        const info= JSON.parse(body.docInfo)
        let obj =
        {
            raw: {
                mimeType: document.mimetype,
                blob: document.data
            },
            typeId: info.typeId,
            expirationDate: info.indentificationID,
            indentificationID: info.indentificationID,
            userId:req['userId']
        
        }

        console.log(obj);


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
        console.log(body)

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
            })
    }

}