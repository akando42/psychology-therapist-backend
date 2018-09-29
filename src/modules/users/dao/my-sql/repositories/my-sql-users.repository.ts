import { AbstractUsersRepository } from "../../users.repository";
import { UpdateQuery } from "../../../../../query-spec/my-sql/update.query";
import { IUser } from "../../../../../models/user";
import { GenericDao } from "../../../../../behavior/mysql/generic.dao";
import { MySqlUsersConverterInstance } from "../../../converters/my-sql/my-sql-users.converter";
import { Convert } from "../../../../../behavior/converters/converter.notation";
import { GetByQuery as GetByQueryNot } from "../../../../../behavior/queries/my-sql/get-by-query.notation";
import { IUserMySql } from "../models/user-my-sql.model";
import { Repository } from "../../../../../behavior/repositories/repositoy.notation";
import { CreateQuery } from "../../../../../behavior/queries/my-sql/create-query.notation";

@Repository('USERS')
export class MySqlUsersRepository implements AbstractUsersRepository {

    constructor() {
    }

    @CreateQuery({ return: true, primary: 'UserID' })
    createUserProfile(user: IUser): Promise<IUser> {
        // return super.create(user);
        return null;
    }
    @Convert({
        firstName: 'UserFirstName', lastName: 'UserLastName',
        gender: 'UserGender', email: 'UserEmail', id: 'UserID', idVerified: 'UserIDVerified',
    })
    @GetByQueryNot({ 'UserEmail': 0 }, 'USERS')
    getByEmail(email: string): Promise<IUser> { return null; }

    @Convert({
        firstName: 'UserFirstName', lastName: 'UserLastName',
        gender: 'UserGender', email: 'UserEmail', id: 'UserID', idVerified: 'UserIDVerified',
    })
    @GetByQueryNot({ 'UserID': 0 }, 'USERS')
    getById(id: any): Promise<IUser> { return null; }

    updateUser(id: any): Promise<IUser> { return null; }
}