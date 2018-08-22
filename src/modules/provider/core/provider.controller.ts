import { Provider } from './../../../entity/provider';
import { ProviderServiceInstance, ProviderService } from "./provider.service";
import { TODResponse } from '../../../dto/tod-response';


export class ProviderController {
	constructor(public providerService: ProviderService) {
	}

	saveProvider(provider: Provider): Promise<TODResponse> {
		return new Promise(async (resolve, reject) => {
			const response: TODResponse = new TODResponse();
			try {
				const savedProvider = this.providerService.save(provider);
				response.message = "successfully registered provider!";
				response.payload = savedProvider;
				response.timestamp = new Date();
				resolve(response);
			} catch (e) {
				response.message = "provider could not be registered!";
				response.timestamp = new Date();
				response.error = e;
				resolve(response)
			}
		});
	}

	getProvider(providerId: number): Promise<TODResponse> {
		return new Promise(async (resolve, reject) => {
			const response: TODResponse = new TODResponse();
			try {
				const provider = await this.providerService.findOne({ id: providerId });
				response.message = "provider found!";
				response.payload = provider;
				response.timestamp = new Date();
				resolve(response);
			} catch (e) {
				response.message = "provider not found!";
				response.timestamp = new Date();
				response.error = e;
				resolve(response)
			}
		});
	}

	getAllProvider(): Promise<TODResponse> {
		return new Promise(async (resolve, reject) => {
			const response: TODResponse = new TODResponse();
			try {
				const provider = await this.providerService.findAll();
				response.message = "success!";
				response.payload = provider;
				response.timestamp = new Date();
				resolve(response);
			} catch (e) {
				response.message = "something was wrong!";
				response.timestamp = new Date();
				response.error = e;
				resolve(response)
			}
		});
	}

	delete(providerId: number): Promise<TODResponse> {
		return new Promise(async (resolve, reject) => {
			const response: TODResponse = new TODResponse();
			try {
				const provider = await this.providerService.delete(providerId);
				response.message = "provider deleted!";
				response.payload = true;
				response.timestamp = new Date();
				resolve(response);
			} catch (e) {
				response.message = "provider not found!";
				response.timestamp = new Date();
				response.error = e;
				resolve(response)
			}
		});
	}


}
export const ProviderControllerInstance: ProviderController =
	new ProviderController(ProviderServiceInstance);