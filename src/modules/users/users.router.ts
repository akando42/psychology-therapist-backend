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
        TODUsersModule.uploadIDDocument(req.body)
            .then((result) => {
                res.status(200).send(result);
            })
            .catch((err) => {
                res.status(400).send(err);
            })
    }


}