import { IUser } from "../../../../models/user";
import { IUserIDVerification } from "../../../../models/user-id-verification";


export interface IUserProfileService {

    createUserProfile(newUser: IUser): Promise<IUser>;

    updateUserProfile(id: string, model: IUser): Promise<IUser>;

    getUserByEmail(id: string): Promise<IUser>;

    getUserById(id: any): Promise<IUser>;

    verifiedUserIdentity(id: number): Promise<IUser>;

    createVerificationReport(verifi: IUserIDVerification): Promise<IUserIDVerification>
}