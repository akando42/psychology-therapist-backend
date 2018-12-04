import { ProviderProfileStatusEnum } from "../enums/provider-profile-status.enum";



export interface IProviderProfile {
    profileID?: number;
    status?: ProviderProfileStatusEnum;
    userId:number;
}