import { AbstractHealthServiceRepository } from "../health-service.repository";
import { IHealthService } from "../../../../models/health-service";



export class MySqlHealthServiceRepository extends AbstractHealthServiceRepository {
    constructor(dao, converter) {
        super(dao, converter);
    }
    createService(service: IHealthService): Promise<IHealthService> {
        throw new Error("Method not implemented.");
    }
    deleteService(id: string | number): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    updateService(id: string | number, updatedEntity: IHealthService): Promise<IHealthService> {
        throw new Error("Method not implemented.");
    }
}

