import { IUser } from "../../../../models/user";


export interface IUserProfileService {

    createUserProfile(newUser: IUser): Promise<IUser>;

    updateUserProfile(id: string, model: IUser): Promise<IUser>;

    getUserByEmail(id: string): Promise<IUser>;

    getUserById(id: string): Promise<IUser>;

    verifiedUserIdentity(id: number): Promise<IUser>;
}