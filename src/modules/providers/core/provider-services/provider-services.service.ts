import { IProviderServicesService } from "./i-provider-services.service";
import { IProviderService } from "../../../../models/provider-service";
import { IProviderServicesRepository } from "../../dao/repositories/provider-services.repository";
import { Validate, ComposeValidation } from "../../../../core/validations/validate.notation";
import { Required } from "../../../../core/validations/validation.function";
import { ProviderServiceStatusEnum } from "../../../../enums/provider-service-status.enum";
import { isNullOrUndefined } from "util";


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
    async changeServiceStatus(serviceId: any, status: ProviderServiceStatusEnum): Promise<IProviderService> {
        const service = await this._providerServicesRepository.getProviderServiceById(serviceId);

        if (isNullOrUndefined(service)) {
            throw { message: 'service dont exist' };

        }
        service.status = status;
        const updated = this._providerServicesRepository.updateProviderService(service);
        return updated;
    }

    @Validate([{ cb: Required, name: 'providerProfileId', parameterIndex: 0 }])
    async   getAllProviderHealthService(providerId: any): Promise<IProviderService[]> {
        const serivces = await this._providerServicesRepository.getAllProviderServiceByProviderProfileId(providerId);
        return serivces;
    }

    @ComposeValidation([{
        index: 0, validators: [
            { name: 'serviceId', cb: Required },
            { name: 'documentId', cb: Required },
            { name: 'id', cb: Required }
        ]
    }])
    async moveProviderServiceToDocumentReview(service: IProviderService): Promise<IProviderService> {
        service.status = ProviderServiceStatusEnum.DOCUMENT_UNDER_REVIEW;
        const updatedService = await this._providerServicesRepository.updateProviderService(service);
        return updatedService;
    }
}