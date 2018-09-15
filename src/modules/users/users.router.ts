import { Router, Response, Request } from "express";
import { TODUsersModule } from ".";


export class UsersRouter {
    constructor() {

    }

    init(): Router {
        const router: Router = Router();

        router.post('/users/upload-id', this.uploadId.bind(this));

        return router;
    }

    uploadId(req: Request, res: Response): void {

        const { files, body } = <any>req;
        const { document } = files;
        console.log(body)

        TODUsersModule.uploadIDDocument({
            raw: {
                mimeType: document.mimetype,
                blob: document.data
            },
            typeId: body.docInfo
        })
            .then((result) => {
                res.status(200).send(result);
            })
            .catch((err) => {
                res.status(400).send(err);
            })
    }


}