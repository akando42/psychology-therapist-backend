import { ProviderProfileStatusEnum } from "../../../../../enums/provider-profile-status.enum";


export interface IProviderProfileMySql {
    ProviderProfileID?: number;
    ProviderProfileStatus?: ProviderProfileStatusEnum;
}