import { IProviderService } from "../../../../models/provider-service";


export interface IProviderServicesService {

    addServiceToProvider(serviceId: any, providerId: any): Promise<IProviderService>;

    getProviderServiceById(serviceId: any): Promise<IProviderService>;

    removeServiceFromProvider(id: any): Promise<IProviderService>;

    changeServiceStatus(id: any, status: any): Promise<IProviderService>;

    getAllProviderHealthService(providerId: any): Promise<IProviderService[]>;

}