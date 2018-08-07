import { WriterReaderService } from "../../behavior/services/writer-reader-service";
import { IUser } from "../../models/user";
import { UsersRepoInstance } from "./dao/repositories/users.repository";

export class UsersService extends WriterReaderService<IUser> {
    constructor() {
        super(UsersRepoInstance);
    }


    getByEmail(id: string): Promise<IUser> {
        return UsersRepoInstance.getByEmail(id);
    }

}

export const UsersServiceInstance: UsersService = new UsersService();