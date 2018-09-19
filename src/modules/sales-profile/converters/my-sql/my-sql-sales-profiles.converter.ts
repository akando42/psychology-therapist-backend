
import { IDualConverter } from "../../../../behavior/converters/converter.interface";
import { ISalesProfile } from "../../../../models/Sales-profile";
import { ISalesProfileMySql } from "../../dao/my-sql/models/my-sql-sales-profile";

export class MySqlSalesProfilesConverter implements IDualConverter<ISalesProfile, ISalesProfileMySql> {
    converDomainToDBModel(raw: ISalesProfile): ISalesProfileMySql {
        if (!raw) { return null }
        return {
            SalesProfileID: raw.id,
            SalesProfileNDASigned: raw.NDASigned,
            SalesProfileStatus: raw.status,
            SalesProfileCabinetID: raw.cabinetId
        }
    }
    convertDBModelToDomain(raw: ISalesProfileMySql): ISalesProfile {
        if (!raw) { return null }
        return {
            id: raw.SalesProfileID,
            NDASigned: raw.SalesProfileNDASigned,
            status: raw.SalesProfileStatus,
            cabinetId: raw.SalesProfileCabinetID
        }
    }
    converManyDomainToDBModel(raw: ISalesProfile[]): ISalesProfileMySql[] {
        if (!raw || raw.length === 0) { return [] }
        return raw.map((item) => this.converDomainToDBModel(item));
    }
    convertManyDBModelToDomain(raw: ISalesProfileMySql[]): ISalesProfile[] {
        if (!raw || raw.length === 0) { return [] }
        return raw.map((item) => this.convertDBModelToDomain(item));
    }

}
