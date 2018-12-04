import { IHealthServiceService } from "./i-health-service.service";
import { IHealthService } from "../../../../models/health-service";
import { ComposeValidation } from "../../../../core/validations/validate.notation";
import { Required } from "../../../../core/validations/validation.function";
import { IHealthServiceRepository } from "../../dao/health-service.repository";


export class HeatlhServiceImplService implements IHealthServiceService {

    constructor(private _heathServiceRepository: IHealthServiceRepository) { }

    @ComposeValidation([{
        index: 0, validators: [
            { cb: Required, name: 'name' },
            { cb: Required, name: 'description' },
        ]
    }])
    async createService(service: IHealthService): Promise<IHealthService> {

        const serviceCreated = await this._heathServiceRepository.createHealthService(service);
        return serviceCreated;
    }

    deleteService(id: string | number): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    updateService(id: string | number, updatedEntity: IHealthService): Promise<IHealthService> {
        throw new Error("Method not implemented.");
    }

    async getServiceById(id): Promise<IHealthService> {
        const service = await this._heathServiceRepository.getHealthServiceById(id);
        return service;
    }


}