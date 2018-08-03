import { Router, Request, Response } from "express";
import { IWriteReadController } from "@core/behaviors/controllers/write-read-controller.interface";
import { IAdminProfile } from "@core/models/admin-profile";
import { AdminProfileControllerInstance } from "@core/modules/admin/sub-modules/profiles/admin-profile.controller";

export class AdminProfileRouter {

    private resourcePath: string = 'profile';

    constructor(private _controller: IWriteReadController<IAdminProfile>) {
    }


    init(): Router {
        const router: Router = Router();

        //Get Resource
        router.get(`/${this.resourcePath}/`, this.getAll.bind(this));
        //Delete Resource
        router.delete(`/${this.resourcePath}/:id`, this.delete.bind(this));
        //Create Resource
        router.post(`/${this.resourcePath}`, this.create.bind(this));
        //Update Resource
        router.post(`/${this.resourcePath}/:id`, this.update.bind(this));
        return router;
    }




    getAll(req: Request, res: Response): void {

        this._controller.getAllBy({})
            .then((result: IAdminProfile[]) => {

                //sent the response.
                res.status(200).json(result);

            }).catch((err) => {
                //handler error propertly
                console.log(err)
            });

    }

    update(req: Request, res: Response) {
        this._controller.update(req.params['id'], req.body)
            .then((result: IAdminProfile) => {
                //sent the response.
                res.status(200).json(result);

            }).catch((err) => {
                //handler error propertly
                console.log(err)
            });
    }


    create(req: Request, res: Response) {
        this._controller.create(req.body)
            .then((result: IAdminProfile) => {
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


export const AdminProfileRouterInstance: AdminProfileRouter = new AdminProfileRouter(AdminProfileControllerInstance);
