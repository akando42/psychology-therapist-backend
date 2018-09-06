import { AbstractUsersRepository } from "../users.repository";
import { GetByQuery } from "../../../../query-spec/my-sql/get-by.query";
import { UpdateQuery } from "../../../../query-spec/my-sql/update.query";
import { IUser } from "../../../../models/user";


export class MySqlUsersRepository extends AbstractUsersRepository {
    constructor(dbAccess, converter) {
        super(dbAccess, converter);
    }
    //TODO spam this style to other repositories
    getByEmail(email: string): Promise<IUser> {
        return super.getBy(new GetByQuery({ UserEmail: email }).toDBQuery('USERS'));
    }

    getById(id: string): Promise<IUser> {
        return super.getBy(new GetByQuery({ UserID: id }).toDBQuery('USERS'));
    }

    updateUser(id: string, data): Promise<boolean> {
        return super.update(new UpdateQuery({ UserID: id }).toDBQuery('USERS'), data);
    }
}