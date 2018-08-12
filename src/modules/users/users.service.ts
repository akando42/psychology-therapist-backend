import { WriterReaderService } from "../../behavior/services/writer-reader-service";
import { IUser } from "../../models/user";
import { UsersRepoInstance } from "./dao/repositories/users.repository";
import { propertiesMatcherUtil } from "../../utils/properties-matcher.util";

export class UsersService extends WriterReaderService<IUser> {
    constructor() {
        super(UsersRepoInstance);
    }

    async update(id: string, model: IUser): Promise<boolean> {
        let modelStored: IUser = await this.getById(id);
        //keep always id
        model.id = modelStored.id;
        //make comparatin and modify original.
        modelStored = <IUser>propertiesMatcherUtil(modelStored, model);
        
        return super.update(model.id, modelStored);

    }

    getByEmail(id: string): Promise<IUser> {
        return UsersRepoInstance.getByEmail(id);
    }

    getById(id: string): Promise<IUser> {
        return UsersRepoInstance.getById(id);
    }
}

export const UsersServiceInstance: UsersService = new UsersService();