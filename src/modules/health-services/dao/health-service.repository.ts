import { IHealthService } from "../../../models/health-service";

export interface IHealthServiceRepository {

    createHealthService(service: IHealthService): Promise<IHealthService>;

    deleteHealthService(id: number | string): Promise<boolean>;

    updateHealthService(id: number | string, updatedEntity: IHealthService): Promise<IHealthService>

    getHealthServiceById(id: any): Promise<IHealthService>;

}