import { IProviderServicesService } from "./i-provider-services.service";
import { IProviderService } from "../../../../models/provider-service";
import { IProviderServicesRepository } from "../../dao/repositories/provider-services.repository";
import { Validate } from "../../../../core/validations/validate.notation";
import { Required } from "../../../../core/validations/validation.function";


export class ProviderServicesImplService implements IProviderServicesService {

    constructor(private _providerServicesRepository: IProviderServicesRepository) { }

    addServiceToProvider(serviceId: any, providerId: any): Promise<IProviderService> {
        throw new Error("Method not implemented.");
    }


    getProviderServiceById(serviceId: any): Promise<IProviderService> {
        throw new Error("Method not implemented.");
    }
    removeServiceFromProvider(id: any): Promise<IProviderService> {
        throw new Error("Method not implemented.");
    }

    @Validate([
        { cb: Required, name: 'serviceId', parameterIndex: 0 },
        { cb: Required, name: 'status', parameterIndex: 1 }])
    changeServiceStatus(serviceId: any, status: any): Promise<IProviderService> {
        throw new Error("Method not implemented.");
    }

    @Validate([{ cb: Required, name: 'providerProfileId', parameterIndex: 0 }])
    async   getAllProviderHealthService(providerId: any): Promise<IProviderService[]> {
        const serivces = await this._providerServicesRepository.getAllProviderServiceByProviderProfileId(providerId);
        return serivces;
    }
}