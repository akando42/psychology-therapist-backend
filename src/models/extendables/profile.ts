import { IAddress } from "./location";
import { GenderEnum } from "../../enums/gender.enum";

/**
 * It represent a user Profile.
 */
export interface IProfile {
    firstName?: string;
    lastName?: string;
    profileImage?: string;
    gender?: GenderEnum;
    address: IAddress;
    phone?: string;
}