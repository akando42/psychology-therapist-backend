import { AbstractRepository } from "@core/behaviors/repositories/repository.abstract";
import { IAdminProfile } from "@core/models/admin-profile";
import { AdminProfileMySqlDAOInstance } from "@core/modules/admin/dao/my-sql/admin-profile-mysql.dao";
import { AdminProfileConverterInstance } from "@core/modules/admin/converters/my-sql/admin-profile.converter";




export class AdminProfileRepository extends AbstractRepository<IAdminProfile>{
    constructor() {
        super(AdminProfileMySqlDAOInstance, AdminProfileConverterInstance);
    }
}

export const AdminProfileRepoInstance: AdminProfileRepository = new AdminProfileRepository();
