import { GenderEnum } from "@core/enums/gender.enum";
import { IAddress } from '@core/models/extendables/location';

/**
 * It represent a user Profile.
 */
export interface IProfile {
    firstName?: string;
    lastName?: string;
    profileImage?: string;
    gender?: GenderEnum;
    address: IAddress
}