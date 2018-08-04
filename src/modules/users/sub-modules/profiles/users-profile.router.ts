import { Router, Request, Response } from "express";
import { UsersProfileControllerInstance } from "./users-profile.controller";
import { IWriteReadController } from "../../../../behavior/controllers/write-read-controller.interface";
import { IUserProfile } from "../../../../models/User-profile";

export class UsersProfileRouter {

    private resourcePath: string = 'profile';

    constructor(private _controller: IWriteReadController<IUserProfile>) {
    }


    init(): Router {
        const router: Router = Router();

        //Get Resource
        router.get(`/Users/:Users_id/${this.resourcePath}`, this.getById.bind(this));
        //Delete Resource
        router.delete(`/Users/:Users_id//${this.resourcePath}/:id`, this.delete.bind(this));
        //Create Resource
        router.post(`/Users/:Users_id//${this.resourcePath}`, this.create.bind(this));
        //Update Resource
        router.put(`/Users/:Users_id//${this.resourcePath}`, this.update.bind(this));
        return router;
    }




    getAll(req: Request, res: Response): void {
        console.log(req.params)
        // console.log(req)
        this._controller.getAllBy({})
            .then((result: IUserProfile[]) => {

                //sent the response.
                res.status(200).json(result);

            }).catch((err) => {
                //handler error propertly
                console.log(err)
            });

    }

    update(req: Request, res: Response) {

        this._controller.update(req.body['id'], req.body)
            .then((result: IUserProfile) => {
                //sent the response.
                res.status(200).json(result);

            }).catch((err) => {
                //handler error propertly
                console.log(err)
            });
    }

    getById(req: Request, res: Response) {
        this._controller['getById'](req.params['Users_id'])
            .then((result: IUserProfile) => {
                //sent the response.
                res.status(200).json(result);

            }).catch((err) => {
                //handler error propertly
                res.status(500).json
                    ({ message: 'We are sorry, something did just happend to the earth magnetic field!' });
                console.log('from the router', err)
            });
    }

    create(req: Request, res: Response) {
        this._controller.create(req.body)
            .then((result: IUserProfile) => {
                //sent the response.
                res.status(200).json(result);

            }).catch((err) => {
                //handler error propertly
                console.log(err)
            });
    }

    delete(req: Request, res: Response) {
        this._controller.delete(req.params['id'])
            .then((result: { id: string, success: boolean }) => {
                //sent the response.
                res.status(200).json(result);

            }).catch((err) => {
                //handler error propertly
                console.log(err)
            });
    }
}


export const UsersProfileRouterInstance: UsersProfileRouter = new UsersProfileRouter(UsersProfileControllerInstance);
