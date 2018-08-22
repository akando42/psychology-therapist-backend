import { logger } from '../../utils/logger';
import { Provider } from "../../../entity/provider";
import { CrudService } from "./interface/crud-service";
import { getManager } from "typeorm";
import { isUndefined } from "util";
import { ServiceException } from "./exception/service.exception";

export class ProviderService implements CrudService<Provider> {

	constructor() {

	}


	save(entity: Provider): Promise<Provider> {
		return new Promise(async (resolve, reject) => {
			try {
				logger.debug(`trying to save provider ${entity}`);

				const providerRepository = getManager().getRepository(Provider);

				await providerRepository.save(entity);

				logger.debug(`saved provider ${entity.id}`);

				resolve(entity);
			} catch (e) {
				logger.error(e);
				reject(e)
			}
		});
	}


	delete(id: number): Promise<Provider> {
		return new Promise(async (resolve, reject) => {
			try {
				const providerRepository = getManager().getRepository(Provider);
				let providerToDelete: Provider = await providerRepository.findOne(id);

				if (!isUndefined(providerToDelete)) {
					providerToDelete.enable = false;

					providerToDelete = await providerRepository.save(providerToDelete);

					resolve(providerToDelete);
				} else {
					reject(new ServiceException(`Not provider found for id "${id}"`
						, 404));
				}

			} catch (e) {
				logger.error(e);
				reject(e)
			}
		});
	}

	findOne(query: any): Promise<Provider> {
		return new Promise(async (resolve, reject) => {
			try {
				logger.info(`Looking for provider with query = ${JSON.stringify(query)}`);

				const providerRepository = getManager().getRepository(Provider);
				const provider: Provider = await providerRepository.findOne(query);

				if (!isUndefined(provider)) {
					resolve(provider);
				} else {
					reject(new ServiceException(`Not provider found for  "${JSON.stringify(query)}"`
						, 404));
				}

			} catch (e) {
				logger.error(e);
				reject(e)
			}
		});
	}


	findAll(): Promise<Provider[]> {
		return new Promise(async (resolve, reject) => {
			try {

				logger.info(`Looking for all providers`);
				const providerRepository = getManager().getRepository(Provider);

				const providers: Provider[] = await providerRepository.find();

				resolve(providers);
			} catch (e) {
				logger.error(e);
				reject(e)
			}
		});
	}




}


export const ProviderServiceInstance: ProviderService = new ProviderService();