import { MySqlHealthServiceRepository } from "./dao/my-sql/repositories/my-sql-health-service.repository";
import { HeatlhServiceImplService } from "./core/health-service/health-service-impl.service";
import { HealthServiceComponent } from "./core/health-service/health-service.component";


//REPOSITORIES
//respositories for handle services, this are for system services.
const mysqlHealthServiceRepository = new MySqlHealthServiceRepository();

//SERVICES
//only for handle system health services, as catalog resource.
const TODHealthServiceService = new HeatlhServiceImplService(mysqlHealthServiceRepository);

const TODHealthServiceComponent = new HealthServiceComponent(TODHealthServiceService);


export {
    TODHealthServiceService
}