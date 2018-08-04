import { AdminProfileMySqlDAOInstance } from "../my-sql/admin-profile-mysql.dao";
import { AbstractRepository } from "../../../../behavior/repositories/repository.abstract";
import { IAdminProfile } from "../../../../models/admin-profile";
import { AdminProfileConverterInstance } from "../../converters/my-sql/admin-profile.converter";
import { GetByIdQuery } from "../queries/mysql/get-by-id";



export class AdminProfileRepository extends AbstractRepository<IAdminProfile>{
    constructor() {
        super(AdminProfileMySqlDAOInstance, AdminProfileConverterInstance);
    }

    getById(id: string): Promise<IAdminProfile> {
        return super.getBy(new GetByIdQuery(id).toDQuery());
    }
}

export const AdminProfileRepoInstance: AdminProfileRepository = new AdminProfileRepository();
