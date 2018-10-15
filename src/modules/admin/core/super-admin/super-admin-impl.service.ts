import { ISuperAdminService } from "./i-super-admin.service";
import { Validate } from "../../../../core/validations/validate.notation";
import { Required } from "../../../../core/validations/validation.function";
import { ISuperAdminRepository } from "../../dao/repositories/super-admin.repository";


export class SuperAdminImplService implements ISuperAdminService {

    constructor(private _superAdminProfileRepo: ISuperAdminRepository) { }

    @Validate([{ parameterIndex: 0, cb: Required, name: 'userId' }])
    async getSuperAdminProfile(userId: any): Promise<any> {
        const profile = await this._superAdminProfileRepo.getSuperAdminProfileByUserId(userId);
        return profile;
    }

}