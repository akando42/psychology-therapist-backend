import { MySqlCabinetsRepository } from "./dao/my-sql/repositories/my-sql-cabinet.repository";
import { CabinetsImplService } from "./core/cabinet/cabinet-impl.service";
import { CabinetComponent } from "./core/cabinet/cabinet.component";
import { MySqlAdminProfilesRepository } from "./dao/my-sql/repositories/my-sql-admin-profiles.repository";
import { AdminProfilesImplService } from "./core/admin-profile/admin-profiles-impl";
import { AdminProfilesComponent } from "./core/admin-profile/admin-profiles.component";
import { AdminModuleImpl } from "./core/admin-impl.module";
import { CabinetInvitationsImplService } from "./core/cabinet/cabinet-invitation-impl.service";
import { MySqlCabinetInvitationsRepository } from "./dao/my-sql/repositories/my-sql-cabinet-invitations.repository";
import { TODCommunicationModule } from "../communication/core/tod-communication.module";
import { TODCommunicationModuleInstance } from "../communication";
import { TODUsersModule } from "../users";

//cabinet
//repositories
const mySqlcabinetRepo = new MySqlCabinetsRepository();
const mysqlAdminProfileRepo = new MySqlAdminProfilesRepository();
const mysqlInvitationRepo = new MySqlCabinetInvitationsRepository();
// services
const cabinetService = new CabinetsImplService(mySqlcabinetRepo);
const adminProfileService = new AdminProfilesImplService(mysqlAdminProfileRepo);
const cabinetInvitatonService = new CabinetInvitationsImplService(mysqlInvitationRepo);

// component
const TODCabinetComponent = new CabinetComponent(cabinetService, cabinetInvitatonService);
const TODAdminProfileComponent = new AdminProfilesComponent(adminProfileService);
// console.log(mysqlAdminProfileRepo)
//module
const TODAdminModule = new AdminModuleImpl(
    TODAdminProfileComponent,
    TODCabinetComponent,
    TODCommunicationModuleInstance,
    TODUsersModule
);

export {
    TODAdminProfileComponent,
    TODCabinetComponent,
    TODAdminModule
}