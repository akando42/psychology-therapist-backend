import { AdminProfileMySqlDAOInstance } from "../my-sql/admin-profile-mysql.dao";
import { AbstractRepository } from "../../../../behavior/repositories/repository.abstract";
import { IAdminProfile } from "../../../../models/admin-profile";
import { AdminProfileConverterInstance } from "../../converters/my-sql/admin-profile.converter";



export class AdminProfileRepository extends AbstractRepository<IAdminProfile>{
    constructor() {
        super(AdminProfileMySqlDAOInstance, AdminProfileConverterInstance);
    }
}

export const AdminProfileRepoInstance: AdminProfileRepository = new AdminProfileRepository();
