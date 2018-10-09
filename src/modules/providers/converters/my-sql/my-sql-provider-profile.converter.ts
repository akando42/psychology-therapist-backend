import { IDualConverter } from "../../../../core/converters/converter.interface";
import { IProviderProfile } from "../../../../models/provider-profile";
import { IProviderProfileMySql } from "../../dao/models/my-sql/provider-profile-my-sql";


export class MySqlProviderProfileConverter implements IDualConverter<IProviderProfile, IProviderProfileMySql>{
    converDomainToDBModel(raw: IProviderProfile): IProviderProfileMySql {
        if (!raw) { return null; }
        return {
            ProviderProfileID: raw.profileID,
            ProviderProfileStatus: raw.status
        }
    }
    convertDBModelToDomain(raw: IProviderProfileMySql): IProviderProfile {
        if (!raw) { return null; }
        return {
            profileID: raw.ProviderProfileID,
            status: raw.ProviderProfileStatus
        }
    }
    converManyDomainToDBModel(raw: IProviderProfile[]): IProviderProfileMySql[] {
        return raw.map((item) => this.converDomainToDBModel(item));
    }
    convertManyDBModelToDomain(raw: IProviderProfileMySql[]): IProviderProfile[] {
        return raw.map((item) => this.convertDBModelToDomain(item));
    }


}