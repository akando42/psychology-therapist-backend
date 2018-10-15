import { IHealthService } from "../../../../models/health-service";


export interface IHealthServiceService {

    createService(service: IHealthService): Promise<IHealthService>;

    deleteService(id: number | string): Promise<boolean>;

    updateService(id: number | string, updatedEntity: IHealthService): Promise<IHealthService>;

    getServiceById(id): Promise<IHealthService>;
}