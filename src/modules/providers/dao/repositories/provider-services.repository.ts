import { IProviderService } from "../../../../models/provider-service";



export interface IProviderServicesRepository {

    getAllProviderServiceByProviderProfileId(id: number): Promise<IProviderService[]>;

    createProviderService(service: IProviderService): Promise<IProviderService>;

    updateProviderService(service: IProviderService): Promise<IProviderService>;

    getProviderServiceById(id: any): Promise<IProviderService>;
}