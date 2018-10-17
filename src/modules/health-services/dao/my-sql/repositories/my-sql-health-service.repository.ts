import { IHealthServiceRepository } from "../../health-service.repository";
import { IHealthService } from "../../../../../models/health-service";
import { ByNameRepository } from "../../../../../core/repositories/by-name-repository.notation";

const propsMatch = {
    description: 'HealthServiceDescription',
    id: 'HealthServiceID',
    name: 'HealthServiceName'
}
@ByNameRepository('Health_Service', {
    converterProps: propsMatch,
    primaryKey: 'HealthServiceID',
    resourceName: 'Health Service'
})
export class MySqlHealthServiceRepository implements IHealthServiceRepository {

    getHealthServiceById(id:any):Promise<IHealthService> { return null; }

    createHealthService(service: IHealthService): Promise<IHealthService> { return null; }

    deleteHealthService(id: string | number): Promise<boolean> { return null; }

    updateHealthService(id: string | number, updatedEntity: IHealthService): Promise<IHealthService> { return null; }
}

