import { AbstractUsersModule } from "./users.module";
import { IUser } from '../../../models/user';
import { ILocation } from '../../../models/location';
import { UsersProfileComponent } from "./user-profile/user-profile.component";
import { LocationsComponent } from "./locations/locations.component";


export class UsersImplModule extends AbstractUsersModule {
    constructor(
        userProfileComponent: UsersProfileComponent,
        locationComponent?: LocationsComponent
    ) {
        super(userProfileComponent, locationComponent);
    }

    createUser(user: IUser, roleid: number): Promise<IUser> {
        return this._userProfilesComponent.createUserProfile(user);
    }

    updateUser(id: string, model: IUser): Promise<IUser> {
        return this._userProfilesComponent.updateUserProfile(id, model);
    }

    getUserByEmail(email: string): Promise<IUser> {
        return this._userProfilesComponent.getUserProfileByEmail(email);
    }

    getUserById(id: string): Promise<IUser> {
        throw new Error("Method not implemented.");
    }
    addUserLocation(userId: number, location: ILocation): Promise<ILocation> {
        throw new Error("Method not implemented.");
    }
    validateUserLocation(locationID: number): Promise<ILocation> {
        throw new Error("Method not implemented.");
    }


}