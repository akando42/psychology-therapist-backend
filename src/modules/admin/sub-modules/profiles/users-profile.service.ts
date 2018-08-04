import { UsersProfileRepoInstance } from "../../dao/repositories/users-profile.repository";
import { WriterReaderService } from "../../../../behavior/services/writer-reader-service";
import { IUserProfile } from "../../../../models/user-profile";


export class UsersProfileService extends WriterReaderService<IUserProfile> {
    constructor() {
        super(UsersProfileRepoInstance);
    }


    getById(id: string): Promise<IUserProfile> {
        return UsersProfileRepoInstance.getById(id);
    }
}

export const UsersProfileServiceInstance: UsersProfileService = new UsersProfileService();