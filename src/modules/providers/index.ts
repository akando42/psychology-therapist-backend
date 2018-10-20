import { MySqlProviderProfileRepository } from "./dao/my-sql/repositories/my-sql-provider-profile.repository";
import { MySqlProviderServicesRepository } from "./dao/my-sql/repositories/my-sql-provider-services.repository";
import { MySqlProviderDisponibilityRepository } from "./dao/my-sql/repositories/my-sql-provider-disponibilty.repository";
import { ProvidersProfileImplService } from "./core/provider-profile/provider-profile-impl.service";
import { ProviderServicesImplService } from "./core/provider-services/provider-services.service";
import { ProviderDisponibilityImplService } from "./core/provider-disponibility/provider-disponibility-impl.service";
import { ProviderProfileComponent } from "./core/provider-profile/provider.profile.component";
import { ProviderServicesComponent } from "./core/provider-services/provider-services.component";
import { TODDocumentsService, TODRequiredDocumentReportService, TODSystemDocService } from "../e-documents";
import { TODHealthServiceService } from "../health-services";
import { TODProvidersModule } from "./core/tod-providers.module";



//REPOSITORIES
//A list of repositories for provider profiles managment, such a services, and so on
const mysqlProviderProfileRepository = new MySqlProviderProfileRepository();
const mysqlProviderServicesRepository = new MySqlProviderServicesRepository();
const mysqlProviderDisponibilityRepository = new MySqlProviderDisponibilityRepository();


// SERVICES
//Services that implemnts the logic for core funcionalities of each resources
//also connect with persisten layer.
const TODProviderProfileService = new ProvidersProfileImplService(mysqlProviderProfileRepository);
const TODProviderHealthServicesServices = new ProviderServicesImplService(mysqlProviderServicesRepository);
const TODProviderDisponibilityService = new ProviderDisponibilityImplService(mysqlProviderDisponibilityRepository);

//COMPONENT
//Components that uses multiples services to make and orchest major level funcionality.

const TODProvidersProfilesComponent = new ProviderProfileComponent(
    TODProviderProfileService,
    TODProviderDisponibilityService,
    TODSystemDocService,
    TODRequiredDocumentReportService);

const TODProviderServicesComponent = new ProviderServicesComponent(
    TODProviderHealthServicesServices,
    TODHealthServiceService,
    TODDocumentsService)

const TODProvidersModuleInstance = new TODProvidersModule(
    TODProvidersProfilesComponent,
    TODProviderServicesComponent
)

export {
    TODProvidersProfilesComponent,
    TODProvidersModuleInstance
}