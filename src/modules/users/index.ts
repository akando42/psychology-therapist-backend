import { MySqlUsersRepository } from "./dao/repositories/my-sql-users.repository";
import { UsersProfileComponent } from "./core/user-profile/user-profile.component";
import { UsersProfileServiceImpl } from "./core/user-profile/users-profile-impl.service";
import { UsersImplModule } from "./core/users-impl.module";
import { MySqlLocationsRepository } from "./dao/repositories/my-sql-locations.repository";
import { LocationsComponent } from "./core/locations/locations.component";
import { UsersDocumentServiceImpl } from "./core/documents/users-document-impl.service";
import { MySqlUserDocumentsRepository } from "./dao/repositories/my-sql-user-documents.repository";
import { MySqlRawDocumentRepository } from "./dao/repositories/my-sql-raw-documents.repository";
import { UserDocumentsComponent } from "./core/documents/user-documents.component";

//make repositories;
const mysqlUsersProfileRepo = new MySqlUsersRepository();
const mysqlLocationsRepo = new MySqlLocationsRepository();
const mysqlUserDocumentsRepo = new MySqlUserDocumentsRepository();
const mysqlRawDocumentsRepo = new MySqlRawDocumentRepository();

//services
const genericService = new UsersProfileServiceImpl(mysqlUsersProfileRepo);
const userDocumentService = new UsersDocumentServiceImpl(mysqlUserDocumentsRepo, mysqlRawDocumentsRepo);

//components
const usersComponent = new UsersProfileComponent(genericService);
const usersDocumentsComponent = new UserDocumentsComponent(userDocumentService);
// const locationsComponent = new LocationsComponent();


const TODUsersModule = new UsersImplModule(usersComponent, usersDocumentsComponent);


export {
    TODUsersModule,
    usersComponent
}