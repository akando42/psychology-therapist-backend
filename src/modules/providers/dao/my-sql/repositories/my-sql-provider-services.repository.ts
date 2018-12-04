
import { IProviderDisponibility } from "../../../../../models/provider-disponibility";
import { IProviderDisponibilityRepository } from "../../repositories/provider-disponibility.repository";
import { ByNameRepository } from "../../../../../core/repositories/by-name-repository.notation";
import { IProviderServicesRepository } from "../../repositories/provider-services.repository";
import { IProviderService } from "../../../../../models/provider-service";

const propsMatch = {
    serviceID: 'HealthServiceID',
    providerId: 'ProviderProfileID',
    status: 'Status',
    documentId: 'DocumentID'
}

@ByNameRepository('PROVIDER_HEALTH_SERVICE', {
    converterProps: propsMatch,
    primaryKey: 'ProviderHealthServiceID',
    resourceName: 'Provider Service'
})
export class MySqlProviderServicesRepository implements IProviderServicesRepository {
    getAllProviderServiceByProviderProfileId(id: number): Promise<IProviderService[]> {
        return null;
    }
    createProviderService(service: IProviderService): Promise<IProviderService> {
        return null;
    }
    updateProviderService(service: IProviderService): Promise<IProviderService> {
        return null;
    }
    getProviderServiceById(id: any): Promise<IProviderService> {
        return null;
    }
}

