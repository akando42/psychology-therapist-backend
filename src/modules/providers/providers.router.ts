import { Router, Request, Response } from "express";
import { TODProvidersModuleInstance } from ".";
import { TokenValidationMiddleware } from "../../middlewares/token-validation.middleware";


export class ProvidersRouter {
    constructor() { }

    init(): Router {
        let router = Router();
        router.get('providers/services', TokenValidationMiddleware, this.getProviderServices.bind(this));
        router.post('providers/services', TokenValidationMiddleware, this.addProviderServices.bind(this));

        router.get('providers/disponibility', TokenValidationMiddleware, this.getProviderDisponibility.bind(this));
        router.post('providers/disponibility', TokenValidationMiddleware, this.setProviderDisponibility.bind(this));


        return router;
    }
    async getProviderServices(req: Request, res: Response) {
        try {
            let response = await TODProvidersModuleInstance
                .getProviderServices(req['roleId']);

            res.status(200).send(response);
        } catch (error) {

            res.status(400).send(error);
        }
    }
    addProviderServices(req: Request, res: Response) {

        const { serviceId } = req.body;

        TODProvidersModuleInstance.addNewProviderServices(serviceId, req['roleId'])
            .then((response) => {
                res.status(200).send(response);
            })
            .catch((error) => {
                res.status(400).send(error);
            });
    }
    getProviderDisponibility(req: Request, res: Response) {
        TODProvidersModuleInstance.getProviderServices(req['roleId'])
            .then((response) => {
                res.status(200).send(response);
            })
            .catch((error) => {
                res.status(400).send(error);
            });
    }

    setProviderDisponibility(req: Request, res: Response) {
        TODProvidersModuleInstance.setProviderDisponibility(req.body)
            .then((response) => {
                res.status(200).send(response);
            })
            .catch((error) => {
                res.status(400).send(error);
            });
    }
}