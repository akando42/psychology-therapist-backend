import { UserProfileConverterInstance } from "../../converters/my-sql/users-profile.converter";
import { IUserProfile } from "../../../../models/User-profile";
import { AbstractRepository } from "../../../../behavior/repositories/repository.abstract";
import { DataModel } from "../../../../../datamodels/datamodel";
import { GetByIdQuery } from "../queries/mysql/get-by-id";
import { UserProfileMySqlDAOInstance } from "../my-sql/user-profile-mysql.dao";




export class UserProfileRepository extends AbstractRepository<IUserProfile>{
    constructor() {
        super(UserProfileMySqlDAOInstance, UserProfileConverterInstance);
    }

    getById(id: string): Promise<IUserProfile> {
        return super.getBy(new GetByIdQuery(DataModel.tables.users.table, id).toDQuery());
    }

}

export const UsersProfileRepoInstance: UserProfileRepository = new UserProfileRepository();
