import { MySqlUsersRepository } from "./dao/repositories/my-sql-users.repository";
import { UsersProfileComponent } from "./core/user-profile/user-profile.component";
import { UsersProfileServiceImpl } from "./core/user-profile/users-profile-impl.service";
import { UsersImplModule } from "./core/users-impl.module";
import { MySqlLocationsRepository } from "./dao/repositories/my-sql-locations.repository";
import { LocationsComponent } from "./core/locations/locations.component";

//make repositories;
const mysqlUsersProfileRepo = new MySqlUsersRepository();
const mysqlLocationsRepo = new MySqlLocationsRepository();
//services
const genericService = new UsersProfileServiceImpl(mysqlUsersProfileRepo);

//components
const usersComponent = new UsersProfileComponent(genericService);
// const locationsComponent = new LocationsComponent();


const TODUsersModule = new UsersImplModule(usersComponent);


export {
    TODUsersModule
}