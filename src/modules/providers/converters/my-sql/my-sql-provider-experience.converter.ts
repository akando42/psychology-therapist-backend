import { IDualConverter } from "../../../../behavior/converters/converter.interface";
import { IProviderExperience } from "../../../../models/provider-experience";
import { IProviderExperienceMySql } from "../../dao/models/my-sql/provider-experience-my-sql";


export class MySqlProviderExperienceConverter implements IDualConverter<IProviderExperience, IProviderExperienceMySql>{
    converDomainToDBModel(raw: IProviderExperience): IProviderExperienceMySql {
        if (!raw) { return null; }
        return {
            ProviderExperienceFromDate: raw.fromDate,
            ProviderExperienceID: raw.experienceId,
            ProviderExperienceRolDescription: raw.rolDescription,
            ProviderExperienceToDate: raw.toDate
        }
    }
    convertDBModelToDomain(raw: IProviderExperienceMySql): IProviderExperience {
        if (!raw) { return null; }
        return {
            experienceId: raw.ProviderExperienceID,
            fromDate: raw.ProviderExperienceFromDate,
            rolDescription: raw.ProviderExperienceRolDescription,
            toDate: raw.ProviderExperienceToDate
        }
    }
    converManyDomainToDBModel(raw: IProviderExperience[]): IProviderExperienceMySql[] {
        return raw.map((item) => this.converDomainToDBModel(item));
    }
    convertManyDBModelToDomain(raw: IProviderExperienceMySql[]): IProviderExperience[] {
        return raw.map((item) => this.convertDBModelToDomain(item));
    }


}