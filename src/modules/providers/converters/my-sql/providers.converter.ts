
import { IDualConverter } from "../../../../behavior/converters/converter.interface";
import { IProviderMySql } from "../../dao/my-sql/models/my-sql/provider-my-sql.model";
import { IProvider } from "../../../../models/provider";

export class ProviderConverter implements IDualConverter<IProvider, IProviderMySql> {
    converDomainToDBModel(raw: IProvider): IProviderMySql {
        if (!raw) { return null }
        return {
            ProviderID: raw.id,
            ProviderFirstName: raw.profile.firstName,
            ProviderLastName: raw.profile.lastName,
            ProviderProfileImage: raw.profile.profileImage,
            ProviderPhone: raw.profile.phone,
            ProviderEmailID: raw.profile.email,
            ProviderGender: raw.profile.gender,
            AdminID: raw.adminId,


        }
    }
    convertDBModelToDomain(raw: IProviderMySql): IProvider {
        if (!raw) { return null }
        return {
            adminId: raw.AdminID,
            id: raw.ProviderID,
            profile: {
                accountStatus: raw.ProviderAccountStatus,
                email: raw.ProviderEmailID,
                firstName: raw.ProviderFirstName,
                lastName: raw.ProviderLastName,
                gender: raw.ProviderGender,
                phone: raw.ProviderPhone,
                profileImage: raw.ProviderProfileImage
            },
            experience: raw.ProviderExperience,
            resume: raw.ProviderResume,
            qualifications: raw.ProviderQualifications
        }
    }
    converManyDomainToDBModel(raw: IProvider[]): IProviderMySql[] {
        if (!raw || raw.length === 0) { return [] }
        return raw.map((item) => this.converDomainToDBModel(item));
    }
    convertManyDBModelToDomain(raw: IProviderMySql[]): IProvider[] {
        if (!raw || raw.length === 0) { return [] }
        return raw.map((item) => this.convertDBModelToDomain(item));
    }

}

export const ProvidersConverterInstance: ProviderConverter = new ProviderConverter();