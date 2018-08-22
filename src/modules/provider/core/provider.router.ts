import { Router, Request, Response } from "express";
import { ProviderController, ProviderControllerInstance } from "./provider.controller";
import { logger } from "../../utils/logger";



export class ProviderRouter {
	constructor(private providerController: ProviderController) {
	}


	init(): Router {
		logger.info("Starting provider module...");

		const router: Router = Router({ mergeParams: true });

		router.post(`/`, (req: Request, res: Response) => this.handleCreateProvider(req, res));

		router.get(`/providers/:provider_id/`, (req: Request, res: Response) => this.handleGetProvider(req, res))

		logger.info("provider module initialized correctly");

		return router;
	}

	handleCreateProvider(req: Request, res: Response): void {
		this.providerController.saveProvider(req.body)
			.then((result) => {
				res.status(200).json(result);
			})
			.catch((error) => {
				console.log(error);
			})
	}

	handleGetProvider(req: Request, res: Response): void {
		console.log(req.params)
		this.providerController.getProvider(req.params['provider_id'])
			.then((result) => {
				res.status(200).json(result);
			})
			.catch((error) => {
				console.log(error);
			})
	}


}

export const ProviderRouterInstance: ProviderRouter =
	new ProviderRouter(ProviderControllerInstance);