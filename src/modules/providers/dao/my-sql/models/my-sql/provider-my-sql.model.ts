import { GenderEnum } from "../../../../../../enums/gender.enum";
import { AccountStatusEnum } from "../../../../../../enums/account-stats.enum";


export interface IProviderMySql {
    ProviderID?: string;
    AdminID?: string;
    ProviderFirstName?: string;
    ProviderLastName?: string;
    ProviderEmailID?: string;
    ProviderPassword?: string;
    ProviderPhone?: string;
    ProviderGender?: GenderEnum;
    ProviderProfileImage?: string;
    ProviderExperience?: string;
    ProviderQualifications?: string;
    ProviderLattitude?: string;
    ProviderLongitude?: string;
    ProviderResume?: string;
    ProviderAccountStatus?: AccountStatusEnum;
}