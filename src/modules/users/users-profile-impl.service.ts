import { WriterReaderService } from "../../../../behavior/services/writer-reader-service";
import { IUser } from "../../../../models/user";
import { AbstractUsersRepository } from "../../dao/users.repository";
import { propertiesMatcherUtil } from "../../../../utils/properties-matcher.util";
import { MySqlUsersRepository } from "../../dao/repositories/my-sql-users.repository";
import { GenericDao } from "../../../../behavior/mysql/generic.dao";
import { MySqlUsersConverterUsersConverterInstance } from "../../converters/my-sql/my-sql-users.converter";
import { IUserProfileService } from "./user-profile.service.interface";

export class UsersProfileServiceImpl implements IUserProfileService {

    constructor(private _usersRepository: AbstractUsersRepository) { }

    createUser(newUser: IUser): Promise<IUser> {
        throw new Error("Method not implemented.");
    }

    async updateUser(id: number, model: IUser): Promise<boolean> {
        let modelStored: IUser = await this.getUserById(id);
        //keep always id
        model.id = modelStored.id;
        //make comparatin and modify original.
        modelStored = <IUser>propertiesMatcherUtil(modelStored, model);

        return;

    }

    getUserByEmail(email: string): Promise<IUser> {
        return this._usersRepository.getByEmail(email);
    }

    getUserById(id: any): Promise<IUser> {
        return this._usersRepository.getById(id);
    }
}


export const UserServiceImplInstance: UsersServiceImpl =
    new UsersServiceImpl(
        new MySqlUsersRepository(new GenericDao(), MySqlUsersConverterUsersConverterInstance)
    );
