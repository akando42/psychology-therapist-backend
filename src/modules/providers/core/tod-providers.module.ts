import { AbstractProviderModule } from "./abstract-providers.module";
import { IProviderDisponibility } from "../../../models/provider-disponibility";
import { TODResponse } from "../../../dto/tod-response";


export class TODProvidersModule extends AbstractProviderModule {

    constructor(
        providerProfileComponent,
        providerServicesComponent
    ) {
        super(providerProfileComponent, providerServicesComponent)
    }
    async setProviderDisponibility(disponibility: IProviderDisponibility): Promise<TODResponse> {
        try {
            const disponibilityCreated = this._providerProfileComponent.setProviderDisponibility(disponibility);
            this._createTODDTO(disponibility, null);
        } catch (error) {
            return this._createTODDTO(null, error);
        };
    }
    async getProviderDisponibility(providerProfileId: string | number): Promise<TODResponse> {
        try {
            const disponibility = this._providerProfileComponent.getProviderDisponibility(providerProfileId);
            this._createTODDTO(disponibility, null);
        } catch (error) {
            return this._createTODDTO(null, error);
        };
    }
    async getProviderServices(providerProfileId: string | number): Promise<TODResponse> {
        try {
            const services = this._providerServicesComponent.getProviderServices(providerProfileId);
            this._createTODDTO(services, null);
        } catch (error) {
            return this._createTODDTO(null, error);
        };
    }
    async addNewProviderServices(serviceId: string | number, providerId): Promise<TODResponse> {
        try {
            const serviceAdded = await this._providerServicesComponent.addServiceToProviderProfile(serviceId, providerId)
            return this._createTODDTO(serviceAdded, null);
        } catch (error) {
            return this._createTODDTO(null, error);
        };
    }

    protected _createTODDTO(payload: any, error?: any): TODResponse {
        return {
            error: error || null,
            message: 'succefully',
            timestamp: new Date(),
            payload: payload || null
        }
    }
}