import { UsersProfileComponent } from "./core/user-profile/user-profile.component";
import { UsersProfileServiceImpl } from "./core/user-profile/users-profile-impl.service";
import { UsersImplModule } from "./core/users-impl.module";
import { LocationsComponent } from "./core/locations/locations.component";
import { MySqlUsersRepository } from "./dao/my-sql/repositories/my-sql-users.repository";
import { MySqlLocationsRepository } from "./dao/my-sql/repositories/my-sql-locations.repository";
import { MySqlUserDocumentsRepository } from "./dao/my-sql/repositories/my-sql-user-documents.repository";
import { MySqlUsersIDVerificationsRepository } from "./dao/my-sql/repositories/my-sql-users-id-verifications.repository";
import { TODDocumentsModule } from "../e-documents";

//make repositories;
const mysqlUsersProfileRepo = new MySqlUsersRepository();
const mysqlLocationsRepo = new MySqlLocationsRepository();
const mysqlUserDocumentsRepo = new MySqlUserDocumentsRepository();
const mysqlIdVerificationRepo = new MySqlUsersIDVerificationsRepository();

//services
const genericService = new UsersProfileServiceImpl(mysqlUsersProfileRepo, mysqlIdVerificationRepo);

//components
const usersComponent = new UsersProfileComponent(genericService);
// const locationsComponent = new LocationsComponent();


const TODUsersModule = new UsersImplModule(usersComponent,null,TODDocumentsModule);


export {
    TODUsersModule,
    usersComponent
}