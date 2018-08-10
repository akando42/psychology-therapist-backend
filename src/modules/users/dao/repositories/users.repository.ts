import { UsersConverterInstance } from "../../converters/my-sql/users.converter";
import { AbstractRepository } from "../../../../behavior/repositories/repository.abstract";
import { UserMySqlDAOInstance } from "../my-sql/user-mysql.dao";
import { IUser } from "../../../../models/user";
import { GetByEmail } from "../queries/mysql/get-by";
import { UpdateQuery } from "../queries/mysql/update";
import { GetByQuery } from "../../../../query-spec/my-sql/get-by.query";




export class UsersRepository extends AbstractRepository<IUser>{
    constructor() {
        super(UserMySqlDAOInstance, UsersConverterInstance);
    }

    //TODO spam this style to other repositories
    getByEmail(email: string): Promise<IUser> {
        return super.getBy(new GetByQuery({ UserEmail: email }).toDBQuery('USERS'));
    }


}

export const UsersRepoInstance: UsersRepository = new UsersRepository();
