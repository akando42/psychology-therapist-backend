import { AbstractUsersModule } from "./users.module";
import { IUser } from '../../../models/user';
import { ILocation } from '../../../models/location';


export class UsersImplModule extends AbstractUsersModule {
    constructor(
        locationComponent,
        userProfileComponent) {
        super(locationComponent, userProfileComponent);
    }

    createUser(user: IUser, roleid: number): Promise<IUser> {
        return new Promise<IUser>(async (resolve, reject) => {
            try {
                //create the basic user
                const createdUser: IUser = await this._userProfilesComponent.createUserProfile(user);

            } catch (error) {

            }
        });
    }
    updateUser(id: string, model: IUser): Promise<IUser> {
        throw new Error("Method not implemented.");
    }
    getUserByEmail(id: string): Promise<IUser> {
        return new Promise<IUser>(async (resolve, reject) => {
            try {

            } catch (error) {

            }
        });

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