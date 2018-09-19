import { MySqlCabinetsRepository } from "./dao/my-sql/repositories/my-sql-cabinet.repository";
import { CabinetsImplService } from "./core/cabinet/cabinet-impl.service";
import { CabinetCompont } from "./core/cabinet/cabinet.component";
import { MySqlAdminProfilesRepository } from "./dao/my-sql/repositories/my-sql-admin-profiles.repository";
import { AdminProfilesImplService } from "./core/admin-profile/admin-profiles-impl";
import { AdminProfilesComponent } from "./core/admin-profile/admin-profiles.component";
import { AdminModuleImpl } from "./core/admin-impl.module";

//cabinet
//repositories
const mySqlcabinetRepo = new MySqlCabinetsRepository();
const mysqlAdminProfileRepo = new MySqlAdminProfilesRepository();
// services
const cabinetService = new CabinetsImplService(mySqlcabinetRepo);
const adminProfileService = new AdminProfilesImplService(mysqlAdminProfileRepo);

// component
const cabinetComponent = new CabinetCompont(cabinetService);
const adminProfileComponent = new AdminProfilesComponent(adminProfileService);

//module
const TODAdminModule = new AdminModuleImpl(adminProfileComponent);

export {
    cabinetComponent,
    TODAdminModule
}