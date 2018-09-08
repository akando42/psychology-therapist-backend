import { IUser } from "../../../models/user";
import { ILocation } from "../../../models/location";
import { LocationsComponent } from "./locations/locations.component";
import { UsersProfileComponent } from "./user-profile/user-profile.component";


export abstract class AbstractUsersModule {
    constructor(
        protected _userProfilesComponent: UsersProfileComponent,
        protected _locationsComponent: LocationsComponent
    ) { }

    abstract createUser(user: IUser, roleId: number): Promise<IUser>;

    abstract updateUser(id: any, model: IUser): Promise<IUser>;

    abstract getUserByEmail(id: string): Promise<IUser>;

    abstract getUserById(id: number): Promise<IUser>;

    abstract addUserLocation(userId: number, location: ILocation): Promise<ILocation>;

    abstract validateUserLocation(locationID: number): Promise<ILocation>;


} 