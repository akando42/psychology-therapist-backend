import { IUsersRepository } from "../../users.repository";
import { IUser } from "../../../../../models/user";
import { Convert } from "../../../../../core/converters/converter.notation";
import { GetByQuery as GetByQueryNot } from "../../../../../core/queries/my-sql/get-by-query.notation";
import { Repository } from "../../../../../core/repositories/repositoy.notation";
import { CreateQuery } from "../../../../../core/queries/my-sql/create-query.notation";
import { ByNameRepository } from "../../../../../core/repositories/by-name-repository.notation";

const propsMap = {
    id: 'UserID',
    firstName: 'UserFirstName',
    lastName: 'UserLastName',
    email: 'UserEmail',
    gender: 'UserGender',
    contactInfo: 'UserPhoneNumber',
    idVerified: 'UserIDVerified'
}

@ByNameRepository('USERS', {
    converterProps: propsMap,
    resourceName: 'Users',
    primaryKey: 'UserID',
    create: { return: true }
})
export class MySqlUsersRepository implements IUsersRepository {

    createUserProfile(user: IUser): Promise<IUser> { return null; }

    getUserByEmail(email: string): Promise<IUser> { return null; }

    getUserById(id: any): Promise<IUser> { return null; }

    updateUser(id: any, model): Promise<IUser> { return null; }
}