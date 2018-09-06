import { WriterReaderService } from "../../behavior/services/writer-reader-service";
import { IUser } from "../../models/user";
import { AbstractUsersRepository } from "./dao/users.repository";
import { propertiesMatcherUtil } from "../../utils/properties-matcher.util";
import { IUserService } from "./core/users.service";
import { MySqlUsersRepository } from "./dao/repositories/my-sql-users.repository";
import { GenericDao } from "../../behavior/mysql/generic.dao";
import { MySqlUsersConverterUsersConverterInstance } from "./converters/my-sql/my-sql-users.converter";

export class UsersServiceImpl implements IUserService {

    constructor(private _usersRepository: AbstractUsersRepository) { }

    createUser(newUser: IUser): Promise<IUser> {
        throw new Error("Method not implemented.");
    }

    async updateUser(id: string, model: IUser): Promise<boolean> {
        let modelStored: IUser = await this.getUserById(id);
        //keep always id
        model.id = modelStored.id;
        //make comparatin and modify original.
        modelStored = <IUser>propertiesMatcherUtil(modelStored, model);

        return;

    }

    getUserByEmail(id: string): Promise<IUser> {
        return this._usersRepository.getByEmail(id);
    }

    getUserById(id: string): Promise<IUser> {
        return this._usersRepository.getById(id);
    }
}


export const UserServiceImplInstance: UsersServiceImpl =
    new UsersServiceImpl(
        new MySqlUsersRepository(new GenericDao(), MySqlUsersConverterUsersConverterInstance)
    );
