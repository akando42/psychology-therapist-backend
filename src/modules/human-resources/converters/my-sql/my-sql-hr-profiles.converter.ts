
import { IDualConverter } from "../../../../behavior/converters/converter.interface";
import { IHRProfile } from "../../../../models/hr-profile";
import { IHRProfileMySql } from "../../dao/my-sql/models/my-sql-hr-profile";

export class MySqlHRProfilesConverter implements IDualConverter<IHRProfile, IHRProfileMySql> {
    converDomainToDBModel(raw: IHRProfile): IHRProfileMySql {
        if (!raw) { return null }
        return {
            HRProfileID: raw.id,
            HRProfileNDASigned: raw.NDASigned,
            HRProfileStatus: raw.status,
            HRProfileCabinetID: raw.cabinetId
        }
    }
    convertDBModelToDomain(raw: IHRProfileMySql): IHRProfile {
        if (!raw) { return null }
        return {
            id: raw.HRProfileID,
            NDASigned: raw.HRProfileNDASigned,
            status: raw.HRProfileStatus,
            cabinetId: raw.HRProfileCabinetID
        }
    }
    converManyDomainToDBModel(raw: IHRProfile[]): IHRProfileMySql[] {
        if (!raw || raw.length === 0) { return [] }
        return raw.map((item) => this.converDomainToDBModel(item));
    }
    convertManyDBModelToDomain(raw: IHRProfileMySql[]): IHRProfile[] {
        if (!raw || raw.length === 0) { return [] }
        return raw.map((item) => this.convertDBModelToDomain(item));
    }

}
