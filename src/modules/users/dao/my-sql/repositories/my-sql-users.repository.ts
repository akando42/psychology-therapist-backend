import {  IUsersRepository } from "../../users.repository";
import { IUser } from "../../../../../models/user";
import { Convert } from "../../../../../behavior/converters/converter.notation";
import { GetByQuery as GetByQueryNot } from "../../../../../behavior/queries/my-sql/get-by-query.notation";
import { Repository } from "../../../../../behavior/repositories/repositoy.notation";
import { CreateQuery } from "../../../../../behavior/queries/my-sql/create-query.notation";

const propsMap = {
    id: 'UserID',
    firstName: 'UserFirstName',
    lastName: 'UserLastName',
    email: 'UserEmail',
    gender: 'UserGender',
    contactInfo: 'UserPhoneNumber',
    idVerified: 'UserIDVerified'
}

@Repository('USERS')
export class MySqlUsersRepository implements IUsersRepository {

    constructor() {
    }

    @CreateQuery({ return: true, primary: 'UserID' }, propsMap)
    createUserProfile(user: IUser): Promise<IUser> {
        return null;
    }
    
    @Convert(propsMap)
    @GetByQueryNot({ 'UserEmail': 0 }, 'USERS')
    getByEmail(email: string): Promise<IUser> { return null; }

    @Convert(propsMap)
    @GetByQueryNot({ 'UserID': 0 }, 'USERS')
    getById(id: any): Promise<IUser> { return null; }

    updateUser(id: any,model): Promise<IUser> { return null; }
}