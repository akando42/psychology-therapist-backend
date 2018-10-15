import { IHealthServiceService } from "./i-health-service.service";
import { IHealthService } from "../../../../models/health-service";

export function CRUDComponent(){
    return (target)=>{
        
    }
}

export class HealthServiceComponent {
    constructor(
        private _healthServicesService: IHealthServiceService
    ) { }

    /**
     * Create a health service.
     * @param service 
     */
    async createHeathService(service: IHealthService) {
        const serviceCreated = await this._healthServicesService.createService(service);
        return serviceCreated;
    }


}