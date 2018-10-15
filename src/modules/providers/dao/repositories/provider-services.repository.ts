import { IProviderService } from "../../../../models/provider-service";



export interface IProviderServicesRepository {

    getAllProviderServiceByProviderProfileId(id: number): Promise<IProviderService[]>;
    
    createProviderService(): Promise<IProviderService>;
}