

export interface IProviderServicesService {

    addServiceToProvider(serviceId: any, providerId: any): Promise<any>;

    removeServiceFromProvider(id: any): Promise<any>;

    changeServiceStatus(id: any, status: any): Promise<any>;


}