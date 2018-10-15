import { IProviderServicesService } from "./i-provider-services.service";
import { IHealthServiceService } from "../../../health-services/core/health-service/i-health-service.service";
import { IProviderService } from "../../../../models/provider-service";
import { Validate } from "../../../../core/validations/validate.notation";
import { Required } from "../../../../core/validations/validation.function";


export class ProviderServicesComponent {
    constructor(
        private _providerServicesService: IProviderServicesService,
        private _healthServices: IHealthServiceService
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

}