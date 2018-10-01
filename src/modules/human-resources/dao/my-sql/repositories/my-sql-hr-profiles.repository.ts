import { AbstractHRProfilesRepository } from "../../hr-profile.repository";
import { IHRProfile } from "../../../../../models/hr-profile";
import { Repository } from "../../../../../behavior/repositories/repositoy.notation";
import { CreateQuery } from "../../../../../behavior/queries/my-sql/create-query.notation";
import { GetByQuery } from "../../../../../behavior/queries/my-sql/get-by-query.notation";
import { Convert } from "../../../../../behavior/converters/converter.notation";


@Repository('HR_Profiles')
export class MySqlHRProfilesRepository implements AbstractHRProfilesRepository {

    @CreateQuery({ return: true, primary: 'HRProfileID' },
        { id: 'HRProfileID', status: 'HRProfileStatus', userId: 'UserID', cabinetId: 'CabinetID' })
    createHRProfile(HRProfile: IHRProfile): Promise<IHRProfile> { return null; }

    deleteHRProfile(id: number): Promise<any> {
        return null;
    }

    @Convert({ userId: 'UserID', status: 'HRProfileStatus', id: 'HRProfileID' })
    @GetByQuery({ UserID: 0 })
    getHRProfile(userId: number): Promise<IHRProfile> { return null; }

}