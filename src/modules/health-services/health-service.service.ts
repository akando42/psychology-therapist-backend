import { IHealthService } from "../../models/health-service";


export interface IHealthServiceService {

    createService(service: IHealthService): Promise<IHealthService>
}