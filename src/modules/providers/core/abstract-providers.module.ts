import { ProviderProfileComponent } from "./provider-profile/provider.profile.component";
import { ProviderServicesComponent } from "./provider-services/provider-services.component";
import { IProviderDisponibility } from "../../../models/provider-disponibility";




export abstract class ProviderModule {
    constructor(
        protected _providerProfileComponent: ProviderProfileComponent,
        protected _providerServicesComponent: ProviderServicesComponent
    ) { }

    abstract setDisponibility(disponibility: IProviderDisponibility): Promise<any>;

    abstract getProviderDisponibility(providerProfileId: number | string): Promise<any>;

    abstract getProviderServices(providerProfileId: number | string): Promise<any>;
    
    abstract addNewProviderServices(providerProfileId: number | string): Promise<any>;
        

}