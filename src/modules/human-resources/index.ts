import { MySqlHRProfilesRepository } from "./dao/my-sql/repositories/my-sql-hr-profiles.repository";
import { HRProfilesImplService } from "./core/hr-profile/hr-profiles-impl";
import { HRProfilesComponent } from "./core/hr-profile/hr-profiles.component";
import { HumanResourcesModule } from "./core/human-resources.module";


//repositories
const mysqlHrProfilesRepo = new MySqlHRProfilesRepository();

//services
const profilesService = new HRProfilesImplService(mysqlHrProfilesRepo);

//components
const profilesComponent = new HRProfilesComponent(profilesService);


const TODHumanResourcesModule = new HumanResourcesModule(profilesComponent);

export {
    TODHumanResourcesModule
}

