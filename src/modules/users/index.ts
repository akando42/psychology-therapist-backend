import { UsersProfileComponent } from "./core/user-profile/user-profile.component";
import { UsersProfileServiceImpl } from "./core/user-profile/users-profile-impl.service";
import { UsersImplModule } from "./core/users-impl.module";
import { MySqlUsersRepository } from "./dao/my-sql/repositories/my-sql-users.repository";
import { MySqlLocationsRepository } from "./dao/my-sql/repositories/my-sql-locations.repository";
import { MySqlUserDocumentsRepository } from "./dao/my-sql/repositories/my-sql-user-documents.repository";
import { MySqlUsersIDVerificationsRepository } from "./dao/my-sql/repositories/my-sql-users-id-verifications.repository";
import { TODDocumentsModule } from "../e-documents";
import { MySqlPhoneNumbersRepository } from "./dao/my-sql/repositories/my-sql-phone-number.repository";
import { PhoneNumberImplService } from "./core/phone-number/phone-number-impl.service";
import { LocationsImplService } from "./core/locations/locations-impl.service";

//make repositories;
const mysqlUsersProfileRepo = new MySqlUsersRepository();
const mysqlLocationsRepo = new MySqlLocationsRepository();
const mysqlIdVerificationRepo = new MySqlUsersIDVerificationsRepository();
const mysqlPhoneNumberRepo = new MySqlPhoneNumbersRepository();
//services

const TODUserProfileService = new UsersProfileServiceImpl(mysqlUsersProfileRepo, mysqlIdVerificationRepo);
const TODPhoneNumberService = new PhoneNumberImplService(mysqlPhoneNumberRepo);
const TODLocationService = new LocationsImplService(mysqlLocationsRepo);
//components
const usersComponent = new UsersProfileComponent(
    TODUserProfileService,
    TODLocationService,
    TODPhoneNumberService);


const TODUsersModule = new UsersImplModule(usersComponent, TODDocumentsModule);


export {
    TODUsersModule,
    TODUserProfileService,
    usersComponent
}