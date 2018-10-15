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
import { TODUsersModule, TODUserProfileService } from "../users";
import { MySqlAdminInvitationsRepository } from "./dao/my-sql/repositories/my-sql-admin-invitations.repository.";
import { AdminInvitationImplService } from "./core/admin-invitations/admin-invitation-impl";
import { AdminInvitationComponent } from "./core/admin-invitations/admin-invitations.component";
import { MySqlSuperAdminProfileRepository } from "./dao/my-sql/repositories/my-sql-super-admin-profile.repository";
import { SuperAdminImplService } from "./core/super-admin/super-admin-impl.service";
import { TODSystemDocService, TODRequiredDocumentReportService } from "../e-documents";

//cabinet
//repositories
const mySqlcabinetRepo = new MySqlCabinetsRepository();
const mysqlAdminProfileRepo = new MySqlAdminProfilesRepository();
const mysqlInvitationRepo = new MySqlCabinetInvitationsRepository();
const mysqlAdminInvitationRepo = new MySqlAdminInvitationsRepository();
const mysqlSuperAdminProfileRepo = new MySqlSuperAdminProfileRepository();
// services
const cabinetService = new CabinetsImplService(mySqlcabinetRepo);
const adminProfileService = new AdminProfilesImplService(mysqlAdminProfileRepo);
const cabinetInvitatonService = new CabinetInvitationsImplService(mysqlInvitationRepo);
const adminInvitationService = new AdminInvitationImplService(mysqlAdminInvitationRepo);
const superAdminProfileService = new SuperAdminImplService(mysqlSuperAdminProfileRepo);
// component
const TODCabinetComponent = new CabinetComponent(cabinetService, cabinetInvitatonService);
const TODAdminProfileComponent = new AdminProfilesComponent(adminProfileService, superAdminProfileService,
    TODSystemDocService, TODRequiredDocumentReportService);
const TODAdminInvitationsComponent = new AdminInvitationComponent(
    adminInvitationService, TODUserProfileService, TODCommunicationModuleInstance)
// console.log(mysqlAdminProfileRepo)
//module
const TODAdminModule = new AdminModuleImpl(
    TODAdminProfileComponent,
    TODCabinetComponent,
    TODAdminInvitationsComponent,
    TODCommunicationModuleInstance,
    TODUsersModule
);

export {
    TODAdminProfileComponent,
    TODCabinetComponent,
    TODAdminModule
}