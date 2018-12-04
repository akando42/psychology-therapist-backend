import { IProviderServicesService } from "./i-provider-services.service";
import { IHealthServiceService } from "../../../health-services/core/health-service/i-health-service.service";
import { IProviderService } from "../../../../models/provider-service";
import { Validate } from "../../../../core/validations/validate.notation";
import { Required } from "../../../../core/validations/validation.function";
import { IHealthService } from "../../../../models/health-service";
import { IDocumentService } from "../../../e-documents/core/documents/i-document.service";
import { isNullOrUndefined } from "util";
import { ProviderServiceStatusEnum } from "../../../../enums/provider-service-status.enum";


export class ProviderServicesComponent {
    constructor(
        private _providerServicesService: IProviderServicesService,
        private _healthServices: IHealthServiceService,
        private _documentsUploadService: IDocumentService
    ) { }


    @Validate([
        { cb: Required, name: 'serviceId', parameterIndex: 0 },
        { cb: Required, name: 'providerId', parameterIndex: 1 }
    ])
    async addServiceToProviderProfile(serviceId: any, providerId: any): Promise<IProviderService> {
        //check that the service exist still.
        const service = await this._healthServices.getServiceById(serviceId);
        if (!service) {
            throw { message: 'Sorry but service does not exist.' }
        }

        //service get added to the provider services list.
        const serviceAdded = this._providerServicesService.addServiceToProvider(serviceId, providerId);

        return serviceAdded;
    }


    async getProviderServices(providerProfileId: any): Promise<IProviderService[]> {
        const services = await this._providerServicesService.getAllProviderHealthService(providerProfileId);
        return services;
    }


    async uploadServiceDocument(serviceId: number, file: any): Promise<IProviderService> {

        const existService = await this._providerServicesService.getProviderServiceById(serviceId);
        if (isNullOrUndefined(existService)) {
            throw { message: 'Service does not exist.' }
        }
        //upload file to file system.
        const docRef = await this._documentsUploadService.uploadDocumentToFileSystem(file);
        existService.documentId = docRef.id;

        const updated = await this._providerServicesService.moveProviderServiceToDocumentReview(existService);
        return updated;

    }
}