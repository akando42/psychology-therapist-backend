import { IProviderService } from "../../../../models/provider-service";
import { ProviderServiceStatusEnum } from "../../../../enums/provider-service-status.enum";


export interface IProviderServicesService {

    addServiceToProvider(serviceId: any, providerId: any): Promise<IProviderService>;

    getProviderServiceById(serviceId: any): Promise<IProviderService>;

    removeServiceFromProvider(id: any): Promise<IProviderService>;

    changeServiceStatus(id: any, status: ProviderServiceStatusEnum): Promise<IProviderService>;

    getAllProviderHealthService(providerId: any): Promise<IProviderService[]>;

    moveProviderServiceToDocumentReview(service: IProviderService): Promise<IProviderService>;

}