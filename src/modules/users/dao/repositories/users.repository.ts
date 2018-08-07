import { UsersConverterInstance } from "../../converters/my-sql/users.converter";
import { AbstractRepository } from "../../../../behavior/repositories/repository.abstract";
import { UserMySqlDAOInstance } from "../my-sql/user-mysql.dao";
import { IUser } from "../../../../models/user";
import { GetByEmail } from "../queries/mysql/get-by";




export class UsersRepository extends AbstractRepository<IUser>{
    constructor() {
        super(UserMySqlDAOInstance, UsersConverterInstance);
    }

    getByEmail(email: string): Promise<IUser> {
        return super.getBy(new GetByEmail(email).toDQuery());
    }


}

export const UsersRepoInstance: UsersRepository = new UsersRepository();
